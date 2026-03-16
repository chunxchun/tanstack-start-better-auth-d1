import type { SelectDispose as Dispose } from "@/db/schema";
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
  onView: (dispose: Dispose) => void;
  onEdit: (dispose: Dispose) => void;
  onDelete: (dispose: Dispose) => void;
};

export const getDisposeColumns = ({
  onView,
  onEdit,
  onDelete,
}: DisposeColumnsOptions): ColumnDef<Dispose>[] => [
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
            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(dispose)}>
              Delete dispose
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
