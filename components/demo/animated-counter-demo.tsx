"use client";

import AnimatedCounter from "@/components/text/animated-counter";

export function AnimatedCounterDemo() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 h-48 w-full">
      <div className="text-center">
        <AnimatedCounter
          value={1247}
          trigger="enter"
          className="block text-4xl font-bold text-primary"
        />
        <span className="text-sm text-muted-foreground">Downloads</span>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-primary">
          <AnimatedCounter value={99} trigger="hover" className="inline" />%
        </div>
        <span className="text-sm text-muted-foreground">Satisfaction</span>
      </div>
      <div className="text-center">
        <AnimatedCounter
          value={24}
          from={10}
          speed={1.2}
          trigger="whileInView"
          className="block text-4xl font-bold text-primary"
        />
        <span className="text-sm text-muted-foreground">Components</span>
      </div>
    </div>
  );
}

export const animatedCounterSource = `import AnimatedCounter from "@/components/text/animated-counter";

<AnimatedCounter
  value={1247}
  trigger="enter"
  className="block text-4xl font-bold text-primary"
/>

<AnimatedCounter
  value={99}
  trigger="hover"
  className="inline"
/>

<AnimatedCounter
  value={24}
  from={10}
  speed={1.2}
  trigger="whileInView"
  className="block text-4xl font-bold text-primary"
/>`;