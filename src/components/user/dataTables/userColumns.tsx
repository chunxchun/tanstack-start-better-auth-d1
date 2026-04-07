import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SelectShopType } from "@/db/schema";
import type { SelectUserType as User } from "@/db/schema/authSchema";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

type UserColumnsOptions = {
  rowNumberOffset?: number;
  shops?: SelectShopType[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export const getUserColumns = ({
  rowNumberOffset = 0,
  shops = [],
  onView,
  onEdit,
  onDelete,
}: UserColumnsOptions): ColumnDef<User>[] => {
  const shopNameById = new Map(shops.map((shop) => [shop.id, shop.name]));

  return [
  {
    id: "rowNumber",
    header: "#",
    cell: ({ row }) => {
      return (
        <span className="font-mono">{rowNumberOffset + row.index + 1}</span>
      );
    },
  },
  {
    accessorKey: "shopId",
    header: "Shop",
    cell: ({ getValue }) => {
      const shopId = getValue() as number | null;
      if (shopId == null) {
        return <span>-</span>;
      }

      return shopNameById.get(shopId) ?? String(shopId);
    },
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
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete(user)}
            >
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  ];
};
