import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/schedules/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/dashboard/schedules/"!</div>
}
