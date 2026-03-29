import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";
import type {
  InsertDeliveryType,
  SelectDeliveryType,
  UpdateDeliveryType,
} from "@/db/schema";
import type { DeliveryFormBaseProps } from "../forms/deliveryFormType";

export type DeliveryEditDialogProps = DeliveryFormBaseProps &
  EditDialogProps<SelectDeliveryType> & {
    onSubmit: (values: UpdateDeliveryType) => Promise<void>;
  };

export type DeliveryCreateDialogProps = DeliveryFormBaseProps &
  CreateDialogProps & {
    onSubmit: (values: InsertDeliveryType) => Promise<void>;
  };

export type DeliveryViewDialogProps = ViewDialogProps<SelectDeliveryType>;

export type DeliveryDeleteDialogProps = DeleteDialogProps<SelectDeliveryType>;
