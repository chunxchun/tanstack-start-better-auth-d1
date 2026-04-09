import type { SelectDisposeType as Dispose, SelectFoodItemType, SelectMachineType, SelectShopType } from "@/db/schema";
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

type DisposeColumnsOptions = {
  rowNumberOffset?: number;
  foodItems?: SelectFoodItemType[];
  machines?: SelectMachineType[];
  onView: (dispose: Dispose) => void;
  onEdit: (dispose: Dispose) => void;
  onDelete: (dispose: Dispose) => void;
};

export const getDisposeColumns = ({
  rowNumberOffset = 0,
  machines = [],
  foodItems = [],
  onView,
  onEdit,
  onDelete,
}: DisposeColumnsOptions): ColumnDef<Dispose>[] => [
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
    accessorKey: "machineId",
    header: "Machine",
    cell: ({ row }) => {
      const machineId = row.original.machineId;
      if (!machineId) return <span>-</span>
      
      const machine = machines.find(item => item.id === machineId);
      return machine?.name ?? `Unknown machine ${machineId}`;
    }
  },
  {
    accessorKey: "foodItemId",
    header: "Food Item",
    cell: ({ row }) => {
      const foodItemId = row.original.foodItemId;
      if (!foodItemId) return <span>-</span>
      
      const foodItem = foodItems.find(item => item.id === foodItemId);
      return foodItem?.name ?? `Unknown food item ${foodItemId}`;
    }
  },
  {
    accessorKey: "disposeDate",
    header: "Date",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "disposeReason",
    header: "Reason",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const dispose = row.original;

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
            <DropdownMenuItem onClick={() => onView(dispose)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(dispose)}>
              Edit dispose
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete(dispose)}
            >
              Delete dispose
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
