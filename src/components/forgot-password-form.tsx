import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient";

export function ForgotPasswordForm({
  className,
  onSubmit: externalOnSubmit,
  ...props
}: React.ComponentProps<"form">) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const getFieldError = (errors: Array<unknown>) => {
    const firstError = errors.find((error) => typeof error === "string");
    return typeof firstError === "string" ? firstError : null;
  };

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setSubmitError(null);

        const { error } = await authClient.requestPasswordReset({
          email: value.email,
          redirectTo: "/reset-password",
        });

        if (error) {
          setSubmitError(
            error.message || "Reset passwordfailed. Please try again.",
          );
          return;
        }

        await navigate({ to: "/dashboard" });
      } catch (error) {
        setSubmitError("An unexpected error occurred. Please try again.");
        console.error(error);
      }
    },
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        externalOnSubmit?.(e);
        form.handleSubmit();
      }}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Request Password Reset</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the email and we will send you a password reset link.
          </p>
        </div>

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Email is required";
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return "Enter a valid email address";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <Field
              data-invalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
            >
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="m@example.com"
                required
                className="bg-background"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldDescription>
                The email you registered with us.
              </FieldDescription>
              <FieldError>
                {field.state.meta.isTouched
                  ? getFieldError(field.state.meta.errors)
                  : null}
              </FieldError>
            </Field>
          )}
        </form.Field>

        {submitError ? <FieldError>{submitError}</FieldError> : null}
        <Field>
          <form.Subscribe
            selector={(state) => [state.isSubmitting, state.canSubmit] as const}
          >
            {([isSubmitting, canSubmit]) => (
              <Button type="submit" disabled={isSubmitting || !canSubmit}>
                {isSubmitting
                  ? "Sending password reset email..."
                  : "Request Password Reset"}
              </Button>
            )}
          </form.Subscribe>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Back to <a href="/login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
