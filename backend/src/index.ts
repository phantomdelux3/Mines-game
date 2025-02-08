import { Hono } from 'hono'
import { cors } from "hono/cors";
import authRoutes from "./routes/auth";



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    user: any ,
    prisma : any,
  }
}>()



// Enable CORS for all routes
app.use("*", cors());

app.route("/auth", authRoutes);


export default app
