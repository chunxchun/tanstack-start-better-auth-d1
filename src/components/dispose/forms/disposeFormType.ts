import type {
  InsertDisposeType,
  SelectDisposeType,
  SelectFoodItemType,
  SelectMachineType,
  SelectShopType,
  UpdateDisposeType,
} from "@/db/schema";

type DisposeFormBaseProps = {
  onCancel: () => void;
};

type DisposeFormCreateProps = DisposeFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  machines: SelectMachineType[];
  foodItems: SelectFoodItemType[];
  onSubmit: (values: InsertDisposeType) => Promise<void>;
};

type DisposeFormViewProps = DisposeFormBaseProps & {
  initialData: SelectDisposeType;
  mode: "view";
  shops?: undefined;
  machines?: undefined;
  foodItems?: undefined;
  onSubmit?: never;
};

type DisposeFormEditProps = DisposeFormBaseProps & {
  initialData: UpdateDisposeType;
  mode: "edit";
  shops: SelectShopType[];
  machines: SelectMachineType[];
  foodItems: SelectFoodItemType[];
  onSubmit: (values: UpdateDisposeType) => Promise<void>;
};

export type DisposeFormProps =
  | DisposeFormViewProps
  | DisposeFormEditProps
  | DisposeFormCreateProps;
