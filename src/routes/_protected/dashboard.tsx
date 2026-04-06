import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShopProvider } from "@/context/shop.provider";
import type { SelectShopType } from "@/db/schema";
import type { SelectUserType } from "@/db/schema/authSchema";
import { getVersionedImageUrl } from "@/lib/utils";
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
  const [activeShop, setActiveShop] = useState<SelectShopType>(shops[0]);

  return (
    <TooltipProvider>
      <SidebarProvider>
        
        <ShopProvider initialValue={activeShop}>
          <AppSidebar
            shops={shops}
            user={user as SelectUserType}
            activeShop={activeShop}
            setActiveShop={setActiveShop}
          />
          <SidebarInset>
            <header className="w-full shrink-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              {activeShop ? (
                activeShop.bannerUrl ? (
                  <img
                    src={getVersionedImageUrl(
                      activeShop.bannerUrl,
                      activeShop.updatedAt,
                    )}
                    alt={activeShop.name}
                    className="block h-32 w-full object-cover"
                  />
                ) : (
                  <p className="px-4 py-6 text-lg font-semibold">{activeShop.name}</p>
                )
              ) : null}
            </header>
            <Outlet />
          </SidebarInset>
        </ShopProvider>
      </SidebarProvider>
    </TooltipProvider>
  );
}
