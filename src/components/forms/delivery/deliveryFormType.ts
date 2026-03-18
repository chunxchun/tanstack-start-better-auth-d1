import type {
  InsertDeliveryType,
  SelectDeliveryType,
  UpdateDeliveryType,
} from "@/db/schema";

type DeliveryFormBaseProps = {
  onCancel?: () => void;
};

type DeliveryFormCreateProps = DeliveryFormBaseProps & {
  initialData?: never;
  mode: "create";
  onSubmit: (values: InsertDeliveryType) => Promise<void>;
};

type DeliveryFormViewProps = DeliveryFormBaseProps & {
  initialData: SelectDeliveryType;
  mode: "view";
  onSubmit?: never;
};

type DeliveryFormEditProps = DeliveryFormBaseProps & {
  initialData: UpdateDeliveryType;
  mode: "edit";
  onSubmit: (values: UpdateDeliveryType) => Promise<void>;
};

export type DeliveryFormProps =
  | DeliveryFormViewProps
  | DeliveryFormEditProps
  | DeliveryFormCreateProps;
