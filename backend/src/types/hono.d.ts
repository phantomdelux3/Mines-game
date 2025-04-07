import { PrismaClient } from '@prisma/client/edge';
import { DynamicClientExtensionThis } from '@prisma/extension-accelerate';

declare module 'hono' {
  interface ContextVariableMap {
    user: {
      id: string;
      email: string;
      username?: string;
      // Add other JWT payload properties
    };
    prisma: DynamicClientExtensionThis;
  }
}