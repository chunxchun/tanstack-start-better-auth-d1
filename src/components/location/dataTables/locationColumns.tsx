import type { SelectLocationType as Location } from "@/db/schema";
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

type LocationColumnsOptions = {
  rowNumberOffset?: number;
  onView: (location: Location) => void;
  onEdit: (location: Location) => void;
  onDelete: (location: Location) => void;
};

export const getLocationColumns = ({
  rowNumberOffset = 0,
  onView,
  onEdit,
  onDelete,
}: LocationColumnsOptions): ColumnDef<Location>[] => [
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "addressLine1",
    header: "Street",
  },
  {
    id: "cityCountry",
    header: "City / Country",
    cell: ({ row }) =>
      `${row.original.addressCity}, ${row.original.addressCountry}`,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const location = row.original;

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
            <DropdownMenuItem onClick={() => onView(location)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(location)}>
              Edit location
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete(location)}
            >
              Delete location
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
