import type {
  InsertFoodItemType,
  SelectFoodItemType,
  SelectShopType,
  UpdateFoodItemType,
} from "@/db/schema";

type FoodItemFormBaseProps = {
  onCancel: () => void;
};

type FoodItemFormCreateProps = FoodItemFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  onSubmit: (values: InsertFoodItemType, image?: File) => Promise<void>;
};

type FoodItemFormViewProps = FoodItemFormBaseProps & {
  initialData: SelectFoodItemType;
  mode: "view";
  shops?: undefined;
  onSubmit?: never;
};

type FoodItemFormEditProps = FoodItemFormBaseProps & {
  initialData: UpdateFoodItemType;
  mode: "edit";
  shops: SelectShopType[];
  onSubmit: (values: UpdateFoodItemType, image?: File) => Promise<void>;
};

export type FoodItemFormProps =
  | FoodItemFormViewProps
  | FoodItemFormEditProps
  | FoodItemFormCreateProps;
