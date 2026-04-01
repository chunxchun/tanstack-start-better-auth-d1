import { Button } from "@/components/ui/button";
import { getUserColumns } from "@/components/user/dataTables/userColumns";
import { DataTable } from "@/components/user/dataTables/userDataTable";
import CreateUserDialog from "@/components/user/dialogs/CreateUserDialog";
import DeleteUserDialog from "@/components/user/dialogs/DeleteUserDialog";
import EditUserDialog from "@/components/user/dialogs/EditUserDialog";
import ViewUserDialog from "@/components/user/dialogs/ViewUserDialog";
import type {
  InsertUserType,
  SelectUserType,
  UpdateUserType,
} from "@/db/schema/authSchema";
import { searchSchema } from "@/db/schema/commonSchema";
import { listShopFn } from "@/utils/shop/shop.function";
import {
  createUserFn,
  deleteUserByIdFn,
  listUserFn,
  updateUserByIdFn,
} from "@/utils/user/user.function";
import { getImageUrl } from "@/utils/user/user.helper";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_protected/dashboard/users/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => {
    const [users, shops] = await Promise.all([
      listUserFn({ data: deps }),
      listShopFn({ data: { limit: 100, offset: 0 } })
    ]);
    return { users, shops };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {users, shops} = Route.useLoaderData();
  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SelectUserType | null>(null);

  const { limit, offset } = search;
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = users.length === limit;

  const updatePagination = (next: { limit: number; offset: number }) => {
    navigate({
      search: (prev: any) => ({
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
      getUserColumns({
        rowNumberOffset: offset,
        onView: (user) => {
          setSelectedUser(user);
          setViewOpen(true);
        },
        onEdit: (user) => {
          setSelectedUser(user);
          setEditOpen(true);
        },
        onDelete: (user) => {
          setSelectedUser(user);
          setDeleteOpen(true);
        },
      }),
    [offset],
  );

  const handleCreateSubmit = async (
    values: InsertUserType,
    image: File | null = null,
  ) => {
    try {
      const result = await createUserFn({ data: values });
      if (!result || result.length === 0) {
        throw new Error("Failed to create user: No result returned");
      }

      const userId = result[0].id;

      let imageUrl: string | null = null;

      if (image) {
        imageUrl = await getImageUrl(image, userId);
      }

      await updateUserByIdFn({
        data: {
          id: userId,
          image: imageUrl ?? null,
        },
      });

      toast.success("User created successfully");
    } catch (error) {
      console.error("Failed to create user:", error);
      toast.error("Failed to create user");
    } finally {
      setCreateOpen(false);
      await router.invalidate();
    }
  };

  const handleEditSubmit = async (
    values: UpdateUserType,
    image: File | null = null,
  ) => {
    if (!selectedUser) return;

    try {
      if (image) {
        values.image = await getImageUrl(image, selectedUser.id);
      }

      const result = await updateUserByIdFn({ data: values });

      if (!result || result.length === 0) {
        throw new Error("Failed to update user: No result returned");
      }

      toast.success("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user");
    } finally {
      setEditOpen(false);
      setSelectedUser(null);
      await router.invalidate();
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      await deleteUserByIdFn({ data: { id: selectedUser.id } });
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    } finally {
      setDeleteOpen(false);
      setSelectedUser(null);
      await router.invalidate();
    }
  };

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
          <CreateUserDialog
            open={createOpen}
            shops={shops}
            onOpenChange={setCreateOpen}
            onSubmit={handleCreateSubmit}
            onCancel={() => setCreateOpen(false)}
          />
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            Page {currentPage}
          </div>

          <div className="flex items-center gap-2">
            <label
              className="text-sm text-muted-foreground"
              htmlFor="user-page-size"
            >
              Rows
            </label>
            <select
              id="user-page-size"
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

        <DataTable columns={columns} data={users} />
      </div>

      <ViewUserDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedUser(null);
        }}
        onCancel={() => {
          setViewOpen(false);
          setSelectedUser(null);
        }}
        initialData={selectedUser as SelectUserType}
      />

      <EditUserDialog
        open={editOpen}
        shops={shops}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedUser(null);
        }}
        onSubmit={handleEditSubmit}
        onCancel={() => {
          setEditOpen(false);
          setSelectedUser(null);
        }}
        initialData={selectedUser as SelectUserType}
      />

      <DeleteUserDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedUser(null);
        }}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedUser(null);
        }}
        onDelete={handleDeleteConfirm}
        data={selectedUser as SelectUserType}
      />
    </>
  );
}
