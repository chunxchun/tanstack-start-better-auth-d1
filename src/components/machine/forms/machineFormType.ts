import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertMachineType,
  SelectMachineType,
  UpdateMachineType,
} from "@/db/schema/machineTable";

export type MachineFormBaseProps = FormDataDependency<"shops" | "locations">;

type MachineFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (values: InsertMachineType) => Promise<void>;
  onCancel: () => void;
} & MachineFormBaseProps;

type MachineFormEditProps = {
  mode: "edit";
  initialData: SelectMachineType;
  onSubmit: (values: UpdateMachineType) => Promise<void>;
  onCancel: () => void;
} & MachineFormBaseProps;

type MachineFormViewProps = MachineFormBaseProps & {
  mode: "view";
  initialData: SelectMachineType;
  onSubmit?: never;
  onCancel: () => void;
} & Partial<Record<keyof MachineFormBaseProps, never>>;

export type MachineFormProps =
  | MachineFormCreateProps
  | MachineFormViewProps
  | MachineFormEditProps;
