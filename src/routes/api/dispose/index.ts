import type { InsertDisposeType } from "@/db/schema";
import {
  createDisposeHandler,
  listDisposeHandler,
} from "@/utils/dispose/dispose.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/dispose/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const limit = parseInt(url.searchParams.get("limit") || "10");
          const offset = parseInt(url.searchParams.get("offset") || "1");

          const result = await listDisposeHandler(limit, offset);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to list disposes" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as InsertDisposeType;
          const result = await createDisposeHandler(body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to create dispose" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
