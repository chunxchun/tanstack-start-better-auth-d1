import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/api/r2/download")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const key = url.searchParams.get("key");
          if (!key) {
            return new Response("Missing 'key' query parameter", {
              status: 400,
            });
          }

          const object = await env.BUCKET.get(key);
          if (!object) {
            return new Response("File not found", { status: 404 });
          }

          const headers = new Headers();
          headers.set(
            "Content-Type",
            object.httpMetadata?.contentType || "application/octet-stream",
          );
          headers.set(
            "Content-Disposition",
            `attachment; filename="${key.split("/").pop()}"`,
          );

          return new Response(object.body, { status: 200, headers });
        } catch (error) {
          return new Response("Failed to download file", { status: 500 });
        }
      },
    },
  },
});
