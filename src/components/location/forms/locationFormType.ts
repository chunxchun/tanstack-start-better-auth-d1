import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertLocationType,
  SelectLocationType,
  UpdateLocationType,
} from "@/db/schema/locationTable";

export type LocationFormBaseProps = FormDataDependency<"shops">;

type LocationFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (values: InsertLocationType) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & LocationFormBaseProps;

type LocationFormEditProps = {
  mode: "edit";
  initialData: SelectLocationType;
  onSubmit: (values: UpdateLocationType) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & LocationFormBaseProps;

type LocationFormViewProps = {
  mode: "view";
  initialData: SelectLocationType;
  onSubmit?: never;
  onCancel: () => void;
  defaultShopId?: never;
} & LocationFormBaseProps;

export type LocationFormProps =
  | LocationFormCreateProps
  | LocationFormEditProps
  | LocationFormViewProps;
