import type { UpdateMenuType } from "@/db/schema";
import {
  deleteMenuByIdHandler,
  fetchMenuByIdHandler,
  updateMenuHandlerById,
} from "@/utils/menu/menu.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/menu/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid menu id" }), {
              status: 400,
            });
          }
          const result = await fetchMenuByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to fetch menu" }),
            { status: 500 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid menu id" }), {
              status: 400,
            });
          }
          const result = await deleteMenuByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 204 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to delete menu" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ params, request }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid menu id" }), {
              status: 400,
            });
          }
          const body = (await request.json()) as UpdateMenuType;
          const result = await updateMenuHandlerById(id, body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to update menu" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
