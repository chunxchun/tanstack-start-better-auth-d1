import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertDeliveryType,
  SelectDeliveryType,
  UpdateDeliveryType,
} from "@/db/schema";

// form props
export type DeliveryFormBaseProps = FormDataDependency<
  "shops" | "locations" | "machines"
>;

type DeliveryFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (values: InsertDeliveryType) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & DeliveryFormBaseProps;

type DeliveryFormEditProps = {
  mode: "edit";
  initialData: SelectDeliveryType;
  onSubmit: (values: UpdateDeliveryType) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & DeliveryFormBaseProps;

type DeliveryFormViewProps = {
  mode: "view";
  initialData: SelectDeliveryType;
  onSubmit?: never;
  onCancel: () => void;
  defaultShopId?: never;
} & Partial<Record<keyof DeliveryFormBaseProps, never>>;

export type DeliveryFormProps =
  | DeliveryFormViewProps
  | DeliveryFormEditProps
  | DeliveryFormCreateProps;
