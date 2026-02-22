"use client";

import { RadialCluster, type Node } from "@/components/chart/radial-cluster";

const DEMO_DATA: Node[] = [
  {
    name: "Root",
    children: [
      {
        name: "Product A",
        children: [{ name: "Feature 1" }, { name: "Feature 2" }],
      },
      {
        name: "Product B",
        children: [{ name: "Feature X" }],
      },
    ],
  },
];

export function RadialClusterDemo() {
  return <RadialCluster data={DEMO_DATA} size={700} />;
}

export const radialClusterSource = `import { RadialCluster, type Node } from "@/components/chart/radial-cluster";

const data: Node[] = [{
  name: "Root",
  children: [
    { name: "A", children: [{ name: "A1" }, { name: "A2" }] },
    { name: "B", children: [{ name: "B1" }] },
  ],
}];

<RadialCluster data={data} size={700} />`;
