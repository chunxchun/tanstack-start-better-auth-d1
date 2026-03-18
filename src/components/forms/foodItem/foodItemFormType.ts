import type {
  InsertFoodItemType,
  SelectFoodItemType,
  UpdateFoodItemType,
} from "@/db/schema";

type FoodItemFormBaseProps = {
  onCancel?: () => void;
};

type FoodItemFormCreateProps = FoodItemFormBaseProps & {
  initialData?: never;
  mode: "create";
  onSubmit: (values: InsertFoodItemType) => Promise<void>;
};

type FoodItemFormViewProps = FoodItemFormBaseProps & {
  initialData: SelectFoodItemType;
  mode: "view";
  onSubmit?: never;
};

type FoodItemFormEditProps = FoodItemFormBaseProps & {
  initialData: UpdateFoodItemType;
  mode: "edit";
  onSubmit: (values: UpdateFoodItemType) => Promise<void>;
};

export type FoodItemFormProps =
  | FoodItemFormViewProps
  | FoodItemFormEditProps
  | FoodItemFormCreateProps;
