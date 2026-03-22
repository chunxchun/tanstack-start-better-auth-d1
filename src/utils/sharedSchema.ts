import * as z from "zod";

export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
});

export const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const R2UploadResponseSchema = z.object({
  url: z.string().url(),
});

export type R2UploadResponseType = z.infer<typeof R2UploadResponseSchema>;