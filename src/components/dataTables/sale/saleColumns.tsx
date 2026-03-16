import type { SelectSale as Sale } from "@/db/schema";
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
  onView: (sale: Sale) => void;
  onEdit: (sale: Sale) => void;
  onDelete: (sale: Sale) => void;
};

export const getSaleColumns = ({
  onView,
  onEdit,
  onDelete,
}: SaleColumnsOptions): ColumnDef<Sale>[] => [
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
