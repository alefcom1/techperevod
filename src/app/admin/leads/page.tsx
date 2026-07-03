"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  langPair: string | null;
  comment: string | null;
  fileName: string | null;
  quoteWords: number | null;
  quotePriceRub: number | null;
  status: string;
  createdAt: string;
}

const STATUS_LABELS: Record<string, { label: string; tone: "neutral" | "primary" | "accent" }> = {
  new: { label: "Новая", tone: "primary" },
  contacted: { label: "Связались", tone: "neutral" },
  won: { label: "Сделка", tone: "accent" },
  lost: { label: "Отказ", tone: "neutral" },
};

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data.leads ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function updateStatus(id: string, status: string) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="tp-app">
      <div className="tp-app__main" style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <div className="tp-app__topbar">
          <h1 className="tp-app__title">
            Заявки {newCount > 0 ? <Badge tone="primary">{newCount} новых</Badge> : null}
          </h1>
          <div className="tp-app__user">
            <Button variant="ghost" size="sm" as="a" href="/admin">
              Редактор контента
            </Button>
            <Button variant="ghost" size="sm" as="a" href="/" target="_blank">
              Открыть сайт
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>

        <div className="tp-app__content">
          <table className="tp-app-table">
            <thead>
              <tr>
                <th>Имя / контакты</th>
                <th>Компания</th>
                <th>Пара</th>
                <th>Комментарий</th>
                <th>Файл / оценка</th>
                <th>Статус</th>
                <th>Создана</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>
                    <div>{l.name}</div>
                    <div className="tp-mono" style={{ fontSize: 12, color: "var(--tp-text-muted)" }}>
                      <a href={`mailto:${l.email}`}>{l.email}</a>
                    </div>
                  </td>
                  <td>{l.company || "—"}</td>
                  <td className="tp-mono">{l.langPair || "—"}</td>
                  <td style={{ maxWidth: 260 }}>{l.comment || "—"}</td>
                  <td className="tp-mono" style={{ fontSize: 12 }}>
                    {l.fileName ? (
                      <>
                        {l.fileName}
                        {l.quoteWords != null ? (
                          <div style={{ color: "var(--tp-text-muted)" }}>
                            {l.quoteWords} слов · {l.quotePriceRub} ₽
                          </div>
                        ) : null}
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <select
                      className="tp-input"
                      value={l.status}
                      onChange={(e) => updateStatus(l.id, e.target.value)}
                      style={{ fontSize: 13, padding: "4px 8px" }}
                    >
                      {Object.entries(STATUS_LABELS).map(([value, { label }]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="tp-mono" style={{ fontSize: 12 }}>
                    {new Date(l.createdAt).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </td>
                </tr>
              ))}
              {!loading && leads.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ color: "var(--tp-text-muted)" }}>
                    Пока нет заявок.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
