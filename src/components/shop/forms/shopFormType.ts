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
};

type ShopFormViewProps = {
  mode: "view";
  initialData: SelectShopType;
  onSubmit?: never;
  onCancel: () => void;
};

export type ShopFormProps =
  | ShopFormViewProps
  | ShopFormEditProps
  | ShopFormCreateProps;
