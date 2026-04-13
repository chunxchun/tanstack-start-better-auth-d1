import { randomUUID } from "node:crypto";
import { resend } from "@/lib/resend";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/resend/send")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { to, subject, message, preventThreading } = body as unknown as {
            to: string;
            subject: string;
            message: string;
            preventThreading?: boolean;
          };

          if (!to || !subject) {
            return new Response(
              JSON.stringify({ error: "Missing required fields: to, subject" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          if (!message) {
            return new Response(
              JSON.stringify({ error: "Missing message content" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          // Build the email options
          const emailOptions: Parameters<typeof resend.emails.send>[0] = {
            from: process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>",
            to: [to],
            subject,
            html: `<p>${message}</p>`,
          };

          // Prevent Gmail threading using X-Entity-Ref-ID header
          if (preventThreading) {
            emailOptions.headers = {
              "X-Entity-Ref-ID": randomUUID(),
            };
          }

          const { data, error } = await resend.emails.send(emailOptions);

          if (error) {
            console.error("Resend error:", error);
            return new Response(JSON.stringify({ error: error.message }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(
            JSON.stringify({
              success: true,
              id: data?.id,
              message: "Email sent successfully",
              preventedThreading: preventThreading || false,
            }),
            { headers: { "Content-Type": "application/json" } },
          );
        } catch (err) {
          console.error("Unexpected error:", err);
          return new Response(
            JSON.stringify({ error: "Failed to send email" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
