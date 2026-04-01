import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertSaleType,
  SelectSaleType,
  UpdateSaleType,
} from "@/db/schema";

export type SaleFormBaseProps = FormDataDependency<"shops" | "machines" | "foodItems">;

type SaleFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (values: InsertSaleType) => Promise<void>;
  onCancel: () => void;
} & SaleFormBaseProps;

type SaleFormEditProps = {
  mode: "edit";
  initialData: SelectSaleType;
  onSubmit: (values: UpdateSaleType) => Promise<void>;
  onCancel: () => void;
} & SaleFormBaseProps;

type SaleFormViewProps = {
  mode: "view";
  initialData: SelectSaleType;
  onSubmit?: never;
  onCancel: () => void;
} & Partial<Record<keyof SaleFormBaseProps, never>>;

export type SaleFormProps =
  | SaleFormViewProps
  | SaleFormEditProps
  | SaleFormCreateProps;
