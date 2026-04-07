import { ThemeContext } from "@/context/theme.context";
import { PALETTES } from "@/lib/theme";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";

export const Route = createFileRoute("/_protected/dashboard/branding/")({
  component: RouteComponent,
});

function RouteComponent() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Branding route must be used within ThemeProvider.");
  }

  const { theme, setThemeCookie } = themeContext;

  return (
    <>
      <RouteLayout>
        <RouteHeader title="Branding" />
        {/* <div className="container mx-auto px-6 py-8 space-y-6"> */}
          <div className="space-y-2">
            {/* <h1 className="text-2xl font-bold">Branding</h1> */}
            <p className="text-sm text-muted-foreground">
              Choose one of four preset color palettes to update your app look
              and feel.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 w-1/2 min-w-100 mx-auto h-[60vh] place-items-center">
            {PALETTES.map((palette) => {
              const isActive = palette.id === theme?.id;

              return (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => setThemeCookie(palette)}
                  className={[
                    "rounded-xl border p-4 text-left transition-all w-full",
                    "hover:border-primary/60 hover:shadow-sm",
                    isActive
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold">{palette.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {palette.description}
                      </p>
                    </div>
                    {isActive ? (
                      <span className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        Active
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div
                      className="h-10 rounded-md border"
                      style={{
                        backgroundColor: palette.primary,
                        color: palette.primaryForeground,
                      }}
                    >
                      <div className="flex h-full items-center justify-center text-xs font-semibold">
                        Primary
                      </div>
                    </div>
                    <div
                      className="h-10 rounded-md border"
                      style={{
                        backgroundColor: palette.secondary,
                        color: palette.secondaryForeground,
                      }}
                    >
                      <div className="flex h-full items-center justify-center text-xs font-semibold">
                        Secondary
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        {/* </div> */}
      </RouteLayout>
    </>
  );
}
