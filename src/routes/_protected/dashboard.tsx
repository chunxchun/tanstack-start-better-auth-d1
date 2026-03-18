import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { SelectUserType } from "@/db/schema/auth-schema";
import { listShopFn } from "@/utils/shop/shop.function";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_protected/dashboard")({
  loader: async () => {
    const shops = await listShopFn({ data: { limit: 100, offset: 0 } });
    return { shops };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { shops } = Route.useLoaderData();
  const { user } = Route.useRouteContext();
  const [activeShop, setActiveShop] = useState(shops[0]);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          shops={shops}
          user={user as SelectUserType}
          activeShop={activeShop}
          setActiveShop={setActiveShop}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              {activeShop ? (
                activeShop.bannerUrl ? (
                  <img
                    src={activeShop.bannerUrl}
                    alt={activeShop.name}
                    className="w-2/3 max-h-24  object-cover rounded-lg"
                  />
                ) : (
                  <p>{activeShop.name}</p>
                )
              ) : null}
              <p>{user.name}</p>
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
