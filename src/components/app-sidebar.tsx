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

const data = {
  navMain: [
    {
      title: "Profile",
      url: "#",
      icon: <BotIcon />,
      isActive: true,
      items: [
        { title: "Shops", url: "/dashboard/shops", canAccess: ["admin"] },
        {
          title: "Branding",
          url: "/dashboard/branding",
          canAccess: ["admin", "manager"],
        },
        {
          title: "Users",
          url: "/dashboard/users",
          canAccess: ["admin", "manager"],
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
          canAccess: ["admin"],
        },
        {
          title: "Machines",
          url: "/dashboard/machines",
          canAccess: ["admin"],
        },
        {
          title: "Schedules",
          url: "/dashboard/schedules",
          canAccess: ["admin", "manager"],
        },
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
          canAccess: ["admin", "manager", "staff"],
        },
        {
          title: "Menus",
          url: "/dashboard/menus",
          canAccess: ["admin", "manager", "staff"],
        },
        {
          title: "Disposes",
          url: "/dashboard/disposes",
          canAccess: ["admin", "manager", "staff"],
        },
        {
          title: "Inventories",
          url: "/dashboard/inventories",
          canAccess: ["admin", "manager", "staff"],
        },
      ],
    },
    {
      title: "Logistics",
      url: "#",
      icon: <Truck />,
      items: [
        {
          title: "Delivery",
          url: "/dashboard/deliveries",
          canAccess: ["admin", "manager", "staff"],
        },
      ],
    },
    {
      title: "Business",
      url: "#",
      icon: <CircleDollarSign />,
      items: [
        {
          title: "Sales",
          url: "/dashboard/sales",
          canAccess: ["admin"],
        },
        {
          title: "Daily Sales",
          url: "/dashboard/daily-sales",
          canAccess: ["admin", "manager", "staff"],
        },
        {
          title: "WeeklySales",
          url: "/dashboard/weekly-sales",
          canAccess: ["admin", "manager", "staff"],
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "User Guide",
          url: "/dashboard/user-guide",
          canAccess: ["admin", "manager", "staff"],
        },
        {
          title: "API documents",
          url: "/dashboard/api-doc",
          canAccess: ["admin", "manager", "staff"],
        },
        {
          title: "Changelog",
          url: "/dashboard/changelog",
          canAccess: ["admin", "manager", "staff"],
          disabled: true,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        // {
        //   title: "Layout",
        //   url: "/dashboard/layout",
        //   canAccess: ["admin", "manager", "staff"],
        // },
        {
          title: "Language",
          url: "/dashboard/language",
          canAccess: ["admin", "manager", "staff"],
          disabled: true,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Live Chat",
      url: "https://wa.me/+85253487126",
      icon: <LifeBuoy />,
    },
    {
      name: "FAQs",
      url: "/dashboard/faqs",
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
  const { role } = user;
  const filteredNavMain = data.navMain.flatMap((section) => {
    const filteredItems = section.items.filter((nav) =>
      nav.canAccess.includes(role),
    );

    if (filteredItems.length === 0) {
      return [];
    }

    return [
      {
        ...section,
        items: filteredItems,
      },
    ];
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {role === "admin" && (
          <ShopSwitcher
            shops={shops}
            activeShop={activeShop}
            setActiveShop={setActiveShop}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <div className="flex min-h-full flex-1 flex-col justify-between">
          <NavMain items={filteredNavMain} />
          <NavProjects projects={data.projects} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
