import type {
  InsertShopType,
  SelectShopType,
  UpdateShopType,
} from "@/db/schema";

type ShopFormBaseProps = {
  onCancel?: () => void;
};

type ShopFormCreateProps = ShopFormBaseProps & {
  initialData?: never;
  mode: "create";
  onSubmit: (values: InsertShopType) => Promise<void>;
};

type ShopFormViewProps = ShopFormBaseProps & {
  initialData: SelectShopType;
  mode: "view";
  onSubmit?: never;
};

type ShopFormEditProps = ShopFormBaseProps & {
  initialData: UpdateShopType;
  mode: "edit";
  onSubmit: (values: UpdateShopType) => Promise<void>;
};

export type ShopFormProps =
  | ShopFormViewProps
  | ShopFormEditProps
  | ShopFormCreateProps;
