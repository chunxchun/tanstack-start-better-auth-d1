import type { SelectDelivery as Delivery } from "@/db/schema";
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

type DeliveryColumnsOptions = {
  onView: (delivery: Delivery) => void;
  onEdit: (delivery: Delivery) => void;
  onDelete: (delivery: Delivery) => void;
};

export const getDeliveryColumns = ({
  onView,
  onEdit,
  onDelete,
}: DeliveryColumnsOptions): ColumnDef<Delivery>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "destinationLocationId",
    header: "Destination",
  },
  {
    accessorKey: "machineId",
    header: "Machine",
  },
  {
    accessorKey: "deliverDate",
    header: "Date",
  },
  {
    accessorKey: "deliverTime",
    header: "Time",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const delivery = row.original;

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
            <DropdownMenuItem onClick={() => onView(delivery)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(delivery)}>
              Edit delivery
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => onDelete(delivery)}>
              Delete delivery
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
