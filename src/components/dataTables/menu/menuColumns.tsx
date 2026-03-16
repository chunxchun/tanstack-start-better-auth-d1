import type { SelectMenu as Menu } from "@/db/schema";
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

type MenuColumnsOptions = {
  onView: (menu: Menu) => void;
  onEdit: (menu: Menu) => void;
  onDelete: (menu: Menu) => void;
};

export const getMenuColumns = ({
  onView,
  onEdit,
  onDelete,
}: MenuColumnsOptions): ColumnDef<Menu>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "coverPhotoUrl",
    header: "Cover",
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
            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(menu)}>
              Delete menu
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
