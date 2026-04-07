import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  qty: {
    label: "Quantity Sold",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type BarChartComponentProps = {
  data: { item: string; category: string; qty: number; revenue: number }[];
  dataKey: "qty" | "revenue";
};
export default function BarChartComponent({
  data,
  dataKey,
}: BarChartComponentProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Sales by Item</CardTitle>
        <CardDescription>
          {dataKey === "qty" ? "Quantity sold by item" : "Revenue by item"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 20 }}
          >
            <XAxis type="number" dataKey={dataKey} hide />
            <YAxis
              dataKey="item"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey={dataKey}
              fill={chartConfig[dataKey].color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
