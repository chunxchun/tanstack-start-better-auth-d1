import type { SelectSpecialHourType } from "@/db/schema";
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

type SpecialHourColumnsOptions = {
  rowNumberOffset?: number;
  onView: (specialHour: SelectSpecialHourType) => void;
  onEdit: (specialHour: SelectSpecialHourType) => void;
  onDelete: (specialHour: SelectSpecialHourType) => void;
};

export const getSpecialHourColumns = ({
  rowNumberOffset = 0,
  onView,
  onEdit,
  onDelete,
}: SpecialHourColumnsOptions): ColumnDef<SelectSpecialHourType>[] => [
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
    accessorKey: "specificDate",
    header: "Date",
  },
  {
    accessorKey: "openingTime",
    header: "Opening Time",
  },
  {
    accessorKey: "closingTime",
    header: "Closing Time",
  },
  {
    accessorKey: "isClosed",
    header: "Closed",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const specialHour = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open special hour</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onView(specialHour)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(specialHour)}>
              Edit special hour
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete(specialHour)}
            >
              Delete special hour
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
