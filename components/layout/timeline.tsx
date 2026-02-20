"use client";

import * as React from "react";
import {
  createContext,
  memo,
  useMemo,
  useEffect,
  useRef,
  useState,
  useContext,
  cloneElement,
  isValidElement,
  type ReactNode,
} from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Type for useScroll offset (framer-motion expects specific literal unions, not [string, string]). */
type ScrollOffsetForUseScroll = NonNullable<
  NonNullable<Parameters<typeof useScroll>[0]>["offset"]
>;

export interface TimelineScrollAxisOptions {
  /** Enable scroll-driven axis fill effect. Default false. */
  enabled?: boolean;
  /** useScroll offset: [start, end]. Default ["start 10%", "end 50%"]. */
  offset?: [string, string];
}

export interface TimelineItemData {
  date: Date | string;
  title: string;
  description?: string | React.ReactNode;
  id?: string;
}

/** @deprecated Use TimelineItemData. Kept for backward compatibility. */
export type TimelineItem = TimelineItemData;

interface TimelineContextValue {
  scrollAxisConfig: { enabled: boolean; offset: [string, string] };
  trackHeight: number;
  heightTransform: MotionValue<number> | null;
  opacityTransform: MotionValue<number> | null;
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

function useTimelineContext(component: string) {
  const ctx = useContext(TimelineContext);
  if (!ctx) {
    throw new Error(
      `${component} must be used within Timeline.Root or Timeline.Provider`
    );
  }
  return ctx;
}

function formatDate(date: Date | string): { year: string; monthDay: string } {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) {
    return { year: "Invalid", monthDay: "Date" };
  }
  const year = String(dateObj.getFullYear());
  const month = String(dateObj.getMonth() + 1);
  const day = String(dateObj.getDate());
  return { year, monthDay: `${month}月${day}日` };
}

function normalizeScrollAxis(
  scrollAxis?: boolean | TimelineScrollAxisOptions
): { enabled: boolean; offset: [string, string] } {
  if (scrollAxis === undefined || scrollAxis === false) {
    return { enabled: false, offset: ["start 10%", "end 50%"] };
  }
  if (scrollAxis === true) {
    return { enabled: true, offset: ["start 10%", "end 50%"] };
  }
  return {
    enabled: scrollAxis.enabled ?? true,
    offset: scrollAxis.offset ?? ["start 10%", "end 50%"],
  };
}

// ---------------------------------------------------------------------------
// Timeline.Provider — provides context and minimal wrapper (refs attached for scroll/line).
// Use when you want full control over layout but still need scroll axis + Timeline.Line.
// ---------------------------------------------------------------------------
interface TimelineProviderProps {
  children: ReactNode;
  className?: string;
  scrollAxis?: boolean | TimelineScrollAxisOptions;
}

