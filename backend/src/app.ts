import { Hono } from "hono";
import { getPrisma } from "./db/db_conection";

export type Env = {
    DATABASE_URL : string;
    JWT_SECRET: string;
}

const app = new Hono<{
    Bindings : Env;
    Variables: {
        prisma: ReturnType<typeof getPrisma>;
        user: any;
      };

}>()

export default app;