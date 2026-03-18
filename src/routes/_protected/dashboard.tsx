import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { listShopFn } from "@/utils/shop/shop.function";

export const Route = createFileRoute("/_protected/dashboard")({
  loader: async () => {
    const shops = await listShopFn({ data: { limit: 100, offset: 0 } });
    return { shops };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { shops } = Route.useLoaderData();

  
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar shops={shops} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <p>banner</p>
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
