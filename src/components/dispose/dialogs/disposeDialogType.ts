import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";
import type { DisposeFormBaseProps } from "../forms/disposeFormType";
import type {
  InsertDisposeType,
  SelectDisposeType,
  UpdateDisposeType,
} from "@/db/schema/disposeTable";

export type DisposeEditDialogProps = DisposeFormBaseProps &
  EditDialogProps<SelectDisposeType> & {
    onSubmit: (values: UpdateDisposeType) => Promise<void>;
    defaultShopId?: number;
  };

export type DisposeCreateDialogProps = DisposeFormBaseProps &
  CreateDialogProps & {
    onSubmit: (values: InsertDisposeType) => Promise<void>;
    defaultShopId?: number;
  };

export type DisposeViewDialogProps = ViewDialogProps<SelectDisposeType>;

export type DisposeDeleteDialogProps = DeleteDialogProps<SelectDisposeType>;
