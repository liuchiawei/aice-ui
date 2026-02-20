"use client";

import { DraggableGrid } from "@/components/grid/draggable-grid";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { Loader } from "lucide-react";

const ROWS = 10;
const COLS = 10;
const SIZE = 120;

function getPicsumUrl(index: number) {
  return `https://picsum.photos/${SIZE}/${SIZE}?random=${index}`;
}

export function DraggableGridDemo() {
  return (
    <DraggableGrid.Root
      rows={ROWS}
      cols={COLS}
      fallback={
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-2">
          <Loader className="size-12 text-muted-foreground animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      }
    >
      <DraggableGrid.Grid>
        {Array.from({ length: ROWS * COLS }, (_, index) => {
          const rowIndex = Math.floor(index / COLS);
          const colIndex = index % COLS;
          const imageSrc = getPicsumUrl(index);
          return (
            <DraggableGrid.Item
              key={index}
              row={rowIndex}
              col={colIndex}
              index={index}
            >
              <TooltipProvider>
                <Tooltip delayDuration={400}>
                  <TooltipTrigger asChild>
                    <div className="w-full h-full flex justify-center items-center">
                      <Image
                        src={imageSrc}
                        alt={`Demo image ${index + 1}`}
                        width={SIZE}
                        height={SIZE}
                        className="object-cover select-none touch-none pointer-events-none"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Image {index + 1}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DraggableGrid.Item>
          );
        })}
      </DraggableGrid.Grid>
    </DraggableGrid.Root>
  );
}

export const draggableGridSource = `import { DraggableGrid } from "@/components/grid/draggable-grid";

const rows = 10;
const cols = 10;
const items = [{ id: 0, href: "/item/0", image: "/img/0.png", label: "Item 0" }];

<DraggableGrid.Root rows={rows} cols={cols}>
  <DraggableGrid.Grid className="your-grid-class">
    {Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) => {
        const index = row * cols + col;
        const item = items[index % items.length];
        return (
          <DraggableGrid.Item
            key={\`\${row}-\${col}\`}
            row={row}
            col={col}
            index={index}
            item={item}
            className="your-item-class"
          />
        );
      })
    )}
  </DraggableGrid.Grid>
</DraggableGrid.Root>`;
