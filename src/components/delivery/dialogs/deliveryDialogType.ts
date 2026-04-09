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
    defaultShopId?: number;
  };

export type DeliveryCreateDialogProps = DeliveryFormBaseProps &
  CreateDialogProps & {
    onSubmit: (values: InsertDeliveryType) => Promise<void>;
    defaultShopId?: number;
  };

export type DeliveryViewDialogProps = DeliveryFormBaseProps &
  ViewDialogProps<SelectDeliveryType>;

export type DeliveryDeleteDialogProps = DeleteDialogProps<SelectDeliveryType>;
