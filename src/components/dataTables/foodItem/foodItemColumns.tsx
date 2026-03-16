import type { SelectFoodItem as FoodItem } from "@/db/schema";
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

type FoodItemColumnsOptions = {
  onView: (foodItem: FoodItem) => void;
  onEdit: (foodItem: FoodItem) => void;
  onDelete: (foodItem: FoodItem) => void;
};

export const getFoodItemColumns = ({
  onView,
  onEdit,
  onDelete,
}: FoodItemColumnsOptions): ColumnDef<FoodItem>[] => [
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
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const foodItem = row.original;

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
            <DropdownMenuItem onClick={() => onView(foodItem)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(foodItem)}>
              Edit food item
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(foodItem)}>
              Delete food item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
