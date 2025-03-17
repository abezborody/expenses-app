import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { getTotalSpent } from "../../lib/api"

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
})

function Index() {
  // Queries
  const { isPending, error, data } = useQuery({
    queryKey: ["getTotalSpent"],
    queryFn: getTotalSpent,
  })

  if (error) {
    return `Error:${error.message}`
  }

  return (
    <div className="max-w-xl m-auto py-4">
      <Card className="text-left">
        <CardHeader>
          <CardTitle>Total spent</CardTitle>
          <CardDescription>Total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? "Loading..." : data.total}</CardContent>
      </Card>
    </div>
  )
}
