import MatrixCode from "@/components/background/matrix-code";

function MatrixRainDemo() {
  return (
    <div className="relative h-108 w-full overflow-hidden rounded-lg border border-border">
      <MatrixCode
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
        className="brightness-50"
      />
    </div>
  );
}

const matrixCodeSource = `import MatrixCode from "@/components/background/matrix-code";
<MatrixCode
  glitchSpeed={50}
  centerVignette={true}
  outerVignette={false}
  smooth={true}
  className="brightness-50"
/>
`;

export { MatrixCodeDemo, matrixCodeSource };