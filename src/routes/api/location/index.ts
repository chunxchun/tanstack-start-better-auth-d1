import type { InsertLocationType } from "@/db/schema";
import {
  createLocationHandler,
  listLocationHandler,
} from "@/utils/location/location.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/location/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const limit = parseInt(url.searchParams.get("limit") || "10");
          const offset = parseInt(url.searchParams.get("offset") || "1");

          const result = await listLocationHandler(limit, offset);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to list locations" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as InsertLocationType;
          const result = await createLocationHandler(body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to create location" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
