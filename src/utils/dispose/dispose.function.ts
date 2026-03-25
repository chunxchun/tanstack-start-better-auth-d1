import {
  insertDisposeSchema,
  updateDisposeSchema,
} from "@/db/schema/disposeTable";
import { createServerFn } from "@tanstack/react-start";
import { idSchema, paginationSchema } from "../sharedSchema";
import {
  createDisposeHandler,
  deleteDisposeByIdHandler,
  fetchDisposeByIdHandler,
  listDisposeHandler,
  updateDisposeByIdHandler,
} from "./dispose.handler";

export const listDisposeFn = createServerFn({ method: "GET" })
  .inputValidator(paginationSchema)
  .handler(async ({ data }) => listDisposeHandler(data.limit, data.offset));

export const createDisposeFn = createServerFn({ method: "POST" })
  .inputValidator(insertDisposeSchema)
  .handler(async ({ data }) => createDisposeHandler(data));

export const fetchDisposeByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => fetchDisposeByIdHandler(Number(data.id)));

export const updateDisposeByIdFn = createServerFn({ method: "POST" })
  .inputValidator(updateDisposeSchema)
  .handler(async ({ data }) =>
    updateDisposeByIdHandler(data.id as number, data),
  );

export const deleteDisposeByIdFn = createServerFn({ method: "GET" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => deleteDisposeByIdHandler(Number(data.id)));
