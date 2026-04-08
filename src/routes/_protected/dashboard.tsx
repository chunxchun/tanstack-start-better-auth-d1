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
import { useEffect, useState } from "react";

const ACTIVE_SHOP_STORAGE_KEY = "active-shop-id";

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
  const [activeShop, setActiveShop] = useState<SelectShopType>(() => {
    if (typeof window === "undefined") {
      return shops[0];
    }

    const storedShopId = window.localStorage.getItem(ACTIVE_SHOP_STORAGE_KEY);
    if (!storedShopId) {
      return shops[0];
    }

    const matchedShop = shops.find((shop) => shop.id === Number(storedShopId));
    return matchedShop ?? shops[0];
  });

  useEffect(() => {
    if (!activeShop) {
      return;
    }

    window.localStorage.setItem(
      ACTIVE_SHOP_STORAGE_KEY,
      String(activeShop.id),
    );
  }, [activeShop]);

  useEffect(() => {
    if (!shops.length) {
      return;
    }

    const matchedShop = shops.find((shop) => shop.id === activeShop?.id);
    if (matchedShop) {
      if (matchedShop !== activeShop) {
        setActiveShop(matchedShop);
      }
      return;
    }

    setActiveShop(shops[0]);
  }, [activeShop, shops]);

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
