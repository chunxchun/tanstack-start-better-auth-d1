import type {
  InsertInventoryType,
  SelectFoodItemType,
  SelectInventoryType,
  SelectMachineType,
  SelectShopType,
  UpdateInventoryType,
} from "@/db/schema";

type InventoryFormBaseProps = {
  onCancel: () => void;
};

type InventoryFormCreateProps = InventoryFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  machines: SelectMachineType[];
  foodItems: SelectFoodItemType[];
  onSubmit: (values: InsertInventoryType) => Promise<void>;
};

type InventoryFormViewProps = InventoryFormBaseProps & {
  initialData: SelectInventoryType;
  mode: "view";
  shops?: undefined;
  machines?: undefined;
  foodItems?: undefined;
  onSubmit?: never;
};

type InventoryFormEditProps = InventoryFormBaseProps & {
  initialData: UpdateInventoryType;
  mode: "edit";
  shops: SelectShopType[];
  machines: SelectMachineType[];
  foodItems: SelectFoodItemType[];
  onSubmit: (values: UpdateInventoryType) => Promise<void>;
};

export type InventoryFormProps =
  | InventoryFormViewProps
  | InventoryFormEditProps
  | InventoryFormCreateProps;
