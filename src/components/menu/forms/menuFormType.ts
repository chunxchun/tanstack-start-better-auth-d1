import type {
  InsertMenuType,
  insertMenuWithFoodItemsType,
  SelectFoodItemType,
  SelectMenuType,
  SelectShopType,
  UpdateMenuType,
  updateMenuWithFoodItemsType,
} from "@/db/schema";

type MenuFormBaseProps = {
  onCancel: () => void;
};

type MenuFormCreateProps = MenuFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  foodItems: SelectFoodItemType[];
  onSubmit: (values: insertMenuWithFoodItemsType, coverPhoto?: File) => Promise<void>;
};

type MenuFormViewProps = MenuFormBaseProps & {
  initialData: SelectMenuType;
  mode: "view";
  shops?: undefined;
  foodItems?: undefined;
  onSubmit?: never;
};

type MenuFormEditProps = MenuFormBaseProps & {
  initialData: UpdateMenuType;
  mode: "edit";
  shops: SelectShopType[];
  foodItems: SelectFoodItemType[];
  onSubmit: (values: updateMenuWithFoodItemsType, coverPhoto?: File) => Promise<void>;
};

export type MenuFormProps =
  | MenuFormViewProps
  | MenuFormEditProps
  | MenuFormCreateProps;
