import type {
  CreateDialogProps,
  DeleteDialogProps,
  EditDialogProps,
  ViewDialogProps,
} from "@/components/shared/sharedFormTypes";
import type {
  InsertFoodItemType,
  SelectFoodItemType,
  UpdateFoodItemType,
} from "@/db/schema/foodItemTable";
import type { FoodItemFormBaseProps } from "../forms/foodItemFormType";

export type FoodItemEditDialogProps = FoodItemFormBaseProps &
  EditDialogProps<SelectFoodItemType> & {
    onSubmit: (values: UpdateFoodItemType, image?: File) => Promise<void>;
  };

export type FoodItemCreateDialogProps = FoodItemFormBaseProps &
  CreateDialogProps & {
    onSubmit: (values: InsertFoodItemType, image?: File) => Promise<void>;
  };

export type FoodItemViewDialogProps = ViewDialogProps<SelectFoodItemType>;

export type FoodItemDeleteDialogProps = DeleteDialogProps<SelectFoodItemType>;
