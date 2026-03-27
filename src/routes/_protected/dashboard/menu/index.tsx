import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MenuForm } from "@/components/menu/forms/menuForm";
import type {
  InsertMenuType,
  SelectMenuType,
  SelectMenuType as Menu,
  UpdateMenuType,
} from "@/db/schema";
import { searchSchema } from "@/db/schema/commonSchema";
import {
  createMenuFn,
  deleteMenuByIdFn,
  listMenuFn,
  updateMenuByIdFn,
} from "@/utils/menu/menu.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";
import { DataTable } from "@/components/menu/dataTables/menuDataTable";
import { getMenuColumns } from "@/components/menu/dataTables/menuColumns";
import { listFoodItemFn } from "@/utils/foodItem/foodItem.function";
import { listShopFn } from "@/utils/shop/shop.function";

export const Route = createFileRoute("/_protected/dashboard/menu/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => {
    const [menus, shops, foodItems] = await  Promise.all([
      listMenuFn({ data: deps }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
      listFoodItemFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { menus, shops, foodItems };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { menus, shops, foodItems } = Route.useLoaderData();
  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const { limit, offset } = search;
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = menus.length === limit;

  const updatePagination = (next: { limit: number; offset: number }) => {
    navigate({
      search: (prev) => ({
        ...prev,
        limit: next.limit,
        offset: next.offset,
      }),
    });
  };

  const goToPreviousPage = () => {
    if (!hasPreviousPage) return;

    updatePagination({
      limit,
      offset: Math.max(0, offset - limit),
    });
  };

  const goToNextPage = () => {
    if (!hasNextPage) return;

    updatePagination({
      limit,
      offset: offset + limit,
    });
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLimit = Number(event.target.value);

    updatePagination({
      limit: nextLimit,
      offset: 0,
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

  const handleCreateSubmit = async (values: InsertMenuType) => {
    try {
      const parsedValues = { ...values, shopId: Number(values.shopId) };
      await createMenuFn({ data: parsedValues });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create menu:", error);
    }
  };

  const handleEditSubmit = async (values: UpdateMenuType) => {
    if (!selectedMenu) return;

    try {
      const parsedValues = { ...values, shopId: Number(values.shopId) };
      await updateMenuByIdFn({ data: parsedValues });

      setEditOpen(false);
      setSelectedMenu(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update menu:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMenu) return;

    try {
      await deleteMenuByIdFn({ data: { id: selectedMenu.id } });
      setDeleteOpen(false);
      setSelectedMenu(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to delete menu:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Menu</h1>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <span>+</span>Create
              </Button>
            </DialogTrigger>
            <DialogContent
              className="min-w-[50vw]"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <MenuForm
                mode="create"
                shops={shops}
                foodItems={foodItems}
                onSubmit={handleCreateSubmit}
                onCancel={() => setCreateOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            Page {currentPage}
          </div>

          <div className="flex items-center gap-2">
            <label
              className="text-sm text-muted-foreground"
              htmlFor="menu-page-size"
            >
              Rows
            </label>
            <select
              id="menu-page-size"
              className="h-9 rounded-md border bg-background px-2 text-sm"
              value={limit}
              onChange={handleLimitChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousPage}
              disabled={!hasPreviousPage}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={goToNextPage}
              disabled={!hasNextPage}
            >
              Next
            </Button>
          </div>
        </div>

        <DataTable columns={columns} data={menus} />
      </div>

      <Dialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedMenu(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <MenuForm
            mode="view"
            initialData={selectedMenu as SelectMenuType}
            onCancel={() => {
              setViewOpen(false);
              setSelectedMenu(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedMenu(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <MenuForm
            mode="edit"
            initialData={selectedMenu as UpdateMenuType}
            shops={shops}
            foodItems={foodItems}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditOpen(false);
              setSelectedMenu(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedMenu(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete menu</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete
              {selectedMenu ? ` ${selectedMenu.name}` : " this menu"}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedMenu(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
