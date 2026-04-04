import * as z from "zod";

export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
  shopId: z.coerce.number().int().positive().optional(),
});

export const integerIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const stringIdSchema = z.object({
  id: z.coerce.string().min(1),
});

export const idSchema = z.union([integerIdSchema, stringIdSchema]);

export const R2UploadResponseSchema = z.object({
  url: z.string().url(),
});

export type R2UploadResponseType = z.infer<typeof R2UploadResponseSchema>;