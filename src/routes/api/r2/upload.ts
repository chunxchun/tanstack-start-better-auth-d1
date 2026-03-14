import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";
export const Route = createFileRoute("/api/r2/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          const file = formData.get("file");

          if (!file) {
            return new Response("No file uploaded", { status: 400 });
          }

          if (!(file instanceof File)) {
            return new Response("Not file type", { status: 400 });
          }

          let key = formData.get("key") as string;
          if (!key) {
            key = `uploads/${crypto.randomUUID()}-${file.name}`;
          }

          await env.BUCKET.put(key, file.stream(), {
            httpMetadata: {
              contentType: file.type || "application/octet-stream",
            },
          });

          return new Response("File uploaded successfully", { status: 200 });
        } catch (error) {
          return new Response("Failed to upload file", { status: 500 });
        }
      },
    },
  },
});
