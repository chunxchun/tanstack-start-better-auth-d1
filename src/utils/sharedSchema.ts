import * as z from "zod";

export const dateSchema = z.object({
  // date: z.coerce.date().transform((d) => d.toISOString().slice(0, 10)),
  date: z.iso.date(),
});

const dateRangeBaseSchema = z.object({
  startDate: z.iso.date(),
  endDate: z.iso.date(),
});

export const dateRangeSchema = dateRangeBaseSchema.refine((data) => data.startDate <= data.endDate, {
  message: "startDate must be before or equal to endDate",
});

export const shopIdSchema = z.object({
  shopId: z.coerce.number().int().positive(),
});

export const machineIdSchema = z.object({
  machineId: z.coerce.number().int().positive(),
});

export const dateShopIdSchema = dateSchema.extend(shopIdSchema.shape);
export const dateMachineIdSchema = dateSchema.extend(machineIdSchema.shape);

export const dateRangeShopIdSchema = dateRangeBaseSchema
  .extend(shopIdSchema.shape)
  .refine((data) => data.startDate <= data.endDate, {
    message: "startDate must be before or equal to endDate",
  });

export const dateRangeMachineIdSchema = dateRangeBaseSchema
  .extend(machineIdSchema.shape)
  .refine((data) => data.startDate <= data.endDate, {
    message: "startDate must be before or equal to endDate",
  });


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
