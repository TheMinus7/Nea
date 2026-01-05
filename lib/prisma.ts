import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
  pgPoolKey?: string;
};

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

try {
  const u = new URL(connectionString);
  const host = u.hostname.toLowerCase();
  if (process.env.NODE_ENV !== "production" && (host.endsWith(".supabase.co") || host.endsWith(".supabase.com"))) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
} catch {
  // ignore
}

const poolConnectionString = (() => {
  try {
    const u = new URL(connectionString);
    u.searchParams.delete("pgbouncer");
    u.searchParams.delete("connection_limit");
    return u.toString();
  } catch {
    return connectionString;
  }
})();

const ssl = (() => {
  try {
    const u = new URL(connectionString);
    const host = u.hostname.toLowerCase();
    const sslmode = (u.searchParams.get("sslmode") ?? "").toLowerCase();
    const sslParam = (u.searchParams.get("ssl") ?? "").toLowerCase();
    const useSsl =
      host.endsWith(".supabase.co") ||
      host.endsWith(".supabase.com") ||
      sslmode === "require" ||
      sslmode === "verify-ca" ||
      sslmode === "verify-full" ||
      sslParam === "true";

    if (!useSsl) return undefined;

    return { rejectUnauthorized: false };
  } catch {
    return connectionString.includes("sslmode=require") ? { rejectUnauthorized: false } : undefined;
  }
})();

const poolKey = `${poolConnectionString}|${ssl ? "ssl" : "no-ssl"}`;

if (globalForPrisma.pgPool && globalForPrisma.pgPoolKey !== poolKey) {
  try {
    void globalForPrisma.pgPool.end();
  } catch {
    // ignore
  }
  globalForPrisma.pgPool = undefined;
  globalForPrisma.prisma = undefined;
  globalForPrisma.pgPoolKey = undefined;
}

const pgPool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString: poolConnectionString,
    ssl,
  });

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(pgPool),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pgPool = pgPool;
  globalForPrisma.pgPoolKey = poolKey;
}

export default prisma;
