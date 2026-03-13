import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/authClient";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const signIn = async () => {
    try {
      const { data, error } = await authClient.signIn.email({
        email: "test@test.com",
        password: "123abc!@#",
        callbackURL: "/dashboard",
      });

      if (error) {
        throw error;
      }

      console.log("Login successful:", data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div>Hello "/login"!</div>
      <button onClick={signIn}>Login</button>
    </>
  );
}
