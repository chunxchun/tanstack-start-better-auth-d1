import type { SelectShopType as Shop } from "@/db/schema";
import { getVersionedImageUrl } from "@/lib/utils";
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
  rowNumberOffset?: number;
  onView: (shop: Shop) => void;
  onEdit: (shop: Shop) => void;
  onDelete: (shop: Shop) => void;
};

export const getShopColumns = ({
  rowNumberOffset = 0,
  onView,
  onEdit,
  onDelete,
}: ShopColumnsOptions): ColumnDef<Shop>[] => [
  {
    id: "rowNumber",
    header: "#",
    cell: ({ row }) => {
      return <span className="font-mono">{rowNumberOffset + row.index + 1}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    accessorKey: "bannerUrl",
    header: "Banner",
    cell: ({ getValue, row }) => {
      const bannerUrl = getValue() as string | null;
      return bannerUrl ? (
        <img
          src={getVersionedImageUrl(bannerUrl, row.original.updatedAt)}
          alt="Shop Banner"
          style={{ width: 100, height: 50, objectFit: "cover" }}
        />
      ) : <span>-</span>;
    },
  },
  {
    accessorKey: "logoUrl",
    header: "Logo",
    cell: ({ getValue, row }) => {
      const logoUrl = getValue() as string | null;
      return logoUrl ? (
        <img
          src={getVersionedImageUrl(logoUrl, row.original.updatedAt)}
          alt="Shop Logo"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ) : <span>-</span>;
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
            <DropdownMenuItem onClick={() => onView(shop)}>
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
