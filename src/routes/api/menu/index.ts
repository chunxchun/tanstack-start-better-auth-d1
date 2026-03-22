import type { InsertMenuType } from "@/db/schema";
import {
  createMenuHandler,
  listMenuHandler,
} from "@/utils/menu/menu.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/menu/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const limit = parseInt(url.searchParams.get("limit") || "10");
          const offset = parseInt(url.searchParams.get("offset") || "1");

          const result = await listMenuHandler(limit, offset);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to list menus" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as InsertMenuType;
          const result = await createMenuHandler(body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to create menu" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
