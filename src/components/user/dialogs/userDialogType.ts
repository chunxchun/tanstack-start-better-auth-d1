import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";
import type {
  InsertUserType,
  SelectUserType,
  UpdateUserType,
} from "@/db/schema/authSchema";
import type { UserFormBaseProps } from "../forms/userFormType";

export type UserEditDialogProps = UserFormBaseProps &
  EditDialogProps<SelectUserType> & {
    onSubmit: (values: UpdateUserType, image?: File) => Promise<void>;
    defaultShopId?: number;
  };

export type UserCreateDialogProps = UserFormBaseProps &
  CreateDialogProps & {
    onSubmit: (values: InsertUserType, image?: File) => Promise<void>;
    defaultShopId?: number;
  };

export type UserViewDialogProps = ViewDialogProps<SelectUserType>;

export type UserDeleteDialogProps = DeleteDialogProps<SelectUserType>;
