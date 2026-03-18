import type {
  InsertMenuType,
  SelectMenuType,
  UpdateMenuType,
} from "@/db/schema";

type MenuFormBaseProps = {
  onCancel?: () => void;
};

type MenuFormCreateProps = MenuFormBaseProps & {
  initialData?: never;
  mode: "create";
  onSubmit: (values: InsertMenuType) => Promise<void>;
};

type MenuFormViewProps = MenuFormBaseProps & {
  initialData: SelectMenuType;
  mode: "view";
  onSubmit?: never;
};

type MenuFormEditProps = MenuFormBaseProps & {
  initialData: UpdateMenuType;
  mode: "edit";
  onSubmit: (values: UpdateMenuType) => Promise<void>;
};

export type MenuFormProps =
  | MenuFormViewProps
  | MenuFormEditProps
  | MenuFormCreateProps;
