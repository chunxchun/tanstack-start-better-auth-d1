"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { SelectShopType } from "@/db/schema";
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

export function ShopSwitcher({
  shops,
  activeShop,
  setActiveShop,
}: {
  shops: SelectShopType[];
  activeShop: SelectShopType;
  setActiveShop: Dispatch<SetStateAction<SelectShopType>>;
}) {
  const { isMobile } = useSidebar();

  if (!activeShop) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeShop.logoUrl ? (
                  <img
                    src={activeShop.logoUrl}
                    alt={activeShop.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeShop.name}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Shops
            </DropdownMenuLabel>
            {shops.map((shop, index) => (
              <DropdownMenuItem
                key={shop.name}
                onClick={() => setActiveShop(shop)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  {shop.logoUrl ? (
                    <img
                      src={shop.logoUrl}
                      alt={shop.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                {shop.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <Button onClick={() => {}}>
                {/* <div className="flex size-6 items-center justify-center rounded-md border bg-transparent"> */}
                <PlusIcon className="size-4" />
                {/* </div> */}
                {/* <div className="font-medium text-muted-foreground"> */}
                Add shop
                {/* </div> */}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
