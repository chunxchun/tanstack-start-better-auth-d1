import type { UpdateDisposeType } from "@/db/schema";
import {
  deleteDisposeByIdHandler,
  fetchDisposeByIdHandler,
  updateDisposeByIdHandler,
} from "@/utils/dispose/dispose.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/dispose/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(
              JSON.stringify({ error: "Invalid dispose id" }),
              {
                status: 400,
              },
            );
          }
          const result = await fetchDisposeByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to fetch dispose" }),
            { status: 500 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(
              JSON.stringify({ error: "Invalid dispose id" }),
              {
                status: 400,
              },
            );
          }
          const result = await deleteDisposeByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 204 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to delete dispose" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ params, request }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(
              JSON.stringify({ error: "Invalid dispose id" }),
              {
                status: 400,
              },
            );
          }
          const body = (await request.json()) as UpdateDisposeType;
          const result = await updateDisposeByIdHandler(id, body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to update dispose" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
