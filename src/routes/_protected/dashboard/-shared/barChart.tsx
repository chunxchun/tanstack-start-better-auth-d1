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
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => {
                    const formattedValue =
                      dataKey === "revenue"
                        ? typeof value === "number"
                          ? `$${value.toLocaleString()}`
                          : `$${String(value)}`
                        : typeof value === "number"
                          ? value.toLocaleString()
                          : String(value);
                    const indicatorColor = item.payload?.fill ?? item.color;

                    return (
                      <div className="flex w-full items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 shrink-0 rounded-xs"
                            style={{ backgroundColor: indicatorColor }}
                          />
                          <span className="text-muted-foreground">{String(name)}</span>
                        </div>
                        <span className="font-mono font-medium text-foreground tabular-nums">
                          {formattedValue}
                        </span>
                      </div>
                    );
                  }}
                />
              }
            />
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
