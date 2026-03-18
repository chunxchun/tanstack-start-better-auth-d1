import type {
  InsertInventoryType,
  SelectInventoryType,
  UpdateInventoryType,
} from "@/db/schema";

type InventoryFormBaseProps = {
  onCancel?: () => void;
};

type InventoryFormCreateProps = InventoryFormBaseProps & {
  initialData?: never;
  mode: "create";
  onSubmit: (values: InsertInventoryType) => Promise<void>;
};

type InventoryFormViewProps = InventoryFormBaseProps & {
  initialData: SelectInventoryType;
  mode: "view";
  onSubmit?: never;
};

type InventoryFormEditProps = InventoryFormBaseProps & {
  initialData: UpdateInventoryType;
  mode: "edit";
  onSubmit: (values: UpdateInventoryType) => Promise<void>;
};

export type InventoryFormProps =
  | InventoryFormViewProps
  | InventoryFormEditProps
  | InventoryFormCreateProps;
