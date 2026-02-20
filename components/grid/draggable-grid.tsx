"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { motion, MotionValue, useMotionValue, useTransform } from "motion/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/** Minimum item shape for grid cells. (slug: draggable-grid) */
export type DraggableGridItemBase = {
  id: string | number;
  href?: string;
  image?: string;
  label?: string;
};

type Device = { width: number; height: number };

interface DraggableGridContextValue {
  device: Device;
  planeX: MotionValue<number>;
  planeY: MotionValue<number>;
  xRange: number[];
  yRange: number[];
  scaleRange: number[];
  translateRange: number[];
  icon: { size: number; margin: number };
  rows: number;
  cols: number;
  mounted: boolean;
  linkComponent?: React.ComponentType<{ href: string; children: ReactNode }>;
}

const DraggableGridContext =
  createContext<DraggableGridContextValue | null>(null);

function useDraggableGrid() {
  const ctx = useContext(DraggableGridContext);
  if (!ctx) {
    throw new Error(
      "DraggableGrid components must be used within DraggableGrid.Root"
    );
  }
  return ctx;
}

function useWindowSize(): Device {
  const [windowSize, setWindowSize] = useState<Device>(() =>
    typeof window !== "undefined"
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 1920, height: 1080 }
  );
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const DEFAULT_ICON = { margin: 40, size: 120 };

/**
 * Root: provides device size, drag plane, and grid config. Wrap Grid and Items.
 * (slug: draggable-grid-root)
 */
function DraggableGridRoot({
  children,
  className,
  iconSize,
  iconMargin,
  rows = 10,
  cols = 10,
  linkComponent,
  fallback,
}: {
  children: ReactNode;
  className?: string;
  iconSize?: number;
  iconMargin?: number;
  rows?: number;
  cols?: number;
  linkComponent?: React.ComponentType<{
    href: string;
    children: ReactNode;
  }>;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const device = useWindowSize();
  useEffect(() => {
    setMounted(true);
  }, []);

  const icon = useMemo(
    () => ({
      size: iconSize ?? DEFAULT_ICON.size,
      margin: iconMargin ?? DEFAULT_ICON.margin,
    }),
    [iconSize, iconMargin]
  );

  const planeX = useMotionValue(-200);
  const planeY = useMotionValue(-100);

  const createScreenRange = useCallback(
    (axis: keyof Device) => [
      -60,
      80,
      device[axis] - (icon.size + icon.margin) / 2 - 80,
      device[axis] - (icon.size + icon.margin) / 2 + 60,
    ],
    [device, icon.size, icon.margin]
  );

  const scaleRange = [0, 1, 1, 0];
  const translateRange = [50, 0, 0, -50];
  const xRange = useMemo(() => createScreenRange("width"), [createScreenRange]);
  const yRange = useMemo(() => createScreenRange("height"), [createScreenRange]);

  const value = useMemo<DraggableGridContextValue>(
    () => ({
      device,
      planeX,
      planeY,
      xRange,
      yRange,
      scaleRange,
      translateRange,
      icon,
      rows,
      cols,
      mounted,
      linkComponent,
    }),
    [
      device,
      planeX,
      planeY,
      xRange,
      yRange,
      icon,
      rows,
      cols,
      mounted,
      linkComponent,
    ]
  );

  if (!mounted && fallback) {
    return <>{fallback}</>;
  }

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-screen h-screen relative overflow-hidden flex flex-col items-center justify-center gap-2",
          className
        )}
      >
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <DraggableGridContext.Provider value={value}>
      <div
        className={cn(
          "device w-screen h-screen relative cursor-grab active:cursor-grabbing overflow-hidden select-none touch-none",
          className
        )}
      >
        {children}
      </div>
    </DraggableGridContext.Provider>
  );
}

/**
 * Grid: draggable plane containing items. Use inside Root.
 * (slug: draggable-grid-grid)
 */
function DraggableGridGrid({
  children,
  className,
  dragConstraints = {
    left: -200,
    right: 20,
    top: -500,
    bottom: 50,
  },
}: {
  children: ReactNode;
  className?: string;
  dragConstraints?: { left: number; right: number; top: number; bottom: number };
}) {
  const { device, planeX, planeY } = useDraggableGrid();
  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      className={cn("absolute inset-0", className)}
      style={{
        width: device.width * 2,
        height: device.height * 2,
        x: planeX,
        y: planeY,
        background: "transparent",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Item: single cell with parallax. Use inside Grid. Pass item for default link+image+tooltip, or children for custom.
 * (slug: draggable-grid-item)
 */
function DraggableGridItem<T extends DraggableGridItemBase>({
  row,
  col,
  index,
  item,
  linkComponent: itemLinkComponent,
  className,
  children,
}: {
  row: number;
  col: number;
  index: number;
  item?: T;
  linkComponent?: React.ComponentType<{
    href: string;
    children: ReactNode;
  }>;
  className?: string;
  children?: ReactNode;
}) {
  const {
    planeX,
    planeY,
    xRange,
    yRange,
    scaleRange,
    translateRange,
    icon,
    linkComponent: rootLinkComponent,
  } = useDraggableGrid();

  const xOffset =
    col * (icon.size + icon.margin) +
    (row % 2) * ((icon.size + icon.margin) / 2);
  const yOffset = row * icon.size;

  const screenOffsetX = useTransform(() => planeX.get() + xOffset + 20);
  const screenOffsetY = useTransform(() => planeY.get() + yOffset + 20);
  const x = useTransform(screenOffsetX, xRange, translateRange);
  const y = useTransform(screenOffsetY, yRange, translateRange);
  const xScale = useTransform(screenOffsetX, xRange, scaleRange);
  const yScale = useTransform(screenOffsetY, yRange, scaleRange);
  const scale = useTransform(() => Math.min(xScale.get(), yScale.get()));

  const defaultClassName =
    "absolute flex justify-center items-center rounded-full bg-neutral-50 contain-strict overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all";

  if (children !== undefined) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.03 }}
        className={cn(defaultClassName, className)}
        style={{
          left: `${xOffset}px`,
          top: `${yOffset}px`,
          x,
          y,
          scale,
          width: `${icon.size}px`,
          height: `${icon.size}px`,
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    );
  }

  const LinkComponent = itemLinkComponent ?? rootLinkComponent ?? "a";
  const href = item?.href ?? "#";
  const label = item?.label;
  const image = item?.image;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={cn(defaultClassName, className)}
      style={{
        left: `${xOffset}px`,
        top: `${yOffset}px`,
        x,
        y,
        scale,
        width: `${icon.size}px`,
        height: `${icon.size}px`,
        willChange: "transform",
      }}
    >
      <TooltipProvider>
        <Tooltip delayDuration={600}>
          <TooltipTrigger asChild>
            <LinkComponent href={href}>
              <span className="w-full h-full flex justify-center items-center block">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={label ?? ""}
                    width={icon.size}
                    height={icon.size}
                    className="object-cover select-none touch-none w-full h-full"
                  />
                ) : (
                  label ?? index
                )}
              </span>
            </LinkComponent>
          </TooltipTrigger>
          {label != null && (
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}

export const DraggableGrid = {
  Root: DraggableGridRoot,
  Grid: DraggableGridGrid,
  Item: DraggableGridItem,
};

export { useDraggableGrid };
