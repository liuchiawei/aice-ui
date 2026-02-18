"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type RadarChartDataPoint = { name: string; value: number };

const DEMO_RADAR_DATA: RadarChartDataPoint[] = [
  { name: "Java", value: 10 },
  { name: "Python", value: 49 },
  { name: "JavaScript", value: 80 },
  { name: "TypeScript", value: 85 },
  { name: "React", value: 90 },
  { name: "Next.js", value: 85 },
];

export interface RadarChartProps {
  data?: RadarChartDataPoint[];
  title?: string;
  description?: string;
  valueLabel?: string;
  className?: string; // Card className
  chartClassName?: string; // ChartContainer className
}

export default function RadarChart({
  data,
  title,
  description,
  valueLabel = "Points",
  className,
  chartClassName,
}: RadarChartProps) {
  const chartData = data ?? DEMO_RADAR_DATA;
  const chartConfig = {
    value: {
      label: valueLabel,
    },
  } satisfies ChartConfig;
  // ヘッダーを表示するかどうか if title or description is not null, show header
  const showHeader = title != null || description != null;

  return (
    <Card
      className={cn(
        "w-full h-full flex flex-col justify-center items-center",
        className,
      )}
    >
      {showHeader && (
        <CardHeader className="items-center">
          {title != null && (
            <CardTitle className="text-center text-3xl">{title}</CardTitle>
          )}
          {description != null && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className="p-2 w-full h-full flex justify-center items-center">
        <ChartContainer
          config={chartConfig}
          className={cn("mx-auto w-full h-full", chartClassName)}
        >
          <RechartsRadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="name" />
            <PolarGrid />
            <Radar dataKey="value" fill="var(--accent)" fillOpacity={0.6} />
          </RechartsRadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
