import { getUserColumns } from "@/components/dataTables/user/userColumns";
import { DataTable } from "@/components/dataTables/user/userDataTable";
import { UserForm } from "@/components/forms/user/userForm";
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
import type {
  InsertSystemUserType,
  SelectSystemUserType,
  SelectSystemUserType as User,
  UpdateSystemUserType,
} from "@/db/schema";
import { searchSchema } from "@/db/schema/commonSchema";
import {
  createUserFn,
  deleteUserByIdFn,
  listUserFn,
  updateUserByIdFn,
} from "@/utils/user/user.function";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { type ChangeEvent, useMemo, useState } from "react";

export const Route = createFileRoute("/_protected/dashboard/user/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => listUserFn({ data: deps }),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { limit, offset } = search;
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = data.length === limit;

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
      getUserColumns({
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
    [],
  );

  const handleCreateSubmit = async (values: InsertSystemUserType) => {
    try {
      await createUserFn({ data: values });
      setCreateOpen(false);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleEditSubmit = async (values: UpdateSystemUserType) => {
    if (!selectedUser) return;

    try {
      await updateUserByIdFn({ data: values });
      setEditOpen(false);
      setSelectedUser(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      await deleteUserByIdFn({ data: { id: selectedUser.id } });
      setDeleteOpen(false);
      setSelectedUser(null);
      await router.invalidate();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-10 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
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
              <UserForm
                mode="create"
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
            <label className="text-sm text-muted-foreground" htmlFor="user-page-size">
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

        <DataTable columns={columns} data={data} />
      </div>

      <Dialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedUser(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <UserForm
            mode="view"
            initialData={selectedUser as SelectSystemUserType}
            onCancel={() => {
              setViewOpen(false);
              setSelectedUser(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setSelectedUser(null);
        }}
      >
        <DialogContent
          className="min-w-[50vw]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <UserForm
            mode="edit"
            initialData={selectedUser as UpdateSystemUserType}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditOpen(false);
              setSelectedUser(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedUser(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete user</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete
              {selectedUser ? ` ${selectedUser.displayName}` : " this user"}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedUser(null);
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
