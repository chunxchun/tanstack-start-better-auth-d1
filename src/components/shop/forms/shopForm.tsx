import FormFooter from "@/components/form-footer";
import FormHeader from "@/components/form-header";
import FormImage from "@/components/form-image";
import FormText from "@/components/form-text";
import { FieldGroup } from "@/components/ui/field";
import type { InsertShopType, UpdateShopType } from "@/db/schema";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { ShopFormProps } from "./shopFormType";

export function ShopForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  defaultShopId,
}: ShopFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // const shop = useContext(ShopContext);

  const form = useForm({
    defaultValues: initialData || {
      name: "",
      description: null,
      bannerUrl: null,
      logoUrl: null,
      videoUrl: null,
    },
    onSubmit: async ({ value }) => {
      if (!onSubmit) return;
      setIsLoading(true);

      try {
        if (mode === "edit") {
          const data = value as UpdateShopType;
          const result = await onSubmit(
            data,
            bannerFile ?? undefined,
            logoFile ?? undefined,
          );
          console.log(result);
          toast.success("Shop updated successfully");
        }

        if (mode === "create") {
          const data = value as InsertShopType;
          const result = await onSubmit(
            data,
            bannerFile ?? undefined,
            logoFile ?? undefined,
          );
          console.log(result);
          toast.success("Shop created successfully");
        }
      } catch (error) {
        console.error("Error submitting shop form:", error);
        toast.error("Error submitting shop form");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isReadOnly = mode === "view";
  const isCreate = mode === "create";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FormHeader
        module="Shop"
        mode={mode}
        isCreate={isCreate}
        isReadOnly={isReadOnly}
      />

      <FieldGroup className="overflow-auto mt-8 mb-8 px-4">
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
          description="Optional short description for this shop."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* <form.Field name="logoUrl">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Logo</FieldLabel>
                {isReadOnly ? (
                  (() => {
                    const logoSrc = getVersionedImageUrl(
                      field.state.value,
                      initialData?.updatedAt,
                    );
                    return logoSrc ? (
                      <img
                        src={logoSrc}
                        alt="shop logo"
                        className="max-h-32 object-contain"
                      />
                    ) : (
                      <FieldDescription>No logo uploaded.</FieldDescription>
                    );
                  })()
                ) : (
                  <>
                    <Input
                      id={field.name}
                      name={field.name}
                      // value={field.state.value ?? ""}
                      disabled={isReadOnly}
                      onBlur={field.handleBlur}
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (!file) {
                          field.handleChange(null);
                          setLogoFile(null);
                          return;
                        }
                        field.handleChange(file.name);
                        setLogoFile(file);
                      }}
                    />
                    <FieldDescription>
                      Optional public image URL for this shop logo.
                    </FieldDescription>
                  </>
                )}
              </Field>
            )}
          </form.Field> */}

          <FormImage
            form={form}
            name="logoUrl"
            label="Logo"
            isReadOnly={isReadOnly}
            description="Suggest dimensions for the shop logo: 640 x 640px. Accept .jpg, .png files. Maximum file size: 2MB."
            setFile={setLogoFile}
            lastUpdatedAt={initialData?.updatedAt}
          />

          <FormImage
            form={form}
            name="bannerUrl"
            label="Banner"
            isReadOnly={isReadOnly}
            description="Suggest dimensions for the shop banner: 1440 x 240px. Accept .jpg, .png files. Maximum file size: 5MB."
            setFile={setBannerFile}
            lastUpdatedAt={initialData?.updatedAt}
          />
        </div>
      </FieldGroup>

      <FormFooter
        isCreate={isCreate}
        isReadOnly={isReadOnly}
        onCancel={onCancel}
        isLoading={isLoading}
      />
    </form>
  );
}