function TimelineProvider({ children, className, scrollAxis: scrollAxisProp }: TimelineProviderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);

  const scrollAxisConfig = useMemo(
    () => normalizeScrollAxis(scrollAxisProp),
    [scrollAxisProp]
  );

  useEffect(() => {
    if (!scrollAxisConfig.enabled || !trackRef.current) return;
    const el = trackRef.current;
    const observer = new ResizeObserver(() => {
      setTrackHeight(el.getBoundingClientRect().height);
    });
    observer.observe(el);
    setTrackHeight(el.getBoundingClientRect().height);
    return () => observer.disconnect();
  }, [scrollAxisConfig.enabled]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollAxisConfig.offset as ScrollOffsetForUseScroll,
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, trackHeight]
  );
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const value = useMemo<TimelineContextValue>(
    () => ({
      scrollAxisConfig,
      trackHeight,
      heightTransform: scrollAxisConfig.enabled ? heightTransform : null,
      opacityTransform: scrollAxisConfig.enabled ? opacityTransform : null,
    }),
    [scrollAxisConfig, trackHeight, heightTransform, opacityTransform]
  );

  const childArray = React.Children.toArray(children);
  const itemCount = childArray.filter(isTimelineItemChild).length;
  let itemIndex = 0;
  const renderedChildren = childArray.map((child) => {
    if (isTimelineItemChild(child)) {
      const index = itemIndex++;
      return cloneElement(child, {
        index,
        isLast: index === itemCount - 1,
      } as Partial<TimelineItemProps>);
    }
    return child;
  });

  return (
    <TimelineContext.Provider value={value}>
      <div ref={containerRef} className={cn("w-full", className)}>
        <div ref={trackRef} className="relative">
          {renderedChildren}
        </div>
      </div>
    </TimelineContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Timeline.Root — container + provider. Renders track div, injects index/isLast into Items, optional Line.
// ---------------------------------------------------------------------------
interface TimelineRootProps {
  children: ReactNode;
  className?: string;
  scrollAxis?: boolean | TimelineScrollAxisOptions;
}

function isTimelineItemChild(child: React.ReactNode): child is React.ReactElement & { type: typeof TimelineItem } {
  return isValidElement(child) && (child.type as unknown) === TimelineItem;
}

function TimelineRoot({ children, className, scrollAxis: scrollAxisProp }: TimelineRootProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);

  const scrollAxisConfig = useMemo(
    () => normalizeScrollAxis(scrollAxisProp),
    [scrollAxisProp]
  );

  useEffect(() => {
    if (!scrollAxisConfig.enabled || !trackRef.current) return;
    const el = trackRef.current;
    const observer = new ResizeObserver(() => {
      setTrackHeight(el.getBoundingClientRect().height);
    });
    observer.observe(el);
    setTrackHeight(el.getBoundingClientRect().height);
    return () => observer.disconnect();
  }, [scrollAxisConfig.enabled]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollAxisConfig.offset as ScrollOffsetForUseScroll,
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, trackHeight]
  );
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const contextValue = useMemo<TimelineContextValue>(
    () => ({
      scrollAxisConfig,
      trackHeight,
      heightTransform: scrollAxisConfig.enabled ? heightTransform : null,
      opacityTransform: scrollAxisConfig.enabled ? opacityTransform : null,
    }),
    [scrollAxisConfig, trackHeight, heightTransform, opacityTransform]
  );

  const childArray = React.Children.toArray(children);
  const itemCount = childArray.filter(isTimelineItemChild).length;
  let itemIndex = 0;

  const renderedChildren = childArray.map((child) => {
    if (isTimelineItemChild(child)) {
      const index = itemIndex++;
      const isLast = index === itemCount - 1;
      return cloneElement(child, { index, isLast } as Partial<TimelineItemProps>);
    }
    return child;
  });

  return (
    <TimelineContext.Provider value={contextValue}>
      <div className={cn("w-full", className)} ref={containerRef}>
        <div ref={trackRef} className="relative">
          {renderedChildren}
          {scrollAxisConfig.enabled && trackHeight > 0 && (
            <TimelineLine
              trackHeight={trackHeight}
              heightTransform={heightTransform}
              opacityTransform={opacityTransform}
            />
          )}
        </div>
      </div>
    </TimelineContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Timeline.Line — scroll-driven axis. Used internally by Root or composed explicitly.
// ---------------------------------------------------------------------------
interface TimelineLineProps {
  trackHeight?: number;
  heightTransform?: MotionValue<number>;
  opacityTransform?: MotionValue<number>;
}

function TimelineLineInternal({
  trackHeight: heightProp,
  heightTransform: heightPropTransform,
  opacityTransform: opacityPropTransform,
}: TimelineLineProps) {
  const ctx = useContext(TimelineContext);
  const trackHeight = heightProp ?? ctx?.trackHeight ?? 0;
  const heightTransform = heightPropTransform ?? ctx?.heightTransform;
  const opacityTransform = opacityPropTransform ?? ctx?.opacityTransform;
  const enabled = ctx?.scrollAxisConfig.enabled ?? (heightProp != null && heightProp > 0);

  if (!enabled || trackHeight <= 0 || !heightTransform || !opacityTransform) {
    return null;
  }

  return (
    <div
      style={{ height: trackHeight }}
      className="absolute left-[9.5rem] md:left-[12rem] top-0 -translate-x-1/2 overflow-hidden w-[2px] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
      aria-hidden
    >
      <div className="absolute inset-0 w-full bg-muted" />
      <motion.div
        style={
          {
            height: heightTransform,
            opacity: opacityTransform,
          } as unknown as React.CSSProperties
        }
        className="absolute inset-x-0 top-0 w-full bg-primary/80 rounded-full"
      />
    </div>
  );
}

function TimelineLine(props: TimelineLineProps) {
  return <TimelineLineInternal {...props} />;
}

// ---------------------------------------------------------------------------
// Timeline.Item — single entry: sticky date, dot/connector, content (Card or children).
// ---------------------------------------------------------------------------
interface TimelineItemProps {
  date: Date | string;
  title?: string;
  description?: string | React.ReactNode;
  children?: ReactNode;
  className?: string;
  /** Injected by Timeline.Root via cloneElement. */
  index?: number;
  /** Injected by Timeline.Root via cloneElement. */
  isLast?: boolean;
}

const TimelineItemComponent = memo(function TimelineItemComponent({
  date,
  title,
  description,
  children,
  className,
  isLast = true,
}: TimelineItemProps) {
  const formattedDate = useMemo(() => formatDate(date), [date]);
  const content =
    children !== undefined ? (
      children
    ) : title !== undefined ? (
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        </CardHeader>
        {description != null && (
          <CardContent>
            <CardDescription className="text-sm md:text-base leading-relaxed">
              {description}
            </CardDescription>
          </CardContent>
        )}
      </Card>
    ) : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative flex gap-4 md:gap-6", className)}
    >
      <div className="flex-shrink-0 w-32 md:w-40">
        <div className="sticky top-4 z-10 flex flex-col">
          <time
            className="flex flex-col text-foreground"
            dateTime={
              typeof date === "string" ? date : (date as Date).toISOString()
            }
          >
            <span className="text-4xl md:text-5xl font-bold leading-tight">
              {formattedDate.year}
            </span>
            <span className="text-md md:text-lg font-thin tracking-widest leading-tight mt-1 text-muted-foreground">
              {formattedDate.monthDay}
            </span>
          </time>
        </div>
      </div>

      <div className="relative flex flex-col items-center flex-shrink-0 w-4 border border-red-500">
        {/* Timeline Dot */}
        <div className="relative z-10 size-4 rounded-full bg-secondary border-2" />
        {/* Timeline Line extending down to next item */}
        {!isLast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 bottom-0" />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex-1 pb-8 md:pb-12"
      >
        {content}
      </motion.div>
    </motion.div>
  );
});

TimelineItemComponent.displayName = "TimelineItemComponent";

function TimelineItem(props: TimelineItemProps) {
  return <TimelineItemComponent {...props} />;
}

// ---------------------------------------------------------------------------
// Backward-compatible Timeline (items + className + scrollAxis)
// ---------------------------------------------------------------------------
interface TimelineProps {
  items: TimelineItemData[];
  className?: string;
  scrollAxis?: boolean | TimelineScrollAxisOptions;
}

function TimelineLegacy({ items, className, scrollAxis }: TimelineProps) {
  return (
    <Timeline.Root className={className} scrollAxis={scrollAxis}>
      {items.map((item, index) => (
        <Timeline.Item
          key={item.id ?? index}
          date={item.date}
          title={item.title}
          description={item.description}
        />
      ))}
    </Timeline.Root>
  );
}

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------
export const Timeline = Object.assign(TimelineLegacy, {
  Root: TimelineRoot,
  Provider: TimelineProvider,
  Item: TimelineItem,
  Line: TimelineLine,
});
