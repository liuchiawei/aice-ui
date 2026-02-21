"use client";

import PopUpItem from "@/components/ui-elements/pop-up-item";

export function PopUpItemDemo() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Hover to pop up</p>
        <PopUpItem
          trigger="hover"
          className="mx-auto mt-8 w-full h-[280px] md:h-[360px] rounded-3xl bg-accent flex justify-center items-center relative overflow-hidden"
        >
          <span className="text-[96px] md:text-[120px] select-none" aria-hidden>
            ✨
          </span>
        </PopUpItem>
      </div>
      <div>
        <h3 className="text-sm">Scroll into view to animate (default)</h3>
        <PopUpItem
          trigger="scroll"
          className="mx-auto mt-8 w-full h-[280px] md:h-[360px] rounded-3xl bg-accent flex justify-center items-center relative overflow-hidden"
        >
          <span className="text-[96px] md:text-[120px] select-none" aria-hidden>
            🎯
          </span>
        </PopUpItem>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Click to toggle</p>
        <PopUpItem
          trigger="click"
          className="mx-auto mt-8 w-full h-[280px] md:h-[360px] rounded-3xl bg-accent flex justify-center items-center relative overflow-hidden"
        >
          <span className="text-[96px] md:text-[120px] select-none" aria-hidden>
            🚀
          </span>
        </PopUpItem>
      </div>
    </div>
  );
}

export const popUpItemSource = `import PopUpItem from "@/components/ui-elements/pop-up-item";

// Scroll into view to animate (default)
<PopUpItem trigger="scroll">
  <span className="text-6xl">🎯</span>
</PopUpItem>

// Hover to pop up
<PopUpItem trigger="hover">
  <span className="text-6xl">✨</span>
</PopUpItem>

// Click to toggle
<PopUpItem trigger="click">
  <span className="text-6xl">🚀</span>
</PopUpItem>`;
