import { getMenuColumns } from "@/components/menu/dataTables/menuColumns";
import { DataTable } from "@/components/menu/dataTables/menuDataTable";
import CreateMenuDialog from "@/components/menu/dialogs/CreateMenuDialog";
import DeleteMenuDialog from "@/components/menu/dialogs/DeleteMenuDialog";
import EditMenuDialog from "@/components/menu/dialogs/EditMenuDialog";
import ViewMenuDialog from "@/components/menu/dialogs/ViewMenuDialog";
import type {
  InsertMenuWithFoodItemsType,
  SelectMenuWithFoodItemsType,
  UpdateMenuWithFoodItemsType,
} from "@/db/schema";
import { searchSchema } from "@/db/schema/commonSchema";
import { listFoodItemFn } from "@/utils/foodItem/foodItem.function";
import {
  deleteMenuByIdFn,
  listMenuWithFoodItemFn,
} from "@/utils/menu/menu.function";
import {
  constructMenuWithFoodItem,
  menuHandleCreateSubmit,
  menuHandleUpdateSubmit,
  type queryMenuWithFoodItemType,
} from "@/utils/menu/menu.helper";
import { listShopFn } from "@/utils/shop/shop.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CreateButton from "../-shared/createButton";
import DataTableNavigator from "../-shared/data-table-navigator";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";

export const Route = createFileRoute("/_protected/dashboard/menus/")({
  validateSearch: searchSchema,
  // beforeLoad: async () => {
  //   const session = await getSession();

  //   if (!session) {
  //     throw redirect({
  //       to: "/login",
  //     });

  //   }
  //   const user = session.user;
  //   if (user.role === "admin") {
  //     throw redirect({ to: "/dashboard/admin-only" });
  //   }
  //   return { user };
  // },
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const [menuWithFoodItems, shops, foodItems] = await Promise.all([
      // listMenuFn({ data: deps }),
      listMenuWithFoodItemFn({ data: { ...deps, shopId } }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
      listFoodItemFn({ data: { limit: 100, offset: 0, shopId } }),
    ]);
    return { menuWithFoodItems, shops, foodItems, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { menuWithFoodItems, shops, foodItems, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  // console.log("Loaded menu with food items:", menuWithFoodItems);
  const constructedMenus = constructMenuWithFoodItem(
    menuWithFoodItems as queryMenuWithFoodItemType[],
  );
  // console.log(
  //   "Constructed menus with food items:",
  //   JSON.stringify(constructedMenus),
  // );
  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedMenu, setSelectedMenu] =
    useState<SelectMenuWithFoodItemsType | null>(null);

  const { limit, offset } = search;

  const updatePagination = (next: { limit: number; offset: number }) => {
    navigate({
      search: (prev) => ({
        ...prev,
        limit: next.limit,
        offset: next.offset,
      }),
    });
  };

  const columns = useMemo(
    () =>
      getMenuColumns({
        onView: (menu) => {
          setSelectedMenu(menu);
          setViewOpen(true);
        },
        onEdit: (menu) => {
          setSelectedMenu(menu);
          setEditOpen(true);
        },
        onDelete: (menu) => {
          setSelectedMenu(menu);
          setDeleteOpen(true);
        },
      }),
    [],
  );

  const handleCreateSubmit = async (
    values: InsertMenuWithFoodItemsType,
    image: File | null = null,
    shopId: string | number | null = null,
  ) => {
    try {
      await menuHandleCreateSubmit(values, image, shopId);
      setSelectedMenu(null);
      toast.success("Menu created successfully");
    } catch (error) {
      console.error("Failed to create menu:", error);
      toast.error("Failed to create menu");
    } finally {
      setCreateOpen(false);
      await router.invalidate();
    }
  };

  const handleEditSubmit = async (
    values: UpdateMenuWithFoodItemsType,
    image: File | null = null,
    shopId: string | number | null = null,
  ) => {
    if (!selectedMenu) return;

    try {
      await menuHandleUpdateSubmit(values, image, shopId);
      setSelectedMenu(null);
      toast.success("Menu updated successfully");
    } catch (error) {
      console.error("Failed to update menu:", error);
      toast.error("Failed to update menu");
    } finally {
      setEditOpen(false);
      await router.invalidate();
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMenu) return;

    try {
      await deleteMenuByIdFn({ data: { id: selectedMenu.id } });
      setSelectedMenu(null);
    } catch (error) {
      console.error("Failed to delete menu:", error);
      toast.error("Failed to delete menu");
    } finally {
      setDeleteOpen(false);
      await router.invalidate();
    }
  };

  return (
    <>
      <RouteLayout>
        <RouteHeader title="Menus" />
        <DataTableNavigator
          limit={limit}
          offset={offset}
          list={menuWithFoodItems}
          updatePagination={updatePagination}
        />
        <DataTable columns={columns} data={constructedMenus} />
        <CreateButton handleClick={() => setCreateOpen(true)} />
      </RouteLayout>

      <CreateMenuDialog
        open={createOpen}
        shops={shops}
        foodItems={foodItems}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateSubmit}
        onCancel={() => setCreateOpen(false)}
        defaultShopId={defaultShopId}
      />
      <ViewMenuDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedMenu(null);
        }}
        shops={shops}
        foodItems={foodItems}
        initialData={selectedMenu as SelectMenuWithFoodItemsType}
        onCancel={() => {
          setViewOpen(false);
          setSelectedMenu(null);
        }}
      />

      <EditMenuDialog
        open={editOpen}
        shops={shops}
        foodItems={foodItems}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedMenu(null);
        }}
        onSubmit={handleEditSubmit}
        onCancel={() => {
          setEditOpen(false);
          setSelectedMenu(null);
        }}
        initialData={selectedMenu as SelectMenuWithFoodItemsType}
        defaultShopId={defaultShopId}
      />

      <DeleteMenuDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedMenu(null);
        }}
        onDelete={handleDeleteConfirm}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedMenu(null);
        }}
        data={selectedMenu as SelectMenuWithFoodItemsType}
      />
    </>
  );
}
