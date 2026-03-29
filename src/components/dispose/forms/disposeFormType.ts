import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertDisposeType,
  SelectDisposeType,
  UpdateDisposeType,
} from "@/db/schema";

export type DisposeFormBaseProps = FormDataDependency<
  "shops" | "machines" | "foodItems"
>;

type DisposeFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (values: InsertDisposeType) => Promise<void>;
  onCancel: () => void;
} & DisposeFormBaseProps;

type DisposeFormEditProps = {
  mode: "edit";
  initialData: SelectDisposeType;
  onSubmit: (values: UpdateDisposeType) => Promise<void>;
  onCancel: () => void;
} & DisposeFormBaseProps;

type DisposeFormViewProps = {
  mode: "view";
  initialData: SelectDisposeType;
  onSubmit?: never;
  onCancel: () => void;
} & Partial<Record<keyof DisposeFormBaseProps, never>>;

export type DisposeFormProps =
  | DisposeFormViewProps
  | DisposeFormEditProps
  | DisposeFormCreateProps;
