import * as z from 'zod'

export const currencyValues = ["HKD", "AUD", "USD", "EUR", "JPY"] as const;
export const currencyEnum = z.enum(currencyValues);
export type Currency = (typeof currencyValues)[number];
