import type { InsertInventory } from "@/db/schema";
import {
  createInventoryHandler,
  listInventoryHandler,
} from "@/utils/inventory/inventory.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/inventory/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const limit = parseInt(url.searchParams.get("limit") || "10");
          const offset = parseInt(url.searchParams.get("offset") || "1");

          const result = await listInventoryHandler(limit, offset);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to list inventories" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as InsertInventory;
          const result = await createInventoryHandler(body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to create inventory" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
