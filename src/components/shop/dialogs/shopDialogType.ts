import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";
import type {
  InsertShopType,
  SelectShopType,
  UpdateShopType,
} from "@/db/schema/shopTable";
// import type { ShopFormBaseProps } from "../forms/shopFormType";

export type ShopEditDialogProps = EditDialogProps<SelectShopType> & {
  onSubmit: (
    values: UpdateShopType,
    bannerFile?: File,
    logoFile?: File,
  ) => Promise<void>;
};

export type ShopCreateDialogProps = CreateDialogProps & {
  onSubmit: (
    values: InsertShopType,
    bannerFile?: File,
    logoFile?: File,
  ) => Promise<void>;
};

export type ShopViewDialogProps = ViewDialogProps<SelectShopType>;

export type ShopDeleteDialogProps = DeleteDialogProps<SelectShopType>;
