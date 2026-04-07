import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  snack: {
    label: "Snack",
    color: "var(--chart-1)",
  },
  drink: {
    label: "Drink",
    color: "var(--chart-2)",
  },
  bento: {
    label: "Bento",
    color: "var(--chart-3)",
  },
  other: {
    label: "Other",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

type PieChartComponentProps = {
  data: { item: string; category: string; qty: number; revenue: number }[];
  dataKey: "qty" | "revenue";
};

export default function PieChartComponent({
  data,
  dataKey,
}: PieChartComponentProps) {
  const fallbackColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  const pieData = data
    .map((d) => ({ category: d.category, qty: d.qty, revenue: d.revenue }))
    .reduce(
      (acc, curr) => {
        const existing = acc.find((item) => item.category === curr.category);
        if (existing) {
          existing.qty += curr.qty;
          existing.revenue += curr.revenue;
        } else {
          acc.push(curr);
        }
        return acc;
      },
      [] as { category: string; qty: number; revenue: number }[],
    )
    .map((entry, index) => {
      const key = entry.category.toLowerCase();
      const configuredColor =
        chartConfig[key as keyof typeof chartConfig]?.color;
      return {
        ...entry,
        fill: configuredColor ?? fallbackColors[index % fallbackColors.length],
      };
    });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Sales Distribution</CardTitle>
        <CardDescription>
          {dataKey === "qty" ? "Sales quantity by category" : "Sales revenue by category"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-100"
        >
          <PieChart>
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
            <Pie data={pieData} dataKey={dataKey} nameKey="category" />
            <ChartLegend
              content={
                <ChartLegendContent
                  nameKey="category"
                  className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
}
