import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertInventoryType,
  SelectInventoryType,
  UpdateInventoryType,
} from "@/db/schema";

export type InventoryFormBaseProps = FormDataDependency<
  "shops" | "machines" | "foodItems"
>;

type InventoryFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (values: InsertInventoryType) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & InventoryFormBaseProps;

type InventoryFormEditProps = {
  mode: "edit";
  initialData: SelectInventoryType;
  onSubmit: (values: UpdateInventoryType) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & InventoryFormBaseProps;

type InventoryFormViewProps = {
  mode: "view";
  initialData: SelectInventoryType;
  onSubmit?: never;
  onCancel: () => void;
  defaultShopId?: never;
} & Partial<Record<keyof InventoryFormBaseProps, never>>;

export type InventoryFormProps =
  | InventoryFormViewProps
  | InventoryFormEditProps
  | InventoryFormCreateProps;
