"use client";

/**
 * Демо-слой кабинета (этап 2 концепции до подключения реального backend/биллинга):
 * аккаунт, квота слов, проекты и глоссарий живут в localStorage браузера.
 * Публичный интерфейс сохранится при переезде на настоящий API.
 */

export interface DemoUser {
  email: string;
  plan: "free" | "start" | "pro";
  createdAt: string;
}

export interface DemoProject {
  id: string;
  name: string;
  source: string;
  target: string;
  words: number;
  status: "done" | "review" | "draft";
  updatedAt: string;
}

export interface GlossaryTerm {
  id: string;
  ru: string;
  en: string;
}

export const PLAN_QUOTAS: Record<DemoUser["plan"], number> = {
  free: 10_000,
  start: 100_000,
  pro: 500_000,
};

export const PLAN_NAMES: Record<DemoUser["plan"], string> = {
  free: "Free",
  start: "Start",
  pro: "Pro",
};

const KEYS = {
  user: "tp-app-user",
  usage: "tp-app-usage",
  projects: "tp-app-projects",
  glossary: "tp-app-glossary",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full/unavailable — демо переживёт */
  }
}

export function getUser(): DemoUser | null {
  return read<DemoUser | null>(KEYS.user, null);
}

export function login(email: string): DemoUser {
  const existing = getUser();
  if (existing && existing.email === email) return existing;
  const user: DemoUser = { email, plan: "free", createdAt: new Date().toISOString() };
  write(KEYS.user, user);
  return user;
}

export function logout() {
  localStorage.removeItem(KEYS.user);
}

export function setPlan(plan: DemoUser["plan"]) {
  const user = getUser();
  if (!user) return;
  write(KEYS.user, { ...user, plan });
}

/** Расход слов за текущий месяц. */
export function getUsage(): number {
  const month = new Date().toISOString().slice(0, 7);
  const entry = read<{ month: string; words: number } | null>(KEYS.usage, null);
  return entry && entry.month === month ? entry.words : 0;
}

export function addUsage(words: number) {
  const month = new Date().toISOString().slice(0, 7);
  write(KEYS.usage, { month, words: getUsage() + words });
}

const SEED_PROJECTS: DemoProject[] = [
  { id: "p1", name: "pump-manual.docx", source: "ru", target: "de", words: 8420, status: "done", updatedAt: "2026-06-28" },
  { id: "p2", name: "patent-claims.pdf", source: "ru", target: "en", words: 12400, status: "review", updatedAt: "2026-06-30" },
];

export function getProjects(): DemoProject[] {
  return read<DemoProject[]>(KEYS.projects, SEED_PROJECTS);
}

export function addProject(p: Omit<DemoProject, "id" | "updatedAt">): DemoProject {
  const project: DemoProject = {
    ...p,
    id: "p" + Math.random().toString(36).slice(2, 8),
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  const all = [project, ...getProjects()];
  write(KEYS.projects, all);
  return project;
}

const SEED_GLOSSARY: GlossaryTerm[] = [
  { id: "g1", ru: "привод", en: "actuator" },
  { id: "g2", ru: "клапан обратный", en: "check valve" },
  { id: "g3", ru: "гидравлический удар", en: "hydraulic shock" },
];

export function getGlossary(): GlossaryTerm[] {
  return read<GlossaryTerm[]>(KEYS.glossary, SEED_GLOSSARY);
}

export function addTerm(ru: string, en: string): GlossaryTerm {
  const term: GlossaryTerm = { id: "g" + Math.random().toString(36).slice(2, 8), ru, en };
  write(KEYS.glossary, [...getGlossary(), term]);
  return term;
}

export function removeTerm(id: string) {
  write(
    KEYS.glossary,
    getGlossary().filter((t) => t.id !== id)
  );
}
