import { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";


export const authMiddleware: MiddlewareHandler = async (c, next) => {

  const jwt_SECRET:string = c.env.JWT_SECRET;
  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return c.json({ error: "Unauthorized" }, 401);

  try {
    const payload = await verify(token, jwt_SECRET);
    c.set("user", payload); // Store user info in context
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
