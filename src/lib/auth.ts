import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

const betterAuthUrl = process.env.BETTER_AUTH_URL?.trim();
const trustedOriginsFromEnv = (process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const trustedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  betterAuthUrl,
  ...trustedOriginsFromEnv,
].filter((origin): origin is string => Boolean(origin));

export const auth = betterAuth({
  user: {
    additionalFields: {
      role: {
        type: ["admin", "manager", "staff"],
        required: true,
        defaultValue: "staff",
        input: true, // don't allow user to set role
      },
      shopId: {
        type: "number",
        required: false,
        input: true,
      },
    },
  },
  emailAndPassword: { enabled: true },
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
  }),
  trustedOrigins,
  plugins: [tanstackStartCookies()],
});
