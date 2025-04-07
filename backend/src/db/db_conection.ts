import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// For Cloudflare Workers environment
interface Env {
  DATABASE_URL: string;
}

export const getPrisma = (env: Env) => {
  if (!env?.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in Cloudflare environment variables");
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());
};