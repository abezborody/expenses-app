import type { z } from "zod"
import { insertExpensesSchema } from "./db/schema/expenses"

export const createExpenseSchema = insertExpensesSchema.omit({
  id: true,
  createdAt: true,
  userId: true,
})

export type CreateExpense = z.infer<typeof createExpenseSchema>
