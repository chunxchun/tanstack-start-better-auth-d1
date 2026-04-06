import type { FormDataDependency } from "@/components/shared/sharedFormTypes";
import type {
  InsertSpecialHourType,
  SelectSpecialHourType,
  UpdateSpecialHourType,
} from "@/db/schema/specialHourTable";

// export type SpecialHourFormBaseProps = FormDataDependency<"shops" | "machines">;

type SpecialHourFormCreateProps = {
  mode: "create";
  initialData?: never;
  onSubmit: (values: InsertSpecialHourType) => Promise<void>;
  onCancel: () => void;
} 
// & SpecialHourFormBaseProps;

type SpecialHourFormEditProps = {
  mode: "edit";
  initialData: SelectSpecialHourType;
  onSubmit: (values: UpdateSpecialHourType) => Promise<void>;
  onCancel: () => void;
}
//  & SpecialHourFormBaseProps;

type SpecialHourFormViewProps = {
  mode: "view";
  initialData: SelectSpecialHourType;
  onSubmit?: never;
  onCancel: () => void;
}
//  & Partial<Record<keyof SpecialHourFormBaseProps, never>>;

export type SpecialHourFormProps =
  | SpecialHourFormViewProps
  | SpecialHourFormEditProps
  | SpecialHourFormCreateProps;
