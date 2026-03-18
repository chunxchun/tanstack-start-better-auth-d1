import type {
  InsertSaleType,
  SelectSaleType,
  UpdateSaleType,
} from "@/db/schema";

type SaleFormBaseProps = {
  onCancel?: () => void;
};

type SaleFormCreateProps = SaleFormBaseProps & {
  initialData?: never;
  mode: "create";
  onSubmit: (values: InsertSaleType) => Promise<void>;
};

type SaleFormViewProps = SaleFormBaseProps & {
  initialData: SelectSaleType;
  mode: "view";
  onSubmit?: never;
};

type SaleFormEditProps = SaleFormBaseProps & {
  initialData: UpdateSaleType;
  mode: "edit";
  onSubmit: (values: UpdateSaleType) => Promise<void>;
};

export type SaleFormProps =
  | SaleFormViewProps
  | SaleFormEditProps
  | SaleFormCreateProps;
