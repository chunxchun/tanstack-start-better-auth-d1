import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { env } from "cloudflare:workers";

export const db = drizzle(env.DB, { schema });

// export function createDb(d1: D1Database) {
//   return drizzle(d1, { schema });
// }

// export type Database = ReturnType<typeof db>;

// export * from "./schema";
