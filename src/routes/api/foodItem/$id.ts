import type { UpdateFoodItem } from "@/db/schema";
import {
  deleteFoodItemByIdHandler,
  fetchFoodItemByIdHandler,
  updateFoodItemByIdHandler,
} from "@/utils/foodItem/foodItem.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/foodItem/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid food item id" }), {
              status: 400,
            });
          }
          const result = await fetchFoodItemByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to fetch food item" }),
            { status: 500 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid food item id" }), {
              status: 400,
            });
          }
          const result = await deleteFoodItemByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 204 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to delete food item" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ params, request }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid food item id" }), {
              status: 400,
            });
          }
          const body = (await request.json()) as UpdateFoodItem;
          const result = await updateFoodItemByIdHandler(id, body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to update food item" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
