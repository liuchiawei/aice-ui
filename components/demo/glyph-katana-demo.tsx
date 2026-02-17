import GlyphKatana from "@/components/text/glyph-katakana";

export function GlyphKatanaDemo() {
  return (
    <div className="flex justify-center items-center h-48 w-full">
      <GlyphKatana text="AICE UI" className="text-5xl font-bold" />
    </div>
  );
}

export const glyphKatanaSource = `import GlyphKatana from "@/components/text/glyph-katana";

<GlyphKatana text="AICE UI" className="text-5xl font-bold" />`;