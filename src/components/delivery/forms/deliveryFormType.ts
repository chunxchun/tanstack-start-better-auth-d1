import type {
  InsertDeliveryType,
  SelectDeliveryType,
  SelectLocationType,
  SelectMachineType,
  SelectShopType,
  UpdateDeliveryType,
} from "@/db/schema";

type DeliveryFormBaseProps = {
  onCancel: () => void;
};

type DeliveryFormCreateProps = DeliveryFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  locations: SelectLocationType[];
  machines: SelectMachineType[];
  onSubmit: (values: InsertDeliveryType) => Promise<void>;
};

type DeliveryFormViewProps = DeliveryFormBaseProps & {
  initialData: SelectDeliveryType;
  mode: "view";
  shops?: undefined;
  locations?: undefined;
  machines?: undefined;
  onSubmit?: never;
};

type DeliveryFormEditProps = DeliveryFormBaseProps & {
  initialData: UpdateDeliveryType;
  mode: "edit";
  shops: SelectShopType[];
  locations: SelectLocationType[];
  machines: SelectMachineType[];
  onSubmit: (values: UpdateDeliveryType) => Promise<void>;
};

export type DeliveryFormProps =
  | DeliveryFormViewProps
  | DeliveryFormEditProps
  | DeliveryFormCreateProps;
