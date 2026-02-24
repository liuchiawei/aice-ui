import { StarBackground } from "@/components/background/star-background";

function StarBackgroundDemo() {
  return (
    <div className="relative h-108 w-full overflow-hidden rounded-lg border border-border">
      <StarBackground containerClassName="rounded-lg bg-black">
        <div className="flex items-center justify-center w-full h-full">
          <h3 className="text-3xl lg:text-5xl text-white uppercase">Stars</h3>
        </div>
      </StarBackground>
    </div>
  );
}

const starBackgroundSource = `import { StarBackground } from "@/components/background/star-background";

function StarBackgroundDemo() {
  return (
    <div className="relative h-108 w-full overflow-hidden rounded-lg border border-border">
      <StarBackground containerClassName="rounded-lg bg-black">
        <div className="flex items-center justify-center w-full h-full">
          <h3 className="text-2xl text-white">Stars</h3>
        </div>
      </StarBackground>
    </div>
  );
}`;

export { StarBackgroundDemo, starBackgroundSource };
