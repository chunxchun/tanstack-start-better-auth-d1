import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";
import type {
  InsertMachineType,
  SelectMachineType,
  UpdateMachineType,
} from "@/db/schema/machineTable";
import type { MachineFormBaseProps } from "../forms/machineFormType";

export type MachineEditDialogProps = MachineFormBaseProps &
  EditDialogProps<SelectMachineType> & {
    onSubmit: (values: UpdateMachineType) => Promise<void>;
    defaultShopId?: number;
  };

export type MachineCreateDialogProps = MachineFormBaseProps &
  CreateDialogProps & {
    onSubmit: (values: InsertMachineType) => Promise<void>;
    defaultShopId?: number;
  };

export type MachineViewDialogProps = MachineFormBaseProps &
  ViewDialogProps<SelectMachineType>;

export type MachineDeleteDialogProps = DeleteDialogProps<SelectMachineType>;
