import type { InsertFoodItem } from "@/db/schema";
import {
  createFoodItemHandler,
  listFoodItemHandler,
} from "@/utils/foodItem/foodItem.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/foodItem/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const limit = parseInt(url.searchParams.get("limit") || "10");
          const offset = parseInt(url.searchParams.get("offset") || "1");

          const result = await listFoodItemHandler(limit, offset);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to list food items" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as InsertFoodItem;
          const result = await createFoodItemHandler(body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to create food item" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
