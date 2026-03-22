import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

const configuredBaseURL = import.meta.env.VITE_BETTER_AUTH_URL?.trim();

export const authClient = createAuthClient({
    // In dev, default to same origin to avoid browser CORS preflight issues.
    baseURL: configuredBaseURL || (typeof window !== "undefined" ? window.location.origin : undefined),
    plugins: [inferAdditionalFields<typeof auth>()],
});