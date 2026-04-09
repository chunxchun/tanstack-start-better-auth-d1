import FormDate from "@/components/form-date";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormSelect from "@/components/form-select";
import FormText from "@/components/form-text";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import type {
  InsertMenuWithFoodItemsType,
  MenuFoodItemType,
  UpdateMenuWithFoodItemsType,
} from "@/db/schema/menuTable";
import { useForm, useStore } from "@tanstack/react-form";
import { useContext, useState } from "react";
import { defaultMenuFormValues, type MenuFormProps } from "./menuFormType";
import { ShopContext } from "@/context/shop.context";
import { listFoodItemByShopIdFn } from "@/utils/foodItem/foodItem.function";
import type { SelectFoodItemType } from "@/db/schema";

export function MenuForm({
  mode,
  initialData,
  shops,
  // foodItems,
  onSubmit,
  onCancel,
  defaultShopId,
}: MenuFormProps) {
  const shopContext = useContext(ShopContext);
  const { activeShop } = shopContext || {};
  const initialSelectedFoodItems = initialData?.menuFoodItems || [];
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFoodItems, setSelectedFoodItems] = useState<
    MenuFoodItemType[]
  >(initialSelectedFoodItems);

  // console.log("Initial selected food items:", initialSelectedFoodItems);

  const form = useForm({
    defaultValues: initialData || defaultMenuFormValues,
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        setIsLoading(true);
        if (mode === "edit") {
          const menuWithFoodItems: UpdateMenuWithFoodItemsType = {
            ...value,
            menuFoodItems: selectedFoodItems.map((foodItems) => {
              return { ...foodItems, id: Number(foodItems.id) };
            }),
          } as UpdateMenuWithFoodItemsType;
          await onSubmit(menuWithFoodItems);
        }

        if (mode === "create") {
          const menuWithFoodItems: InsertMenuWithFoodItemsType = {
            ...value,
            menuFoodItems: selectedFoodItems.map((foodItems) => {
              return { ...foodItems, id: Number(foodItems.id) };
            }),
          } as InsertMenuWithFoodItemsType;

          console.log("Submitting menu form with data:", menuWithFoodItems);
          await onSubmit(menuWithFoodItems);
        }
      } catch (error) {
        console.error("Error submitting menu form:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isReadOnly = mode === "view";
  const isCreate = mode === "create";

  const formSelectedShopId = useStore(
    form.store,
    (state) => state.values.shopId,
  );

    const { data: foodItems = [], isLoading: isLoadingFoodItems } = useQuery({
    queryKey: ["foodItems", formSelectedShopId],
    queryFn: () =>
      listFoodItemByShopIdFn({ data: { shopId: Number(formSelectedShopId) } }),
    // enabled: hasValidShopId,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FormHeader
        mode={mode}
        module="Menu"
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />

      <FieldGroup className="field-group-container">
        {/* name */}
        <FormText
          form={form}
          name="name"
          label="Name"
          isReadOnly={isReadOnly}
          required
        />

        {/* description */}
        <FormText
          form={form}
          name="description"
          label="Description"
          isReadOnly={isReadOnly}
        />
        <div className="form-half-width">
          {/* shop */}
          <FormSelect
            form={form}
            name="shopId"
            label="Shop"
            initialValue={
              activeShop
                ? shops?.find((shop) => shop.id === activeShop.id)?.name
                : shops?.find((shop) => shop.id === initialData?.shopId)?.name
            }
            list={shops || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            isReadOnly={!!activeShop || isReadOnly}
            required
          />

          {/* cover photo url */}
          <form.Field name="coverPhotoUrl">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Cover Photo</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value || null)}
                />
                <FieldDescription>
                  Optional public URL for menu cover photo.
                </FieldDescription>
              </Field>
            )}
          </form.Field>

          {/* food items */}
          <Field>
            <FieldLabel htmlFor="foodItemIds">Food Items</FieldLabel>

            {isReadOnly ? (
              initialSelectedFoodItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <p>- {item.name}</p>
                </div>
              ))
            ) : (
              <MultiSelect
                defaultValues={initialSelectedFoodItems}
                values={selectedFoodItems}
                onValuesChange={setSelectedFoodItems}
              >
                <MultiSelectTrigger>
                  <MultiSelectValue placeholder="Select frameworks..." />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {foodItems?.map((item as SelectFoodItemType) => (
                      <MultiSelectItem
                        key={item.id}
                        value={{
                          id: item.id,
                          name: item.name,
                          imageUrl: item.imageUrl || undefined,
                        }}
                      >
                        {item.name}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
            )}
          </Field>

          {/* date */}
          <FormDate
            form={form}
            name="date"
            label="Date"
            isReadOnly={isReadOnly}
            required
          />
        </div>
      </FieldGroup>

      <FormFooter
        isReadOnly={isReadOnly}
        isCreate={isCreate}
        onCancel={onCancel}
        isLoading={isLoading}
      />
    </form>
  );
}
