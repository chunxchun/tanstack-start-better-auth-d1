import type {
  InsertSaleType,
  SelectFoodItemType,
  SelectMachineType,
  SelectSaleType,
  SelectShopType,
  UpdateSaleType,
} from "@/db/schema";

type SaleFormBaseProps = {
  onCancel: () => void;
};

type SaleFormCreateProps = SaleFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  machines: SelectMachineType[];
  foodItems: SelectFoodItemType[];
  onSubmit: (values: InsertSaleType) => Promise<void>;
};

type SaleFormViewProps = SaleFormBaseProps & {
  initialData: SelectSaleType;
  mode: "view";
  shops?: undefined;
  machines?: undefined;
  foodItems?: undefined;
  onSubmit?: never;
};

type SaleFormEditProps = SaleFormBaseProps & {
  initialData: SelectSaleType;
  mode: "edit";
  shops: SelectShopType[];
  machines: SelectMachineType[];
  foodItems: SelectFoodItemType[];
  onSubmit: (values: UpdateSaleType) => Promise<void>;
};

export type SaleFormProps =
  | SaleFormViewProps
  | SaleFormEditProps
  | SaleFormCreateProps;
