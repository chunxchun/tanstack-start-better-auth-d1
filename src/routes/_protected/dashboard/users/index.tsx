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
import { deleteUserByIdFn, listUserFn } from "@/utils/user/user.function";
import {
  userHandleCreateSubmit,
  userHandleUpdateSubmit,
} from "@/utils/user/user.helper";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";
import DataTableNavigator from "../-shared/data-table-navigator";
import CreateButton from "../-shared/createButton";

export const Route = createFileRoute("/_protected/dashboard/users/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps, context }) => {
    const { user } = context;
    const shopId = user.shopId ?? undefined;

    const [users, shops] = await Promise.all([
      listUserFn({ data: { ...deps, shopId } }),
      listShopFn({ data: { limit: 100, offset: 0 } }),
    ]);
    return { users, shops, user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { users, shops, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<SelectUserType | null>(null);

  const { limit, offset } = search;

  const updatePagination = (next: { limit: number; offset: number }) => {
    navigate({
      search: (prev: any) => ({
        ...prev,
        limit: next.limit,
        offset: next.offset,
      }),
    });
  };

  const columns = useMemo(
    () =>
      getUserColumns({
        rowNumberOffset: offset,
        shops,
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
    [offset, shops],
  );

  const handleCreateSubmit = async (
    values: InsertUserType,
    image: File | null = null,
    shopId: number | null = null,
  ) => {
    try {
      await userHandleCreateSubmit(values, image, shopId);
      setSelectedUser(null);
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
    shopId: number | null = null,
  ) => {
    if (!selectedUser) return;

    try {
      const updatedUser = {...values, shopId: shopId ?? Number(values.shopId)};
      await userHandleUpdateSubmit(updatedUser, image, shopId);
      setSelectedUser(null);
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user");
    } finally {
      setEditOpen(false);
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
      <RouteLayout>
        <RouteHeader title="Users" />
        <DataTableNavigator
          limit={limit}
          offset={offset}
          list={users}
          updatePagination={updatePagination}
        />
        <DataTable columns={columns} data={users} />
        <CreateButton handleClick={() => setCreateOpen(true)} />
      </RouteLayout>

      <CreateUserDialog
        open={createOpen}
        shops={shops}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateSubmit}
        onCancel={() => setCreateOpen(false)}
        defaultShopId={defaultShopId}
      />

      <ViewUserDialog
        open={viewOpen}
        shops={shops}
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
