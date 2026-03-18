import type {
  InsertLocationType,
  SelectLocationType,
  UpdateLocationType,
} from "@/db/schema";

type LocationFormBaseProps = {
  onCancel?: () => void;
};

type LocationFormCreateProps = LocationFormBaseProps & {
  initialData?: never;
  mode: "create";
  onSubmit: (values: InsertLocationType) => Promise<void>;
};

type LocationFormViewProps = LocationFormBaseProps & {
  initialData: SelectLocationType;
  mode: "view";
  onSubmit?: never;
};

type LocationFormEditProps = LocationFormBaseProps & {
  initialData: UpdateLocationType;
  mode: "edit";
  onSubmit: (values: UpdateLocationType) => Promise<void>;
};

export type LocationFormProps =
  | LocationFormViewProps
  | LocationFormEditProps
  | LocationFormCreateProps;
