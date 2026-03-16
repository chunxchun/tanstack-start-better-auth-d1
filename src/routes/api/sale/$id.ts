import type { UpdateSale } from "@/db/schema";
import {
  deleteSaleByIdHandler,
  fetchSaleByIdHandler,
  updateSaleHandlerById,
} from "@/utils/sale/sale.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/sale/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid sale id" }), {
              status: 400,
            });
          }
          const result = await fetchSaleByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to fetch sale" }),
            { status: 500 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid sale id" }), {
              status: 400,
            });
          }
          const result = await deleteSaleByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 204 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to delete sale" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ params, request }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid sale id" }), {
              status: 400,
            });
          }
          const body = (await request.json()) as UpdateSale;
          const result = await updateSaleHandlerById(id, body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to update sale" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
