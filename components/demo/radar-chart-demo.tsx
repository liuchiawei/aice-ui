import RadarChart from "@/components/chart/radar-chart";

function RadarChartDemo() {
  return <RadarChart />;
}

const radarChartSource = `import RadarChart from "@/components/chart/radar-chart";

const DEMO_RADAR_DATA = [
  { name: "Java", value: 10 },
  { name: "Python", value: 49 },
  { name: "JavaScript", value: 80 },
  { name: "TypeScript", value: 85 },
  { name: "React", value: 90 },
  { name: "Next.js", value: 85 },
];

return <RadarChart data={DEMO_RADAR_DATA} />;`;

export { RadarChartDemo, radarChartSource };
