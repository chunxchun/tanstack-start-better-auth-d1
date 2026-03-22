import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type {
  InsertShopType,
  UpdateShopType,
} from "@/db/schema";
import { getVersionedImageUrl } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { ShopFormProps } from "./shopFormType";

export function ShopForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: ShopFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      <CardHeader>
        <CardTitle>
          {mode === "view"
            ? "Shop Details"
            : isCreate
              ? "Create Shop"
              : "Edit Shop"}
        </CardTitle>
        <CardDescription>
          {isReadOnly
            ? "View shop details."
            : "Fill out the form below and click save when you're done."}
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto mt-8 mb-8">
        <FieldGroup>
          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  disabled={isReadOnly}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const nextValue = e.target.value.trim();
                    field.handleChange(nextValue.length ? e.target.value : null);
                  }}
                />
                <FieldDescription>
                  Optional short description for this shop.
                </FieldDescription>
              </Field>
            )}
          </form.Field>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <form.Field name="logoUrl">
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
            </form.Field>

            <form.Field name="bannerUrl">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Banner</FieldLabel>
                  {isReadOnly ? (
                    (() => {
                      const bannerSrc = getVersionedImageUrl(
                        field.state.value,
                        initialData?.updatedAt,
                      );
                      return bannerSrc ? (
                        <img
                          src={bannerSrc}
                          alt="shop banner"
                          className="max-h-32 object-contain"
                        />
                      ) : (
                        <FieldDescription>No banner uploaded.</FieldDescription>
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
                            setBannerFile(null);
                            return;
                          }
                          field.handleChange(file.name);
                          setBannerFile(file);
                        }}
                      />
                      <FieldDescription>
                        Optional public image URL for this shop banner.
                      </FieldDescription>
                    </>
                  )}
                </Field>
              )}
            </form.Field>
          </div>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Close
        </Button>
        {!isReadOnly ? (
          <Button type="submit" disabled={isLoading}>
            {isCreate ? "Create" : "Save"}
          </Button>
        ) : null}
      </CardFooter>
    </form>
  );
}
