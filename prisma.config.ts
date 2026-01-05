import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({ path: ".env.local" });
dotenv.config();

const migrationDbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!migrationDbUrl) {
  throw new Error("DATABASE_URL (or DIRECT_URL) is not set");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: migrationDbUrl,
  },
});
