import type { UpdateMachineType } from "@/db/schema";
import {
  deleteMachineByIdHandler,
  fetchMachineByIdHandler,
  updateMachineByIdHandler,
} from "@/utils/machine/machine.handler";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/machine/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid machine id" }), {
              status: 400,
            });
          }
          const result = await fetchMachineByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to fetch machine" }),
            { status: 500 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid machine id" }), {
              status: 400,
            });
          }
          const result = await deleteMachineByIdHandler(id);
          return new Response(JSON.stringify(result), { status: 204 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to delete machine" }),
            { status: 500 },
          );
        }
      },
      POST: async ({ params, request }) => {
        try {
          const id = Number(params.id);
          if (!Number.isInteger(id) || id <= 0) {
            return new Response(JSON.stringify({ error: "Invalid machine id" }), {
              status: 400,
            });
          }
          const body = (await request.json()) as UpdateMachineType;
          const result = await updateMachineByIdHandler(id, body);
          return new Response(JSON.stringify(result), { status: 201 });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: "Failed to update machine" }),
            { status: 500 },
          );
        }
      },
    },
  },
});
