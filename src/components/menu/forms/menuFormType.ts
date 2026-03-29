import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertMenuWithFoodItemsType,
  SelectFoodItemType,
  SelectMenuWithFoodItemsType,
  SelectShopType,
  UpdateMenuWithFoodItemsType,
} from "@/db/schema";

type MenuFormBaseProps = FormDataDependency<"shops" | "foodItems">;

type MenuFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (
    values: InsertMenuWithFoodItemsType,
    coverPhoto?: File,
  ) => Promise<void>;
  onCancel: () => void;
} & MenuFormBaseProps;

type MenuFormEditProps = {
  mode: "edit";
  initialData: SelectMenuWithFoodItemsType;
  onSubmit: (
    values: UpdateMenuWithFoodItemsType,
    coverPhoto?: File,
  ) => Promise<void>;
  onCancel: () => void;
} & MenuFormBaseProps;

type MenuFormViewProps = MenuFormBaseProps & {
  mode: "view";
  initialData: SelectMenuWithFoodItemsType;
  onSubmit?: never;
  onCancel: () => void;
} & Partial<Record<keyof MenuFormBaseProps, never>>;

export type MenuFormProps =
  | MenuFormViewProps
  | MenuFormEditProps
  | MenuFormCreateProps;
