import { PerlinNoise } from "@/components/background/perlin-noise";

function PerlinNoiseDemo() {
  return (
    <div className="relative h-108 w-full overflow-hidden rounded-lg border border-border">
      <PerlinNoise lineColor="currentColor" />
    </div>
  );
}

const perlinNoiseSource = `import { PerlinNoise } from "@/components/background/perlin-noise";

function PerlinNoiseDemo() {
  return (
    <div className="relative h-108 w-full overflow-hidden rounded-lg border border-border">
      <PerlinNoise lineColor="currentColor" />
    </div>
  );
}`;

export { PerlinNoiseDemo, perlinNoiseSource };
