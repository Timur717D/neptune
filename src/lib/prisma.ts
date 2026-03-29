import path from "node:path";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma CLI resolves `file:./dev.db` next to `schema.prisma` (`prisma/dev.db`),
 * but the query engine in Next.js often resolves relative `file:` URLs from cwd,
 * opening the wrong path. Force the same file the CLI uses.
 */
function sqliteDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url?.startsWith("file:")) {
    const p = path.join(
      /* turbopackIgnore: true */ process.cwd(),
      "prisma",
      "dev.db",
    );
    return `file:${p.replace(/\\/g, "/")}`;
  }
  const rest = url.slice("file:".length).replace(/^\.\//, "");
  if (path.isAbsolute(rest)) {
    return `file:${rest.replace(/\\/g, "/")}`;
  }
  if (!rest.includes("/") && !rest.includes("\\")) {
    const p = path.join(
      /* turbopackIgnore: true */ process.cwd(),
      "prisma",
      rest,
    );
    return `file:${p.replace(/\\/g, "/")}`;
  }
  const p = path.join(/* turbopackIgnore: true */ process.cwd(), rest);
  return `file:${p.replace(/\\/g, "/")}`;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: { url: sqliteDatabaseUrl() },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
