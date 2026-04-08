import type {
  SelectFoodItemType,
  SelectMachineType,
  SelectSaleType as Sale,
} from "@/db/schema";
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

type SaleColumnsOptions = {
  rowNumberOffset?: number;
  machines?: SelectMachineType[];
  foodItems?: SelectFoodItemType[];
  onView: (sale: Sale) => void;
  onEdit: (sale: Sale) => void;
  onDelete: (sale: Sale) => void;
};

export const getSaleColumns = ({
  rowNumberOffset = 0,
  machines = [],
  foodItems = [],
  onView,
  onEdit,
  onDelete,
}: SaleColumnsOptions): ColumnDef<Sale>[] => [
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
      const machine = machines.find((item) => item.id === row.original.machineId);
      return machine?.name ?? String(row.original.machineId);
    },
  },
  {
    accessorKey: "foodItemId",
    header: "Food Item",
    cell: ({ row }) => {
      const foodItem = foodItems.find(
        (item) => item.id === row.original.foodItemId,
      );
      return foodItem?.name ?? String(row.original.foodItemId);
    },
  },
  {
    accessorKey: "saleDate",
    header: "Date",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sale = row.original;

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
            <DropdownMenuItem onClick={() => onView(sale)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(sale)}>
              Edit sale
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(sale)}>
              Delete sale
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
