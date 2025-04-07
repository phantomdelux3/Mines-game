import { MiddlewareHandler } from 'hono';
import { verify } from 'hono/jwt';

export const authMiddleware: MiddlewareHandler<{
  Bindings: {
    JWT_SECRET: string;
  };
  Variables: {
    user: {
      id: string;
      email: string;
      username?: string;
    };
  };
}> = async (c, next) => {
  const token = c.req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET);

    // Type guard for payload
    if (typeof payload !== 'object' || payload === null || !('id' in payload)) {
      return c.json({ error: 'Invalid token structure' }, 401);
    }

    // Set typed user context
    c.set('user', {
      id: String(payload.id),
      email: String(payload.email),
      username: payload.username ? String(payload.username) : undefined,
    });

    await next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return c.json({ error: 'Unauthorized - Invalid token' }, 401);
  }
};