"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export default function Timer({
  className,
  isFinished,
}: {
  className?: string;
  isFinished: boolean;
}) {
  const [time, setTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const formatTime = (time: number) => {
    const totalSeconds = time / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(2);
    return `${minutes.toString().padStart(2, "0")}:${seconds.padStart(5, "0")}`;
  };

  useEffect(() => {
    if (!isFinished) {
      // 開始時にタイマーを開始
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        setTime(elapsedTime);
      }, 10);
    } else if (timerRef.current) {
      // 終了時にタイマーを停止
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isFinished]);

  return <div className={cn("select-none", className)}>{formatTime(time)}</div>;
}
