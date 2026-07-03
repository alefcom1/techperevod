import { PrismaClient } from "@prisma/client";

// Next.js hot-reload в dev пересоздаёт модуль на каждое изменение — держим
// клиент на globalThis, чтобы не открывать новое соединение с SQLite каждый раз.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
