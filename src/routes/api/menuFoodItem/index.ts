import type { InsertMenuFoodItemType } from "@/db/schema";
import {
  createMenuFoodItemHandler,
  listMenuFoodItemHandler,
} from "@/utils/menuFoodItem/menuFoodItem.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/menuFoodItem/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const limit = parseInt(url.searchParams.get("limit") || "10");
          const offset = parseInt(url.searchParams.get("offset") || "1");

          const result = await listMenuFoodItemHandler(limit, offset);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({
              error: "Failed to list menuFoodItems",
            }),
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as InsertMenuFoodItemType;
          const result = await createMenuFoodItemHandler(body);
          return new Response(JSON.stringify(JSON.stringify(result)), {
            status: 201,
          });
        } catch (error) {
          return new Response(
            JSON.stringify({
              error: "MenuFoodItem creation failed",
            }),
            { status: 500 },
          );
        }
      },
    },
  },
});
