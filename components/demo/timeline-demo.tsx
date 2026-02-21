"use client";

import { Timeline } from "@/components/layout/timeline";

const DEMO_ITEMS = [
  {
    id: "1",
    date: "2024-01-15",
    title: "Project kickoff",
    description:
      "Started the initiative with team alignment and scope definition. Key milestones and deliverables were agreed.",
  },
  {
    id: "2",
    date: "2024-03-22",
    title: "First release",
    description:
      "Shipped the initial version to internal users. Collected feedback for the next iteration.",
  },
  {
    id: "3",
    date: "2024-06-10",
    title: "Public launch",
    description:
      "Opened the product to the public. Marketing campaign and support channels went live.",
  },
];

export function TimelineDemo() {
  return (
    <div className="min-h-[60vh]">
      <Timeline.Root scrollAxis>
        {DEMO_ITEMS.map((item) => (
          <Timeline.Item
            key={item.id}
            date={item.date}
            title={item.title}
            description={item.description}
          />
        ))}
      </Timeline.Root>
    </div>
  );
}

export const timelineSource = `import { Timeline } from "@/components/layout/timeline";

<Timeline.Root className="w-full" scrollAxis>
  <Timeline.Item date="2024-01-15" title="Kickoff" description="Project started." />
  <Timeline.Item date="2024-03-22" title="Release">
    <p>Custom content instead of default Card.</p>
  </Timeline.Item>
</Timeline.Root>

// Optional: Provider when you need context without Root
<Timeline.Provider scrollAxis>
  <Timeline.Item date="2024-01-01" title="Event" />
  <Timeline.Line />
</Timeline.Provider>`;
