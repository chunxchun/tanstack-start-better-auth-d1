import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";
import type {
  InsertLocationType,
  SelectLocationType,
  UpdateLocationType,
} from "@/db/schema/locationTable";

import type { LocationFormBaseProps } from "../forms/locationFormType";

export type LocationEditDialogProps = LocationFormBaseProps &
  EditDialogProps<SelectLocationType> & {
    onSubmit: (values: UpdateLocationType) => Promise<void>;
    defaultShopId?: number;
  };

export type LocationCreateDialogProps = LocationFormBaseProps &
  CreateDialogProps & {
    onSubmit: (values: InsertLocationType) => Promise<void>;
    defaultShopId?: number;
  };

export type LocationViewDialogProps = ViewDialogProps<SelectLocationType>;

export type LocationDeleteDialogProps = DeleteDialogProps<SelectLocationType>;