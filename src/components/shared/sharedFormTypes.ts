import type {
  SelectDeliveryType,
  SelectDisposeType,
  SelectFoodItemType,
  SelectInventoryType,
  SelectLocationType,
  SelectMachineType,
  SelectSaleType,
  SelectShopType,
  SelectUserType,
} from "@/db/schema";

export type DataDependency = {
  deliveries: SelectDeliveryType[];
  disposes: SelectDisposeType[];
  foodItems: SelectFoodItemType[];
  inventories: SelectInventoryType[];
  locations: SelectLocationType[];
  machines: SelectMachineType[];
  sales: SelectSaleType[];
  shops: SelectShopType[];
  users: SelectUserType[];
};

export type FormDataDependency<K extends keyof DataDependency> = Pick<
  DataDependency,
  K
>;

type BaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
};

export type ViewDialogProps<I> = BaseDialogProps & {
  initialData: I;
};

export type EditDialogProps<I> = BaseDialogProps & {
  initialData: I;
  // onSubmit: (values: E) => Promise<void>;
};

export type CreateDialogProps = BaseDialogProps;

export type DeleteDialogProps<T> = BaseDialogProps & {
  data: T;
  onDelete: () => Promise<void>;
}