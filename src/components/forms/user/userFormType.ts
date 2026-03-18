import type {
  InsertSystemUserType,
  SelectSystemUserType,
  UpdateSystemUserType,
} from "@/db/schema";

type UserFormBaseProps = {
  onCancel?: () => void;
};

type UserFormCreateProps = UserFormBaseProps & {
  initialData?: never;
  mode: "create";
  onSubmit: (values: InsertSystemUserType) => Promise<void>;
};

type UserFormViewProps = UserFormBaseProps & {
  initialData: SelectSystemUserType;
  mode: "view";
  onSubmit?: never;
};

type UserFormEditProps = UserFormBaseProps & {
  initialData: UpdateSystemUserType;
  mode: "edit";
  onSubmit: (values: UpdateSystemUserType) => Promise<void>;
};

export type UserFormProps =
  | UserFormViewProps
  | UserFormEditProps
  | UserFormCreateProps;
