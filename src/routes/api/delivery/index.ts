import type { InsertDelivery } from "@/db/schema";
import {
  createDeliveryHandler,
  listDeliveryHandler,
} from "@/utils/delivery/delivery.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/delivery/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const limit = parseInt(url.searchParams.get("limit") || "10");
          const offset = parseInt(url.searchParams.get("offset") || "1");

          const result = await listDeliveryHandler(limit, offset);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to list deliveries" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as InsertDelivery;
          const result = await createDeliveryHandler(body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to create delivery" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
