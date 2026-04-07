import { searchSchema } from "@/db/schema/commonSchema";
import { listSaleByDateByShopIdFn } from "@/utils/sale/sale.function";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useState } from "react";
import RouteLayout from "../-shared/routeLayout";
import RouteHeader from "../-shared/routerHeader";
import { Item } from "@/components/ui/item";
import BarChartComponent from "../-shared/barChart";
import { PieChart } from "lucide-react";
import PieChartComponent from "../-shared/pieChart";

export const Route = createFileRoute("/_protected/dashboard/daily-sales/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ limit: search.limit, offset: search.offset }),
  loader: async ({ context }) => {
    const { user } = context;
    const shopId = user.shopId ?? 1;
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    const yesterdaySales = await listSaleByDateByShopIdFn({
      data: { date: yesterday, shopId },
    });

    return { yesterdaySales, user };
  },
  component: RouteComponent,
});

const data = [
  { item: "ice-cream", category: "snack", qty: 3, revenue: 30 },
  { item: "chips", category: "snack", qty: 5, revenue: 25 },
  { item: "soda", category: "drink", qty: 2, revenue: 10 },
  { item: "water", category: "drink", qty: 4, revenue: 20 },
  { item: "beef don", category: "bento", qty: 1, revenue: 15 },
  { item: "chicken don", category: "bento", qty: 2, revenue: 30 },
];

function RouteComponent() {
  const { yesterdaySales, user } = Route.useLoaderData();
  const defaultShopId = user.shopId ?? undefined;

  // const search = Route.useSearch();
  // const router = useRouter();
  // const navigate = useNavigate({ from: Route.fullPath });

  const [selectedDate, setSelectedDate] = useState();

  return (
    <>
      <RouteLayout>
        <RouteHeader title="Daily Sales" />
        {/* Render yesterdaySales data here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <Item> */}
          <BarChartComponent data={data} dataKey="qty"/>
         <BarChartComponent data={data} dataKey="revenue"/>
           
          {/* </Item> */}
          <PieChartComponent data={data} dataKey="qty"/>
          <PieChartComponent data={data} dataKey="revenue"/>
          <Item></Item>
        </div>
      </RouteLayout>
    </>
  );
}
