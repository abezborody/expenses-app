import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from "@/lib/api"
import { ExpenseDeleteButton } from "@/shared/ui/delete-button"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
})

function Expenses() {
  // Queries
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions)
  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions,
  )

  if (error) {
    return "Error:" + error.message
  }

  return (
    <div className="py-4 max-w-xl m-auto">
      <Table>
        <TableCaption>List of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense && (
            <TableRow>
              <TableCell className="font-medium">
                <Skeleton className="w-[20px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>{loadingCreateExpense?.expense.title}</TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-[50px] h-[20px] ml-auto rounded-full" />
              </TableCell>
            </TableRow>
          )}
          {isPending ? (
            <AllExpensesSkeleton />
          ) : (
            data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.date}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell className="text-right">${expense.amount}</TableCell>
                <TableCell className="text-right w-[60px]">
                  <ExpenseDeleteButton id={expense.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function AllExpensesSkeleton() {
  return Array(8)
    .fill(0)
    .map((_, i) => (
      <TableRow key={i}>
        <TableCell className="font-medium">
          <Skeleton className="w-[20px] h-[20px] rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[200px] h-[20px] rounded-full" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="w-[50px] h-[20px] ml-auto rounded-full" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="w-[36px] h-[36px] ml-auto rounded-md" />
        </TableCell>
      </TableRow>
    ))
}
