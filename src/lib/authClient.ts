import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "http://localhost:3000"
    baseURL: "https://tanstack-start-better-auth-d1.find2meals.workers.dev"
})