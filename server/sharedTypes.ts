import { insertExpensesSchema } from "./db/schema/expenses"
import { z } from "zod"

export const createExpenseSchema = insertExpensesSchema.omit({
  id: true,
  createdAt: true,
  userId: true,
})

export type CreateExpense = z.infer<typeof createExpenseSchema>
