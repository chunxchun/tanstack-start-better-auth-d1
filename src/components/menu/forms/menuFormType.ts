import type {
  InsertMenuWithFoodItemsType,
  SelectFoodItemType,
  SelectMenuWithFoodItemsType,
  SelectShopType,
  UpdateMenuWithFoodItemsType
} from "@/db/schema";

type MenuFormBaseProps = {
  onCancel: () => void;
};

type MenuFormCreateProps = MenuFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  foodItems: SelectFoodItemType[];
  onSubmit: (values: InsertMenuWithFoodItemsType, coverPhoto?: File) => Promise<void>;
};

type MenuFormViewProps = MenuFormBaseProps & {
  initialData: SelectMenuWithFoodItemsType;
  mode: "view";
  shops?: undefined;
  foodItems?: undefined;
  onSubmit?: undefined;
};

type MenuFormEditProps = MenuFormBaseProps & {
  initialData: SelectMenuWithFoodItemsType;
  mode: "edit";
  shops: SelectShopType[];
  foodItems: SelectFoodItemType[];
  onSubmit: (values: UpdateMenuWithFoodItemsType, coverPhoto?: File) => Promise<void>;
};

export type MenuFormProps =
  | MenuFormViewProps
  | MenuFormEditProps
  | MenuFormCreateProps;
