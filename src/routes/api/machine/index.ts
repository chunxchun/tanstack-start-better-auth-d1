import type { InsertMachine } from "@/db/schema";
import {
  createMachineHandler,
  listMachineHandler,
} from "@/utils/machine/machine.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/machine/")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const limit = parseInt(url.searchParams.get("limit") || "10");
          const offset = parseInt(url.searchParams.get("offset") || "1");

          const result = await listMachineHandler(limit, offset);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to list machines" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as InsertMachine;
          const result = await createMachineHandler(body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to create machine" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
