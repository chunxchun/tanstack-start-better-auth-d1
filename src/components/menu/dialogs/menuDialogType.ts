import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";
import type {
  InsertMenuType,
  SelectMenuType,
  UpdateMenuType,
  InsertMenuWithFoodItemsType,
  SelectMenuWithFoodItemsType,
  UpdateMenuWithFoodItemsType,
} from "@/db/schema/menuTable";
import type { MenuFormBaseProps } from "../forms/menuFormType";

export type MenuEditDialogProps = MenuFormBaseProps &
  EditDialogProps<SelectMenuWithFoodItemsType> & {
    onSubmit: (
      values: UpdateMenuWithFoodItemsType,
      coverPhoto?: File,
    ) => Promise<void>;
    defaultShopId?: number;
  };

export type MenuCreateDialogProps = MenuFormBaseProps &
  CreateDialogProps & {
    onSubmit: (
      values: InsertMenuWithFoodItemsType,
      coverPhoto?: File,
    ) => Promise<void>;
    defaultShopId?: number;
  };

export type MenuViewDialogProps = MenuFormBaseProps &
  ViewDialogProps<SelectMenuWithFoodItemsType>;

export type MenuDeleteDialogProps =
  DeleteDialogProps<SelectMenuWithFoodItemsType>;
