import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertUserType,
  SelectUserType,
  UpdateUserType,
} from "@/db/schema/authSchema";

export type UserFormBaseProps = FormDataDependency<"shops">;

type UserFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (values: InsertUserType, image?: File) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & UserFormBaseProps;

type UserFormEditProps = {
  mode: "edit";
  initialData: SelectUserType;
  onSubmit: (values: UpdateUserType, image?: File) => Promise<void>;
  onCancel: () => void;
  defaultShopId?: number;
} & UserFormBaseProps;

type UserFormViewProps = {
  mode: "view";
  initialData: SelectUserType;
  onSubmit?: never;
  onCancel: () => void;
  defaultShopId?: never;
} & Partial<UserFormBaseProps>;

export type UserFormProps =
  | UserFormViewProps
  | UserFormEditProps
  | UserFormCreateProps;
