// import type { SelectMenuType as Menu } from "@/db/schema";
import type { SelectMenuWithFoodItemsType as Menu } from "@/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getVersionedImageUrl } from "@/lib/utils";

type MenuColumnsOptions = {
  rowNumberOffset?: number;
  onView: (menu: Menu) => void;
  onEdit: (menu: Menu) => void;
  onDelete: (menu: Menu) => void;
};

export const getMenuColumns = ({
  rowNumberOffset = 0,
  onView,
  onEdit,
  onDelete,
}: MenuColumnsOptions): ColumnDef<Menu>[] => [
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
    accessorKey: "coverPhotoUrl",
    header: "Cover",
    cell: ({ getValue, row }) => {
      const coverPhotoUrl = getValue() as string | null;
      const updatedAt = row.original.updatedAt;
      return coverPhotoUrl ? (
        <img
          src={getVersionedImageUrl(coverPhotoUrl, updatedAt)}
          alt={row.original.name}
          className="max-h-16 object-contain"
        />
      ) : (
        <span>-</span>
      );
    },
  },
  // { accessorKey: "shopId", header: "Shop" },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const menu = row.original;

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
            <DropdownMenuItem onClick={() => onView(menu)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(menu)}>
              Edit menu
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete(menu)}
            >
              Delete menu
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
