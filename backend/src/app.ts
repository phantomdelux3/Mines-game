import { Hono } from "hono";
import { getPrisma } from "./db/db_conection";


const app = new Hono<{
    Bindings : Env;
    Variables: {
        prisma: ReturnType<typeof getPrisma>;
        user: any;
      };

}>()


import authRoutes from './routes/auth';
app.route('/api', authRoutes);

import minesRoutes from "./routes/mines"
app.route('/api' , minesRoutes)

export default app;