import { type ReactFormExtendedApi } from "@tanstack/react-form";
import type { SelectShopType } from "@/db/schema";
import FormSelect from "./form-select";

type FormSelectProps<TForm> = {
  form: ReactFormExtendedApi<
    TForm,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >;
  isReadOnly: boolean;
  shops?: SelectShopType[];
  valueKey: (shop: SelectShopType) => string | number;
  labelKey: (shop: SelectShopType) => string;
  description?: string | null;
  required?: boolean;
  activeShop?: SelectShopType | undefined;
  initialData?: SelectShopType | undefined;
};

export default function FormSelectShop<TForm>({
  form,
  isReadOnly,
  shops = [],
  valueKey,
  labelKey,
  description = null,
  required = false,
  activeShop = undefined,
  initialData,
}: FormSelectProps<TForm>) {
  return (
    <FormSelect
      form={form}
      name="shopId"
      label={"Shop"}
      isReadOnly={isReadOnly}
      list={shops}
      valueKey={valueKey}
      labelKey={labelKey}
      description={description}
      required={required}
      initialValue={
        activeShop
          ? shops?.find((shop) => shop.id === activeShop.id)?.name
          : shops?.find((shop) => shop.id === initialData?.id)?.name
      }
    />
  );
}
