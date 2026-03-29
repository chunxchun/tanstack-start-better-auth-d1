import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/admin-only/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/adminOnly"!</div>
}
