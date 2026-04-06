import type { ReactNode } from "react";

type RouteLayoutProps = {
  children: ReactNode;
};

export default function RouteLayout({ children }: RouteLayoutProps) {
  return <div className="container mx-auto px-8 py-8 space-y-4">{children}</div>;
}
