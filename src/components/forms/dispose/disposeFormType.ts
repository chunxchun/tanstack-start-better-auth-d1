import type {
  InsertDisposeType,
  SelectDisposeType,
  UpdateDisposeType,
} from "@/db/schema";

type DisposeFormBaseProps = {
  onCancel?: () => void;
};

type DisposeFormCreateProps = DisposeFormBaseProps & {
  initialData?: never;
  mode: "create";
  onSubmit: (values: InsertDisposeType) => Promise<void>;
};

type DisposeFormViewProps = DisposeFormBaseProps & {
  initialData: SelectDisposeType;
  mode: "view";
  onSubmit?: never;
};

type DisposeFormEditProps = DisposeFormBaseProps & {
  initialData: UpdateDisposeType;
  mode: "edit";
  onSubmit: (values: UpdateDisposeType) => Promise<void>;
};

export type DisposeFormProps =
  | DisposeFormViewProps
  | DisposeFormEditProps
  | DisposeFormCreateProps;
