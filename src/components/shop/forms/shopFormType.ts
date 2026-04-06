import type {
  InsertShopType,
  SelectShopType,
  UpdateShopType,
} from "@/db/schema/shopTable";

// export type ShopFormBaseProps = FormDataDependency<>;

type ShopFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (
    values: InsertShopType,
    bannerFile?: File,
    logoFile?: File,
  ) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
};

type ShopFormEditProps = {
  mode: "edit";
  initialData: SelectShopType;
  onSubmit: (
    values: UpdateShopType,
    bannerFile?: File,
    logoFile?: File,
  ) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
};

type ShopFormViewProps = {
  mode: "view";
  initialData: SelectShopType;
  onSubmit?: never;
  onCancel: () => void;
  defaultShopId?: never;
};

export type ShopFormProps =
  | ShopFormViewProps
  | ShopFormEditProps
  | ShopFormCreateProps;
