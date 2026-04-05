import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertFoodItemType,
  SelectFoodItemType,
  UpdateFoodItemType,
} from "@/db/schema";

export type FoodItemFormBaseProps = FormDataDependency<"shops">;

type FoodItemFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (
    values: InsertFoodItemType,
    image?: File,
    shopId?: number,
  ) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & FoodItemFormBaseProps;

type FoodItemFormEditProps = {
  mode: "edit";
  initialData: SelectFoodItemType;
  onSubmit: (
    values: UpdateFoodItemType,
    image?: File,
    shopId?: number,
  ) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & FoodItemFormBaseProps;

type FoodItemFormViewProps = {
  mode: "view";
  initialData: SelectFoodItemType;
  onSubmit?: never;
  onCancel: () => void;
  defaultShopId?: number;
} & Partial<Record<keyof FoodItemFormBaseProps, never>>;

export type FoodItemFormProps =
  | FoodItemFormViewProps
  | FoodItemFormEditProps
  | FoodItemFormCreateProps;
