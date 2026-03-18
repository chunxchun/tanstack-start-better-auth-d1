import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SelectSystemUserType as User } from "@/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

type UserColumnsOptions = {
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export const getUserColumns = ({
  onView,
  onEdit,
  onDelete,
}: UserColumnsOptions): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "shopId",
    header: "Shop",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "displayName",
    header: "Display Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onView(user)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(user)}>
              Edit user
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(user)}>
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
