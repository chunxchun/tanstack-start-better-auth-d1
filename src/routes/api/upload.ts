import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          const file = formData.get("file");

          if (!(file instanceof File)) {
            return new Response(JSON.stringify({ error: "File is required" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }

          const ext = file.name.includes(".")
            ? file.name.split(".").pop()?.toLowerCase()
            : "bin";
          const key = `logos/${crypto.randomUUID()}.${ext || "bin"}`;

          await env.BUCKET.put(key, await file.arrayBuffer(), {
            httpMetadata: {
              contentType: file.type || "application/octet-stream",
            },
          });

          return new Response(JSON.stringify({ key }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          console.error("Upload failed", error);
          return new Response(JSON.stringify({ error: "Upload failed" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});