import type { SelectShopType } from "@/db/schema/shopTable";
import type {
  InsertLocationType,
  SelectLocationType,
  UpdateLocationType,
} from "@/db/schema/locationTable";

type LocationFormBaseProps = {
  onCancel: () => void;
};

type LocationFormCreateProps = LocationFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  onSubmit: (values: InsertLocationType) => Promise<void>;
};

type LocationFormViewProps = LocationFormBaseProps & {
  initialData: SelectLocationType;
  mode: "view";
  shops?: undefined;
  onSubmit?: undefined;
};

type LocationFormEditProps = LocationFormBaseProps & {
  initialData: SelectLocationType;
  mode: "edit";
  shops: SelectShopType[];
  onSubmit: (values: UpdateLocationType) => Promise<void>;
};

export type LocationFormProps =
  | LocationFormCreateProps
  | LocationFormEditProps
  | LocationFormViewProps;
