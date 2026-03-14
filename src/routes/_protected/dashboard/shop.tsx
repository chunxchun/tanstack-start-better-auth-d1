import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createShopFn, listShopFn } from "@/utils/shop/shop.function";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { r2BaseUrl } from "@/lib/utils";

const searchSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});

// const { fieldContext, formContext } = createFormHookContexts();

// const { useAppForm } = createFormHook({
//   fieldComponents: {
//     TextField,
//     NumberField,
//   },
//   formComponents: {
//     SubmitButton,
//   },
//   fieldContext,
//   formContext,
// });

export const Route = createFileRoute("/_protected/dashboard/shop")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ deps }) => listShopFn({ data: deps }),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: "My Shop",
      logoFile: null as File | null,
    },
    onSubmit: async ({ value }) => {
      try {
        let logoKey: string | null = null;

        // Upload logo file to R2 when one is selected.
        if (value.logoFile) {
          const formData = new FormData();
          formData.append("file", value.logoFile);
          formData.append(
            "key",
            `shop-logos/${Date.now()}-${value.logoFile.name}`,
          );
          const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload logo file");
          }

          const uploaded = (await uploadResponse.json()) as { key: string };
          logoKey = uploaded.key;
          console.log("Logo uploaded to R2 with key:", logoKey);
        }

        await createShopFn({
          data: {
            name: value.name,
            logoUrl: logoKey ? `${r2BaseUrl}/${logoKey}` : null,
          },
        });

        form.reset();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setOpen(false);
        await router.invalidate();
      } catch (error) {
        console.error("Failed to create shop:", error);
      }
    },
  });

  return (
    <>
      <div>Hello "/_protected/dashboard/shop"!</div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>no data</p>}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create Shop</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <DialogHeader>
              <DialogTitle>Create Shop</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new shop. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />

              <form.Field
                name="logoFile"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Logo</FieldLabel>
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const file = e.dataTransfer.files?.[0] ?? null;
                        field.handleChange(file);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`rounded-md border border-dashed p-4 text-sm transition-colors cursor-pointer ${
                        isDragging
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <p className="font-medium">
                        Drag and drop logo image here
                      </p>
                      <p className="text-muted-foreground">
                        or click to choose a file
                      </p>
                      {field.state.value ? (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Selected: {field.state.value.name}
                        </p>
                      ) : null}
                    </div>
                    <Input
                      ref={fileInputRef}
                      id={field.name}
                      name={field.name}
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.files?.[0] ?? null)
                      }
                    />
                    <FieldDescription>
                      Optional image file. It will be uploaded to your R2
                      bucket.
                    </FieldDescription>
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
