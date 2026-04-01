import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type { SelectShopType } from "@/db/schema";
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
} & UserFormBaseProps;

type UserFormEditProps = {
  mode: "edit";
  initialData: SelectUserType;
  onSubmit: (values: UpdateUserType, image?: File) => Promise<void>;
  onCancel: () => void;
} & UserFormBaseProps;

type UserFormViewProps = {
  mode: "view";
  initialData: SelectUserType;
  onSubmit?: never;
  onCancel: () => void;
} & Partial<Record<keyof UserFormBaseProps, never>>;

export type UserFormProps =
  | UserFormViewProps
  | UserFormEditProps
  | UserFormCreateProps;
