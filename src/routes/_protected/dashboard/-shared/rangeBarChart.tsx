import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  "ice-cream": {
    label: "Ice Cream",
    color: "var(--chart-1)",
  },
  chips: {
    label: "Chips",
    color: "var(--chart-2)",
  },
  soda: {
    label: "Soda",
    color: "var(--chart-3)",
  },
  water: {
    label: "Water",
    color: "var(--chart-1)",
  },
  "beef don": {
    label: "Beef Don",
    color: "var(--chart-2)",
  },
  "chicken don": {
    label: "Chicken Don",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const Items = [
  "ice-cream",
  "chips",
  "soda",
  "water",
  "beef don",
  "chicken don",
] as const;

type ItemType = (typeof Items)[number];
export type salesDataType = {
  date: string;
  item: ItemType;
  category: string;
  qty: number;
  revenue: number;
};

export type salesDataByQtyType = Record<ItemType, number> & {
  date: string;
};

const consolidateSalesDataByKey = (
  data: salesDataType[],
  key: "qty" | "revenue",
): salesDataByQtyType[] => {
  const map = new Map<string, salesDataByQtyType>();
  for (const sales of data) {
    if (!map.has(sales.date)) {
      map.set(sales.date, { date: sales.date } as salesDataByQtyType);
    }
    const entry = map.get(sales.date)!;
    entry[sales.item] = ((entry[sales.item] ?? 0) + sales[key]) as number;
  }
  return Array.from(map.values());
};

const consolidateSalesDataByQty = (data: salesDataType[]) =>
  consolidateSalesDataByKey(data, "qty");

const consolidateSalesDataByRevenue = (data: salesDataType[]) =>
  consolidateSalesDataByKey(data, "revenue");

type RangeBarChartComponentProps = {
  data: salesDataType[];
  dataKey: "qty" | "revenue";
};
export default function RangeBarChartComponent({
  data,
  dataKey,
}: RangeBarChartComponentProps) {
  const qtyData = consolidateSalesDataByQty(data);
  const revenueData = consolidateSalesDataByRevenue(data);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Weekly Sales</CardTitle>
        <CardDescription>
          {dataKey === "qty" ? "Quantity sold by item" : "Revenue by item"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={dataKey === "qty" ? qtyData : revenueData}
            // layout="vertical"
            // margin={{ left: 20 }}
          >
            <CartesianGrid vertical={false}  />
            <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(5,10)}/>
            {/* <YAxis
              dataKey="item"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            /> */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
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
            <ChartLegend content={<ChartLegendContent />} />

            {Items.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === Items.length - 1;
              let barRadius: [number, number, number, number] = [0, 0, 0, 0];
              if (isFirst) {
                barRadius = [0, 0, 4, 4];
              } else if (isLast) {
                barRadius = [4, 4, 0, 0];
              }
              return (
                <Bar
                  key={item}
                  dataKey={item}
                  stackId={"a"}
                  fill={chartConfig[item].color}
                  radius={barRadius}
                />
              );
            })}

            {/* <Bar dataKey="chips" fill={chartConfig[dataKey].color} radius={4} /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
