"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { ShopSwitcher } from "@/components/shop-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  SquareTerminal,
  ShoppingCart,
  Truck,
  CircleDollarSign,
  FileQuestionMark,
  LifeBuoy,
} from "lucide-react";
import type { SelectShopType } from "@/db/schema";
import type { SelectUserType } from "@/db/schema/authSchema";
import type { Dispatch, SetStateAction } from "react";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Profile",
      url: "#",
      icon: <BotIcon />,
      isActive: true,
      items: [
        { title: "Shops", url: "/dashboard/shops" },
        {
          title: "Branding",
          url: "/dashboard/branding",
        },
        {
          title: "Users",
          url: "/dashboard/users",
        },
      ],
    },
    {
      title: "Vending Machines",
      url: "#",
      icon: <SquareTerminal />,
      items: [
        {
          title: "Locations",
          url: "/dashboard/locations",
        },
        {
          title: "Machines",
          url: "/dashboard/machines",
        },
        { title: "Schedules", url: "/dashboard/schedules" },
        // { title: "Maintainence & Repair", url: "#", disabled: true },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: <ShoppingCart />,
      items: [
        {
          title: "Food Items",
          url: "/dashboard/food-items",
        },
        { title: "Menus", url: "/dashboard/menus" },
        { title: "Disposes", url: "/dashboard/disposes" },
        { title: "Inventories", url: "/dashboard/inventories" },
      ],
    },
    {
      title: "Logistics",
      url: "#",
      icon: <Truck />,
      items: [{ title: "Delivery", url: "/dashboard/deliveries" }],
    },
    {
      title: "Business",
      url: "#",
      icon: <CircleDollarSign />,
      items: [{ title: "Daily Sales", url: "/dashboard/daily-sales" }],
    },
    {
      title: "Documentation",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "User Guide",
          url: "/dashboard/user-guide",
        },
        { title: "API documents", url: "/dashboard/api-doc" },
        {
          title: "Changelog",
          url: "#",
          disabled: true,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "Layout",
          url: "/dashboard/layout",
        },
        {
          title: "Language",
          url: "/dashboard/language",
          disabled: true,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Support",
      url: "#",
      icon: <LifeBuoy />,
    },
    {
      name: "FAQs",
      url: "#",
      icon: <FileQuestionMark />,
    },
  ],
};

export function AppSidebar({
  shops,
  user,
  activeShop,
  setActiveShop,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  shops: SelectShopType[];
  user: SelectUserType;
  activeShop: SelectShopType;
  setActiveShop: Dispatch<SetStateAction<SelectShopType>>;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ShopSwitcher
          shops={shops}
          activeShop={activeShop}
          setActiveShop={setActiveShop}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
