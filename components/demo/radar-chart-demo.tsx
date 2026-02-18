import RadarChart from "@/components/ui-elements/radar-chart";

function RadarChartDemo() {
  return (
    <div className="w-full h-full">
      <RadarChart />
    </div>
  );
}

const radarChartSource = `import RadarChart from "@/components/ui-elements/radar-chart";

return <RadarChart />;`;

export { RadarChartDemo, radarChartSource };
