"use client";

import PopUpItem from "@/components/ui-elements/pop-up-item";

export function PopUpItemDemo() {
  return (
    <section className="w-full space-y-4 *:data-demo-item:space-y-2 *:data-demo-item:font-sans **:data-demo-item-title:text-sm **:data-demo-item-title:text-muted-foreground">
      <div data-demo-item>
        <h3 data-demo-item-title>Hover to pop up</h3>
        <PopUpItem
          trigger="hover"
          className="w-full h-[280px] md:h-[360px] rounded-3xl bg-accent flex justify-center items-center relative overflow-hidden"
        >
          <span className="text-[96px] md:text-[120px] select-none" aria-hidden>
            ✨
          </span>
        </PopUpItem>
      </div>
      <div data-demo-item>
        <h3 data-demo-item-title>Scroll to pop up</h3>
        <PopUpItem
          trigger="scroll"
          className="w-full h-[280px] md:h-[360px] rounded-3xl bg-accent flex justify-center items-center relative overflow-hidden"
        >
          <span className="text-[96px] md:text-[120px] select-none" aria-hidden>
            🎯
          </span>
        </PopUpItem>
      </div>
      <div data-demo-item>
        <h3 data-demo-item-title>Click to pop up</h3>
        <PopUpItem
          trigger="click"
          className="w-full h-[280px] md:h-[360px] rounded-3xl bg-accent flex justify-center items-center relative overflow-hidden"
        >
          <span className="text-[96px] md:text-[120px] select-none" aria-hidden>
            🚀
          </span>
        </PopUpItem>
      </div>
    </section>
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
