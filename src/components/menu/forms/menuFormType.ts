import type {
  InsertMenuType,
  SelectMenuType,
  SelectShopType,
  UpdateMenuType,
} from "@/db/schema";

type MenuFormBaseProps = {
  onCancel: () => void;
};

type MenuFormCreateProps = MenuFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  onSubmit: (values: InsertMenuType, coverPhoto?: File) => Promise<void>;
};

type MenuFormViewProps = MenuFormBaseProps & {
  initialData: SelectMenuType;
  mode: "view";
  shops?: undefined;
  onSubmit?: never;
};

type MenuFormEditProps = MenuFormBaseProps & {
  initialData: UpdateMenuType;
  mode: "edit";
  shops: SelectShopType[];
  onSubmit: (values: UpdateMenuType, coverPhoto?: File) => Promise<void>;
};

export type MenuFormProps =
  | MenuFormViewProps
  | MenuFormEditProps
  | MenuFormCreateProps;
