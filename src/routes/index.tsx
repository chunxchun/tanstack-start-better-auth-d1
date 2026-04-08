import { createFileRoute } from "@tanstack/react-router";
import Feature from "@/components/feature";

export const Route = createFileRoute("/")({ component: App });

const featureProps = {
  title: "Take Full Control of Your Vending Machine Operations",
  description:
    "Manage every machine from one dashboard, monitor inventory in real time, and track live sales performance so you can make faster, smarter business decisions.",
  imageSrc:
    "https://pub-2b0addf01b884fb58892ece1dc10f22d.r2.dev/logos/feature.jpg",
  imageAlt:
    "Vending machine management dashboard with real-time sales analytics",
  buttonPrimary: {
    text: "Open Dashboard",
    href: "/dashboard",
  },
  buttonSecondary: {
    text: "View Live Metrics",
    href: "/dashboard/daily-sales",
  },
  className: "",
};

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <Feature {...featureProps} />
      </section>
    </div>
  );
}
