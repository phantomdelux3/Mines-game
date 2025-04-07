import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authMiddleware";
import { getPrisma } from "../db/db_conection";
import { Hono } from "hono";

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

// SIGNUP Endpoint
app.post("/signup", async (c) => {
  try {
    const { username, email, password } = await c.req.json();
    const prisma = c.get('prisma');

    // Validate input
    if (!username || !email || !password) {
      return c.json({ error: "All fields are required" }, 400);
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return c.json({ error: "Email already in use" }, 409);
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        username, 
        email, 
        password: hashedPassword 
      },
      select: {
        id: true,
        username: true,
        email: true
      }
    });

    return c.json({ 
      message: "User created successfully",
      user 
    }, 201);

  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// SIGNIN Endpoint
app.post("/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();
    const prisma = c.get('prisma');

    // Validate input
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Find user
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true
      }
    });

    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Generate JWT token (expires in 1 day)
    const payload = { 
      id: user.id, 
      email: user.email,
      username: user.username
    };
    const token = await sign(payload, c.env.JWT_SECRET);

    // Return token and user info (without password)
    const { password: _, ...userWithoutPassword } = user;
    return c.json({ 
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Signin error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// PROTECTED ROUTE
app.get("/profile", authMiddleware, async (c) => {
  const user = c.get('user');
  return c.json({ 
    message: "Welcome to your profile!",
    user 
  });
});

export default app;