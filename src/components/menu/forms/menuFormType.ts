import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertMenuWithFoodItemsType,
  SelectMenuWithFoodItemsType,
  UpdateMenuWithFoodItemsType,
} from "@/db/schema";

export type MenuFormBaseProps = FormDataDependency<"shops" | "foodItems">;

type MenuFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (
    values: InsertMenuWithFoodItemsType,
    coverPhoto?: File,
  ) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & MenuFormBaseProps;

type MenuFormEditProps = {
  mode: "edit";
  initialData: SelectMenuWithFoodItemsType;
  onSubmit: (
    values: UpdateMenuWithFoodItemsType,
    coverPhoto?: File,
  ) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & MenuFormBaseProps;

type MenuFormViewProps = {
  mode: "view";
  initialData: SelectMenuWithFoodItemsType;
  onSubmit?: never;
  onCancel: () => void;
  defaultShopId?: never;
} & Partial<Record<keyof MenuFormBaseProps, never>>;

export type MenuFormProps =
  | MenuFormViewProps
  | MenuFormEditProps
  | MenuFormCreateProps;
