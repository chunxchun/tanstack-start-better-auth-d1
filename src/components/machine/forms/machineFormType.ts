import type { SelectLocationType, SelectShopType } from "@/db/schema";
import type {
  InsertMachineType,
  SelectMachineType,
  UpdateMachineType,
} from "@/db/schema/machineTable";

type MachineFormBaseProps = {
  onCancel: () => void;
};

type MachineFormCreateProps = MachineFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  locations: SelectLocationType[];
  onSubmit: (values: InsertMachineType) => Promise<void>;
};

type MachineFormViewProps = MachineFormBaseProps & {
  initialData: SelectMachineType;
  mode: "view";
  locations?: undefined;
  shops?: undefined;
  onSubmit?: undefined;
};

type MachineFormEditProps = MachineFormBaseProps & {
  initialData: SelectMachineType;
  mode: "edit";
  shops: SelectShopType[];
  locations: SelectLocationType[];
  onSubmit: (values: UpdateMachineType) => Promise<void>;
};

export type MachineFormProps =
  | MachineFormCreateProps
  | MachineFormViewProps
  | MachineFormEditProps;
