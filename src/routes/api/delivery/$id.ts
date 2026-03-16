import type { UpdateDelivery } from "@/db/schema";
import {
  deleteDeliveryByIdHandler,
  fetchDeliveryByIdHandler,
  updateDeliveryByIdHandler,
} from "@/utils/delivery/delivery.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/delivery/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(
              JSON.stringify({ error: "Invalid delivery id" }),
              {
                status: 400,
              },
            );
          }
          const result = await fetchDeliveryByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to fetch delivery" }),
            { status: 500 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(
              JSON.stringify({ error: "Invalid delivery id" }),
              {
                status: 400,
              },
            );
          }
          const result = await deleteDeliveryByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 204 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to delete delivery" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ params, request }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(
              JSON.stringify({ error: "Invalid delivery id" }),
              {
                status: 400,
              },
            );
          }
          const body = (await request.json()) as UpdateDelivery;
          const result = await updateDeliveryByIdHandler(id, body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to update delivery" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
