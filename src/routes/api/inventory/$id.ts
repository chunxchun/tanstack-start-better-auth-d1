import type { UpdateInventory } from "@/db/schema";
import {
  deleteInventoryByIdHandler,
  fetchInventoryByIdHandler,
  updateInventoryByIdHandler,
} from "@/utils/inventory/inventory.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/inventory/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid inventory id" }), {
              status: 400,
            });
          }
          const result = await fetchInventoryByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to fetch inventory" }),
            { status: 500 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid inventory id" }), {
              status: 400,
            });
          }
          const result = await deleteInventoryByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 204 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to delete inventory" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ params, request }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid inventory id" }), {
              status: 400,
            });
          }
          const body = (await request.json()) as UpdateInventory;
          const result = await updateInventoryByIdHandler(id, body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to update inventory" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
