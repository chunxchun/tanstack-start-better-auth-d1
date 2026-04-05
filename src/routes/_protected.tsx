import { getSession } from "@/lib/session";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

// let shopId = undefined as string | undefined;
export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (!session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }

    // shopId = String(session.user.shopId);

    return { user: session.user };
  },
  component: () => (
    // <RouterProvider context={{ shopId }}>
    <Outlet />
    // </RouterProvider>
  ),
});
