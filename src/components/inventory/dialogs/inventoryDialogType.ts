import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";
import type {
  InsertInventoryType,
  SelectInventoryType,
  UpdateInventoryType,
} from "@/db/schema/inventoryTable";
import type { InventoryFormBaseProps } from "../forms/inventoryFormType";

export type InventoryEditDialogProps = InventoryFormBaseProps &
  EditDialogProps<SelectInventoryType> & {
    onSubmit: (values: UpdateInventoryType) => Promise<void>;
  };

export type InventoryCreateDialogProps = InventoryFormBaseProps &
  CreateDialogProps & {
    onSubmit: (values: InsertInventoryType) => Promise<void>;
  };

export type InventoryViewDialogProps = ViewDialogProps<SelectInventoryType>;

export type InventoryDeleteDialogProps = DeleteDialogProps<SelectInventoryType>;
