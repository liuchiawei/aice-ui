"use client";

import { useEffect, useState, useRef, startTransition } from "react";
import { cn } from "@/lib/utils";

/**
 * Display format for the timer.
 *
 * @example "hh:mm:ss"  → "01:23:45" (hours:minutes:seconds)
 * @example "mm:ss"     → "12:34" (minutes:seconds)
 * @example "mm:ss.xx"  → "12:34.56" (minutes:seconds.centiseconds, default)
 * @example "ss.xxx"    → "012.345" (seconds.milliseconds)
 * @example "ms"        → "12345" (raw milliseconds)
 *
 * Usage: <Timer format="hh:mm:ss" /> → "00:01:23"
 * Usage: <Timer format="ss.xxx" />   → "083.250"
 */
export type TimerFormat =
  | "hh:mm:ss"
  | "mm:ss"
  | "mm:ss.xx"
  | "ss.xxx"
  | "ms";

const DEFAULT_FORMAT: TimerFormat = "mm:ss.xx";

function formatElapsed(ms: number, format: TimerFormat): string {
  const totalSeconds = ms / 1000;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  switch (format) {
    case "hh:mm:ss": {
      const s = Math.floor(seconds);
      const h = hours.toString().padStart(2, "0");
      const m = minutes.toString().padStart(2, "0");
      const sec = s.toString().padStart(2, "0");
      return `${h}:${m}:${sec}`;
    }
    case "mm:ss": {
      const s = Math.floor(seconds);
      const m = minutes.toString().padStart(2, "0");
      const sec = s.toString().padStart(2, "0");
      return `${m}:${sec}`;
    }
    case "mm:ss.xx": {
      const m = minutes.toString().padStart(2, "0");
      const sec = (seconds % 60).toFixed(2);
      const padded = sec.padStart(5, "0");
      return `${m}:${padded}`;
    }
    case "ss.xxx": {
      const sec = (seconds % 60).toFixed(3);
      return sec.padStart(7, "0");
    }
    case "ms":
      return Math.floor(ms).toString();
    default:
      return formatElapsed(ms, DEFAULT_FORMAT);
  }
}

/** Interval (ms) to match format resolution: only setState when display can change. */
function getIntervalForFormat(format: TimerFormat): number {
  switch (format) {
    case "hh:mm:ss":
    case "mm:ss":
      return 1000;
    case "mm:ss.xx":
    case "ss.xxx":
    case "ms":
    default:
      return 10;
  }
}

export default function Timer({
  className,
  isStarted = true,
  format = DEFAULT_FORMAT,
}: {
  className?: string;
  /** When true, timer runs; when false, paused and current value is preserved. */
  isStarted?: boolean;
  format?: TimerFormat;
}) {
  const [display, setDisplay] = useState<string>(() =>
    formatElapsed(0, format)
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const lastDisplayRef = useRef<string>(formatElapsed(0, format));

  useEffect(() => {
    if (!isStarted) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        accumulatedRef.current += Date.now() - startTimeRef.current;
      }
      return;
    }

    startTimeRef.current = Date.now();
    const intervalMs = getIntervalForFormat(format);

    intervalRef.current = setInterval(() => {
      const elapsed = accumulatedRef.current + (Date.now() - startTimeRef.current);
      const next = formatElapsed(elapsed, format);
      if (next !== lastDisplayRef.current) {
        lastDisplayRef.current = next;
        startTransition(() => setDisplay(next));
      }
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        accumulatedRef.current += Date.now() - startTimeRef.current;
      }
    };
  }, [isStarted, format]);

  return (
    <div
      className={cn("select-none", className)}
      suppressHydrationWarning
    >
      {display}
    </div>
  );
}
