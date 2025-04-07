import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware";
import { getPrisma } from "../db/db_conection";

// Define environment type
type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middleware to attach Prisma client
app.use('*', async (c, next) => {
  const prisma = getPrisma(c.env);
  c.set('prisma', prisma);
  await next();
});

app.get("/mines", authMiddleware, async (c) => {
  const probability = Math.random();
  let win = false
  if(probability > 0.26){
    win = true
  }

  return c.json({ 
    message: "Welcome to your profile!",
    win, 
  });
});

export default app;