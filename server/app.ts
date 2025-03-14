import { Hono } from "hono"
import { logger } from "hono/logger"
import { serveStatic } from "hono/bun"
import { exprensesRoute } from "./routes/expenses"
import { authRoute } from "./routes/auth"

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
