import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';

export const getPrisma = (c: Context) => {
  try {
    if (!c.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    return prisma;
  } catch (error) {
    console.error("Prisma initialization error:", error);
    throw new Error("Failed to initialize Prisma client");
  }
};
