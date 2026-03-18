import type {
  InsertMachineType,
  SelectLocationType,
  SelectMachineType,
  SelectShopType,
  UpdateMachineType
} from "@/db/schema";

type MachineFormBaseProps = {
  onCancel?: () => void;
};

type MachineFormCreateProps = MachineFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  locations: SelectLocationType[];
  onCreateLocation: () => void;
  onSubmit: (values: InsertMachineType) => Promise<void>;
};

type MachineFormViewProps = MachineFormBaseProps & {
  initialData: SelectMachineType;
  mode: "view";
  onSubmit?: never;
  shops?: never;
  locations?: never;
  onCreateLocation?: never;
};

type MachineFormEditProps = MachineFormBaseProps & {
  initialData: UpdateMachineType;
  mode: "edit";
  shops: SelectShopType[];
  locations: SelectLocationType[];
  onCreateLocation: () => void;
  onSubmit: (values: UpdateMachineType) => Promise<void>;
};

export type MachineFormProps =
  | MachineFormViewProps
  | MachineFormEditProps
  | MachineFormCreateProps;
