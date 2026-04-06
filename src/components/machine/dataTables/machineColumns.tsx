import type { SelectLocationType, SelectMachineType } from "@/db/schema";
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

type MachineColumnsOptions = {
  rowNumberOffset?: number;
  locations?: SelectLocationType[];
  onView: (machine: SelectMachineType) => void;
  onEdit: (machine: SelectMachineType) => void;
  onDelete: (machine: SelectMachineType) => void;
};

export const getMachineColumns = ({
  rowNumberOffset = 0,
  locations = [],
  onView,
  onEdit,
  onDelete,
}: MachineColumnsOptions): ColumnDef<SelectMachineType>[] => [
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
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "version",
    header: "Version",
  },
  {
    accessorKey: "mode",
    header: "Mode",
  },
  // {
  //   accessorKey: "dayEndAutoReset",
  //   header: "Day End Auto Reset",
  //   cell: ({ row }) => (row.original.dayEndStockAutoReset ? "Yes" : "No"),
  // },
  {
    accessorKey: "locationId",
    header: "Location",
    cell: ({ row }) => {
      const locationId = row.original.locationId;
      if (!locationId) {
        return "-";
      }

      const location = locations.find((item) => item.id === locationId);
      return location?.name ?? `Unknown (${locationId})`;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const machine = row.original;

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
            <DropdownMenuItem onClick={() => onView(machine)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(machine)}>
              Edit machine
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete(machine)}
            >
              Delete machine
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
