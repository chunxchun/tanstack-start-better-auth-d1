import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";
import type {
    InsertSaleType,
    SelectSaleType,
    UpdateSaleType,
} from "@/db/schema/saleTable";
import type { SaleFormBaseProps } from "../forms/saleFormType";

export type SaleEditDialogProps = SaleFormBaseProps &
  EditDialogProps<SelectSaleType> & {
    onSubmit: (values: UpdateSaleType) => Promise<void>;
  };

export type SaleCreateDialogProps = SaleFormBaseProps &
  CreateDialogProps & {
    onSubmit: (values: InsertSaleType) => Promise<void>;
  };

export type SaleViewDialogProps = ViewDialogProps<SelectSaleType>;

export type SaleDeleteDialogProps = DeleteDialogProps<SelectSaleType>;  