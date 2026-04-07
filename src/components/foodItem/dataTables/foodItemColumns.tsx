import type { SelectFoodItemType as FoodItem } from "@/db/schema";
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

type FoodItemColumnsOptions = {
  rowNumberOffset?: number;
  onView: (foodItem: FoodItem) => void;
  onEdit: (foodItem: FoodItem) => void;
  onDelete: (foodItem: FoodItem) => void;
};

export const getFoodItemColumns = ({
  rowNumberOffset = 0,
  onView,
  onEdit,
  onDelete,
}: FoodItemColumnsOptions): ColumnDef<FoodItem>[] => [
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
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ getValue, row }) => {
      const imageUrl = getValue() as string | null;
      const updatedAt = row.original.updatedAt;
      return imageUrl ? (
        <img
          src={getVersionedImageUrl(imageUrl, updatedAt)}
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
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
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
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete(foodItem)}
            >
              Delete food item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
