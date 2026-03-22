import type { UpdateLocationType } from "@/db/schema";
import {
  deleteLocationByIdHandler,
  fetchLocationByIdHandler,
  updateLocationByIdHandler,
} from "@/utils/location/location.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/location/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid location id" }), {
              status: 400,
            });
          }
          const result = await fetchLocationByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to fetch location" }),
            { status: 500 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid location id" }), {
              status: 400,
            });
          }
          const result = await deleteLocationByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 204 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to delete location" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ params, request }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid location id" }), {
              status: 400,
            });
          }
          const body = (await request.json()) as UpdateLocationType;
          const result = await updateLocationByIdHandler(id, body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to update location" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
