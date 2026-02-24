"use client";

import { RadialCluster, type Node } from "@/components/chart/radial-cluster";

const DEMO_DATA: Node[] = [
  {
    name: "AICE",
    children: [
      {
        name: "A",
        children: [{ name: "A-1" }, { name: "A-2" }],
      },
      {
        name: "B",
        children: [{ name: "B-1" }, { name: "B-2" }, { name: "B-3" }],
      },
      {
        name: "C",
        children: [{ name: "C-1" }, { name: "C-2" }, { name: "C-3" }],
      },
    ],
  },
];

export function RadialClusterDemo() {
  return <RadialCluster data={DEMO_DATA} size={700} />;
}

export const radialClusterSource = `import { RadialCluster, type Node } from "@/components/chart/radial-cluster";

const DEMO_DATA: Node[] = [
  {
    name: "AICE",
    children: [
      {
        name: "A",
        children: [{ name: "A-1" }, { name: "A-2" }],
      },
      {
        name: "B",
        children: [{ name: "B-1" }, { name: "B-2" }, { name: "B-3" }],
      },
      {
        name: "C",
        children: [{ name: "C-1" }, { name: "C-2" }, { name: "C-3" }],
      },
    ],
  },
];

export function RadialClusterDemo() {
  return <RadialCluster data={DEMO_DATA} size={700} />;
}`;
