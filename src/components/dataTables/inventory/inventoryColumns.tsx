import type { SelectInventory as Inventory } from "@/db/schema";
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

type InventoryColumnsOptions = {
  onView: (inventory: Inventory) => void;
  onEdit: (inventory: Inventory) => void;
  onDelete: (inventory: Inventory) => void;
};

export const getInventoryColumns = ({
  onView,
  onEdit,
  onDelete,
}: InventoryColumnsOptions): ColumnDef<Inventory>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "machineId",
    header: "Machine",
  },
  {
    accessorKey: "foodItemId",
    header: "Food Item",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const inventory = row.original;

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
            <DropdownMenuItem onClick={() => onView(inventory)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(inventory)}>
              Edit inventory
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(inventory)}>
              Delete inventory
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
