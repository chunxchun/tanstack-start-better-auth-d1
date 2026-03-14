import type { InsertShop } from "@/db/schema/shop";
import {
  createShopHandler,
  listShopHandler
} from "@/utils/shop/shop.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/shop/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const limit = parseInt(url.searchParams.get("limit") || "10");
          const offset = parseInt(url.searchParams.get("offset") || "1");

          const result = await listShopHandler(limit, offset);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to list shops" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as InsertShop;
          const result = await createShopHandler(body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to create shop" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
