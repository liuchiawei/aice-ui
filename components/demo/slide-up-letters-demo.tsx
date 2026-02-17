import SlideUpLetters from "@/components/text/slide-up-letters";

export function SlideUpLettersDemo() {
  return (
    <div className="flex justify-center items-center h-48 w-full">
      <SlideUpLetters text="AICE UI" className="text-5xl font-bold" />
    </div>
  );
}

export const slideUpLettersSource = `import SlideUpLetters from "@/components/text/slide-up-letters";

<SlideUpLetters text="AICE UI" className="text-4xl font-bold" />`;
