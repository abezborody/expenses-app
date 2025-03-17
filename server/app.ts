import { Hono } from "hono"
import { serveStatic } from "hono/bun"
import { logger } from "hono/logger"
import { authRoute } from "./routes/auth"
import { exprensesRoute } from "./routes/expenses"

// Init app
const app = new Hono()
// Use logger
app.use("*", logger())

// Routes
const apiRoutes = app
  .basePath("/api")
  .route("/expenses", exprensesRoute)
  .route("/", authRoute)

app.get("*", serveStatic({ root: "./frontend/dist" }))
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }))

export default app
export type ApiRoutes = typeof apiRoutes
