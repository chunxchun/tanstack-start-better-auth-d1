import { createFileRoute } from "@tanstack/react-router";
import { searchSchema } from "@/db/schema/commonSchema";

import dayjs from "dayjs";
import { listSaleByDateRangeByShopIdFn } from "@/utils/sale/sale.function";
import { useState } from "react";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";
import RangeBarChartComponent, {
  type salesDataType,
} from "../-shared/rangeBarChart";

export const Route = createFileRoute("/_protected/dashboard/weekly-sales/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ context }) => {
    const { user } = context;
    const shopId = user.shopId ?? 1;
    const startDate = dayjs().subtract(8, "day").format("YYYY-MM-DD");
    const endDate = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    const weeklySales = await listSaleByDateRangeByShopIdFn({
      data: { startDate, endDate, shopId },
    });
    return { weeklySales, user };
  },
  component: RouteComponent,
});

const weeklyData: salesDataType[] = [
  // --- 2026-03-01 (Sunday) ---
  {
    date: "2026-03-01",
    item: "ice-cream",
    category: "snack",
    qty: 4,
    revenue: 40.0,
  },
  {
    date: "2026-03-01",
    item: "chips",
    category: "snack",
    qty: 5,
    revenue: 25.0,
  },
  {
    date: "2026-03-01",
    item: "soda",
    category: "drink",
    qty: 2,
    revenue: 10.0,
  },
  {
    date: "2026-03-01",
    item: "water",
    category: "drink",
    qty: 5,
    revenue: 25.0,
  },
  {
    date: "2026-03-01",
    item: "beef don",
    category: "bento",
    qty: 1,
    revenue: 15.0,
  },
  {
    date: "2026-03-01",
    item: "chicken don",
    category: "bento",
    qty: 3,
    revenue: 45.0,
  },

  // --- 2026-03-02 (Monday) ---
  {
    date: "2026-03-02",
    item: "ice-cream",
    category: "snack",
    qty: 3,
    revenue: 30.0,
  },
  {
    date: "2026-03-02",
    item: "chips",
    category: "snack",
    qty: 4,
    revenue: 20.0,
  },
  {
    date: "2026-03-02",
    item: "soda",
    category: "drink",
    qty: 2,
    revenue: 10.0,
  },
  {
    date: "2026-03-02",
    item: "water",
    category: "drink",
    qty: 3,
    revenue: 15.0,
  },
  {
    date: "2026-03-02",
    item: "beef don",
    category: "bento",
    qty: 1,
    revenue: 15.0,
  },
  {
    date: "2026-03-02",
    item: "chicken don",
    category: "bento",
    qty: 2,
    revenue: 30.0,
  },

  // --- 2026-03-03 (Tuesday) ---
  {
    date: "2026-03-03",
    item: "ice-cream",
    category: "snack",
    qty: 2,
    revenue: 20.0,
  },
  {
    date: "2026-03-03",
    item: "chips",
    category: "snack",
    qty: 4,
    revenue: 20.0,
  },
  {
    date: "2026-03-03",
    item: "soda",
    category: "drink",
    qty: 2,
    revenue: 10.0,
  },
  {
    date: "2026-03-03",
    item: "water",
    category: "drink",
    qty: 3,
    revenue: 15.0,
  },
  {
    date: "2026-03-03",
    item: "beef don",
    category: "bento",
    qty: 1,
    revenue: 15.0,
  },
  {
    date: "2026-03-03",
    item: "chicken don",
    category: "bento",
    qty: 2,
    revenue: 30.0,
  },

  // --- 2026-03-04 (Wednesday) ---
  {
    date: "2026-03-04",
    item: "ice-cream",
    category: "snack",
    qty: 3,
    revenue: 30.0,
  },
  {
    date: "2026-03-04",
    item: "chips",
    category: "snack",
    qty: 4,
    revenue: 20.0,
  },
  {
    date: "2026-03-04",
    item: "soda",
    category: "drink",
    qty: 2,
    revenue: 10.0,
  },
  {
    date: "2026-03-04",
    item: "water",
    category: "drink",
    qty: 4,
    revenue: 20.0,
  },
  {
    date: "2026-03-04",
    item: "beef don",
    category: "bento",
    qty: 1,
    revenue: 15.0,
  },
  {
    date: "2026-03-04",
    item: "chicken don",
    category: "bento",
    qty: 2,
    revenue: 30.0,
  },

  // --- 2026-03-05 (Thursday) ---
  {
    date: "2026-03-05",
    item: "ice-cream",
    category: "snack",
    qty: 3,
    revenue: 30.0,
  },
  {
    date: "2026-03-05",
    item: "chips",
    category: "snack",
    qty: 5,
    revenue: 25.0,
  },
  {
    date: "2026-03-05",
    item: "soda",
    category: "drink",
    qty: 2,
    revenue: 10.0,
  },
  {
    date: "2026-03-05",
    item: "water",
    category: "drink",
    qty: 3,
    revenue: 15.0,
  },
  {
    date: "2026-03-05",
    item: "beef don",
    category: "bento",
    qty: 1,
    revenue: 15.0,
  },
  {
    date: "2026-03-05",
    item: "chicken don",
    category: "bento",
    qty: 2,
    revenue: 30.0,
  },

  // --- 2026-03-06 (Friday) ---
  {
    date: "2026-03-06",
    item: "ice-cream",
    category: "snack",
    qty: 4,
    revenue: 40.0,
  },
  {
    date: "2026-03-06",
    item: "chips",
    category: "snack",
    qty: 6,
    revenue: 30.0,
  },
  {
    date: "2026-03-06",
    item: "soda",
    category: "drink",
    qty: 2,
    revenue: 10.0,
  },
  {
    date: "2026-03-06",
    item: "water",
    category: "drink",
    qty: 5,
    revenue: 25.0,
  },
  {
    date: "2026-03-06",
    item: "beef don",
    category: "bento",
    qty: 1,
    revenue: 15.0,
  },
  {
    date: "2026-03-06",
    item: "chicken don",
    category: "bento",
    qty: 2,
    revenue: 30.0,
  },

  // --- 2026-03-07 (Saturday) ---
  {
    date: "2026-03-07",
    item: "ice-cream",
    category: "snack",
    qty: 4,
    revenue: 40.0,
  },
  {
    date: "2026-03-07",
    item: "chips",
    category: "snack",
    qty: 7,
    revenue: 35.0,
  },
  {
    date: "2026-03-07",
    item: "soda",
    category: "drink",
    qty: 3,
    revenue: 15.0,
  },
  {
    date: "2026-03-07",
    item: "water",
    category: "drink",
    qty: 6,
    revenue: 30.0,
  },
  {
    date: "2026-03-07",
    item: "beef don",
    category: "bento",
    qty: 1,
    revenue: 15.0,
  },
  {
    date: "2026-03-07",
    item: "chicken don",
    category: "bento",
    qty: 2,
    revenue: 30.0,
  },

  // --- 2026-03-08 (Sunday) ---
  {
    date: "2026-03-08",
    item: "ice-cream",
    category: "snack",
    qty: 3,
    revenue: 30.0,
  },
  {
    date: "2026-03-08",
    item: "chips",
    category: "snack",
    qty: 6,
    revenue: 30.0,
  },
  {
    date: "2026-03-08",
    item: "soda",
    category: "drink",
    qty: 2,
    revenue: 10.0,
  },
  {
    date: "2026-03-08",
    item: "water",
    category: "drink",
    qty: 5,
    revenue: 25.0,
  },
  {
    date: "2026-03-08",
    item: "beef don",
    category: "bento",
    qty: 1,
    revenue: 15.0,
  },
  {
    date: "2026-03-08",
    item: "chicken don",
    category: "bento",
    qty: 2,
    revenue: 30.0,
  },
];

function RouteComponent() {
  const { weeklySales, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

  return (
    <>
      <RouteLayout>
        <RouteHeader title="Weekly Sales" />
        <div className="grid grid-cols-1 gap-4">
          {/* bar chart */}
          <RangeBarChartComponent data={weeklyData} dataKey="qty" />
          <RangeBarChartComponent data={weeklyData} dataKey="revenue" />
        </div>
      </RouteLayout>
    </>
  );
}
