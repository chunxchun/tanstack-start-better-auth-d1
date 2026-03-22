import type { SelectShopType } from "@/db/schema";
import type {
  InsertUserType,
  SelectUserType,
  UpdateUserType,
} from "@/db/schema/authSchema";

type UserFormBaseProps = {
  onCancel: () => void;
};

type UserFormCreateProps = UserFormBaseProps & {
  initialData?: never;
  mode: "create";
  shops: SelectShopType[];
  onSubmit: (values: InsertUserType, image?: File) => Promise<void>;
};

type UserFormViewProps = UserFormBaseProps & {
  initialData: SelectUserType;
  mode: "view";
  shops?: undefined;
  onSubmit?: undefined;
};

type UserFormEditProps = UserFormBaseProps & {
  initialData: SelectUserType;
  mode: "edit";
  shops: SelectShopType[];
  onSubmit: (values: UpdateUserType, image?: File) => Promise<void>;
};

export type UserFormProps =
  | UserFormViewProps
  | UserFormEditProps
  | UserFormCreateProps;
