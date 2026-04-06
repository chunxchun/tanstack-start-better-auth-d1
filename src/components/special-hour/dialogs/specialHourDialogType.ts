import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";

import type {
  InsertSpecialHourType,
  SelectSpecialHourType,
  UpdateSpecialHourType,
} from "@/db/schema/specialHourTable";

// import type { SpecialHourFormBaseProps } from "../forms/specialHourFormType";

export type SpecialHourEditDialogProps = 
// SpecialHourFormBaseProps &
  EditDialogProps<SelectSpecialHourType> & {
    onSubmit: (values: UpdateSpecialHourType) => Promise<void>;
  };

export type SpecialHourCreateDialogProps = 
// SpecialHourFormBaseProps &
  CreateDialogProps & {
    onSubmit: (values: InsertSpecialHourType) => Promise<void>;
  };

export type SpecialHourViewDialogProps = ViewDialogProps<SelectSpecialHourType>;

export type SpecialHourDeleteDialogProps =
  DeleteDialogProps<SelectSpecialHourType>;
