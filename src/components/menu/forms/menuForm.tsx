import FormDate from "@/components/form-date";
import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormSelect from "@/components/form-select";
import FormImage from "@/components/form-image";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
export function MenuForm({
  mode,
  initialData,
  shops,
  // foodItems,
  onSubmit,
  onCancel,
  defaultShopId,
}: MenuFormProps) {
  const [open, setOpen] = useState(false);
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  // const shopContext = useContext(ShopContext);
  // const { activeShop } = shopContext || {};
  // const initialSelectedFoodItems = initialData?.menuFoodItems || [];
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedFoodItems, setSelectedFoodItems] = useState<
  //   MenuFoodItemType[]
  // >(initialSelectedFoodItems);

  // console.log("Initial selected food items:", initialSelectedFoodItems);

  const form = useForm({
    defaultValues: initialData || {
      name: null,
      description: null,
      coverPhotoUrl: null,
      shopId: defaultShopId ?? null,
      date: new Date().toISOString().slice(0, 10),
      // foodItems: [] as MenuFoodItemType[]
      menuFoodItems: [] as MenuFoodItemType[],
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      try {
        setIsLoading(true);
        if (mode === "edit") {
          console.log("Submitting menu form with data:", value);
          //   const menuWithFoodItems: UpdateMenuWithFoodItemsType = {
          //     ...value,
          //     menuFoodItems: selectedFoodItems.map((foodItems) => {
          //       return { ...foodItems, id: Number(foodItems.id) };
          //     }),
          //   } as UpdateMenuWithFoodItemsType;
          //   await onSubmit(menuWithFoodItems);
        }

        if (mode === "create") {
          console.log("Submitting menu form with data:", value);
          //   const menuWithFoodItems: InsertMenuWithFoodItemsType = {
          //     ...value,
          //     menuFoodItems: selectedFoodItems.map((foodItems) => {
          //       return { ...foodItems, id: Number(foodItems.id) };
          //     }),
          //   } as InsertMenuWithFoodItemsType;

          //   console.log("Submitting menu form with data:", menuWithFoodItems);
          // await onSubmit(menuWithFoodItems);
          await onSubmit(
            value as InsertMenuWithFoodItemsType,
            coverPhotoFile ?? undefined,
          );
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
    // enabled: !!formSelectedShopId,
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
            initialValue={defaultShopId ? String(defaultShopId) : undefined}
            list={shops || []}
            valueKey={(item) => item.id}
            labelKey={(item) => item.name}
            isReadOnly={!!defaultShopId || isReadOnly}
            required
          />

          {/* cover photo url */}
          <FormImage
            form={form}
            name="coverPhotoUrl"
            label="Cover Photo"
            isReadOnly={isReadOnly}
            setFile={setCoverPhotoFile}
            lastUpdatedAt={initialData?.updatedAt}
          />
          {/* <form.Field name="coverPhotoUrl">
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
          </form.Field> */}

          {/* food items */}
          <form.Field name="menuFoodItems">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="foodItemIds">Food Items</FieldLabel>
                {/* {isReadOnly ? (
              initialSelectedFoodItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <p>- {item.name}</p>
                </div>
              ))
            ) : ( */}
                <Popover onOpenChange={setOpen} open={open}>
                  <PopoverTrigger asChild>
                    <Button
                      aria-expanded={open}
                      className="w-[250px] justify-between"
                      role="combobox"
                      variant="outline"
                    >
                      {field.state.value.length > 0
                        ? `${field.state.value.length} food item(s) selected`
                        : "Select food items..."}

                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[250px] p-0">
                    <Command>
                      <CommandInput placeholder="Search food items..." />
                      <CommandList>
                        <CommandEmpty>No food item found.</CommandEmpty>
                        <CommandGroup>
                          {foodItems.map((foodItem) => (
                            <CommandItem
                              key={foodItem.id}
                              onSelect={(currentValue) => {
                                // console.log("Selected food item:", foodItem);
                                form.setFieldValue(
                                  "menuFoodItems",
                                  (prev: MenuFoodItemType[]) => {
                                    const exists = prev.some(
                                      (item) => item.id === foodItem.id,
                                    );
                                    if (exists) {
                                      return prev.filter(
                                        (item) => item.id !== foodItem.id,
                                      );
                                    } else {
                                      return [
                                        ...prev,
                                        {
                                          id: foodItem.id,
                                          name: foodItem.name,
                                          imageUrl:
                                            foodItem.imageUrl ?? undefined,
                                        },
                                      ];
                                    }
                                  },
                                );
                                // form.setFieldValue(
                                //   "foodItems",
                                //   (prev: SelectFoodItemType[]) => {
                                //     return prev.some(
                                //       (item) => item.id === foodItem.id,
                                //     )
                                //       ? prev.filter(
                                //           (item) => item.id !== foodItem.id,
                                //         )
                                //       : [
                                //           ...prev,
                                //           {
                                //             id: foodItem.id,
                                //             name: foodItem.name,
                                //             imageUrl: foodItem.imageUrl,
                                //           },
                                //         ];
                                //   },
                                // );
                              }}
                              value={String(foodItem.id)}
                              // className="flex flex-row justify-between"
                            >
                              {/* <div> */}
                              <Check
                                className={cn(
                                  "mr-2 size-4",
                                  field.state.value.some(
                                    (item: MenuFoodItemType) =>
                                      item.id === foodItem.id,
                                  )
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {/* </div> */}
                              {foodItem.imageUrl ? (
                                <img
                                  src={foodItem.imageUrl}
                                  alt={foodItem.name}
                                  className="w-12 h-12 rounded-md "
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-md bg-gray-200"></div>
                              )}
                              <span>{foodItem.name}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {field.state.value.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {field.state.value.map((foodItem) => (
                      <Badge key={foodItem.id} variant="secondary">
                        {foodItem.name}
                        {/* {foodItem.find((item) => topic.value === value)?.label} */}
                      </Badge>
                    ))}
                  </div>
                )}
                {/* <MultiSelect
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
              </MultiSelect> */}
              </Field>
            )}
          </form.Field>

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
