import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/authClient";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const signUp = async () => {
    try {
      const { data, error } = await authClient.signUp.email({
        email: "test@test.com",
        password: "123abc!@#",
        name: "Test User",
      });

      if (error) {
        throw error;
      }

      console.log("Sign-up successful", data);
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <>
      <div>Hello "/signup"!</div>
      <button onClick={signUp}>Sign Up</button>
    </>
  );
}
