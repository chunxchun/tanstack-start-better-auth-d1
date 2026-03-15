import type { SelectShop as Shop } from "@/db/schema";
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

type ShopColumnsOptions = {
  onView: (shop: Shop) => void;
  onEdit: (shop: Shop) => void;
  onDelete: (shop: Shop) => void;
};

export const getShopColumns = ({ onView, onEdit, onDelete }: ShopColumnsOptions): ColumnDef<Shop>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "logoUrl",
    header: "Logo",
    cell: ({ getValue }) => {
      const logoUrl = getValue() as string | null;
      return logoUrl ? (
        <img
          src={logoUrl}
          alt="Shop Logo"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ) : <p>-</p>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const shop = row.original;

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
            <DropdownMenuItem
              onClick={() => onView(shop)}
            >
              View details
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onEdit(shop)}>
              Edit shop
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 "
              onClick={() => onDelete(shop)}
            >
              Delete shop
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
