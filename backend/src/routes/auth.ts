import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authMiddleware";
import { getPrisma } from "../../prisma/Prisma-Connection";

type Env = {
  DATABASE_URL: string;
  JWT_SECRET: string;
}; 

// Define the Hono app with custom variables
const app = new Hono<{
  Variables: {
    prisma: ReturnType<typeof getPrisma>;
    user: any; // Define the type for `user` if possible
  };
  Bindings: Env; // Add the `Env` type here
}>();

// Middleware to attach Prisma to the context
app.use('*', async (c, next) => {
  const prisma = getPrisma(c);
  c.set('prisma', prisma);
  await next();
});

// 🔹 SIGNUP Endpoint
app.post("/signup", async (c) => {
  const { username, email, password } = await c.req.json();
  const prisma = c.get('prisma');

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return c.json({ error: "Email already in use" }, 400);

  // Hash password and save user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  return c.json({ message: "User created successfully" });
});

// 🔹 SIGNIN Endpoint
app.post("/signin", async (c) => {
  const { email, password } = await c.req.json();
  const prisma = c.get('prisma');

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return c.json({ error: "Invalid credentials" }, 401);

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return c.json({ error: "Invalid credentials" }, 401);

  // Generate JWT token
  const token = await sign({ id: user.id, email: user.email }, c.env.JWT_SECRET);

  return c.json({ token });
});

// 🔹 PROTECTED ROUTE (Example)
app.get("/profile", authMiddleware, async (c) => {
  const user = c.get("user");
  return c.json({ message: "Welcome!", user });
});

export default app;