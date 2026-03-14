import type { UpdateShop } from "@/db/schema";
import {
  deleteShopByIdHandler,
  fetchShopByIdHandler,
  updateShopHandlerById
} from "@/utils/shop/shop.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/shop/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid shop id" }), {
              status: 400,
            });
          }
          const result = await fetchShopByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to fetch shop" }),
            { status: 500 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid shop id" }), {
              status: 400,
            });
          }
          const result = await deleteShopByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 204 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to delete shop" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ params, request }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid shop id" }), {
              status: 400,
            });
          }
          const body = (await request.json()) as UpdateShop;
          const result = await updateShopHandlerById(id, body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to update shop" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
