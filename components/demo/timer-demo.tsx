"use client";

import { useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Timer, { type TimerFormat } from "@/components/text/timer";

const FORMAT_OPTIONS: { value: TimerFormat; label: string }[] = [
  { value: "hh:mm:ss", label: "HH:MM:SS" },
  { value: "mm:ss", label: "MM:SS" },
  { value: "mm:ss.xx", label: "MM:SS.XX" },
  { value: "ss.xxx", label: "SS.XXX" },
  { value: "ms", label: "MS" },
];

export function TimerDemo() {
  const [isStarted, setIsStarted] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [format, setFormat] = useState<TimerFormat>("mm:ss.xx");

  const handleRestart = () => setResetKey((k) => k + 1);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Format selector */}
      <Select value={format} onValueChange={(v) => setFormat(v as TimerFormat)}>
        <SelectTrigger className="w-[220px]" aria-label="Timer display format">
          <SelectValue placeholder="Format" />
        </SelectTrigger>
        <SelectContent>
          {FORMAT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Timer
        key={resetKey}
        isStarted={isStarted}
        format={format}
        className="text-3xl font-mono tabular-nums"
      />
      {/* Start/Pause/Restart buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsStarted(true)}
          disabled={isStarted}
          aria-label="Start / Resume"
        >
          <Play className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsStarted(false)}
          disabled={!isStarted}
          aria-label="Pause / Stop"
        >
          <Pause className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRestart}
          aria-label="Restart"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export const timerSource = `"use client";

import { useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Timer, { type TimerFormat } from "@/components/text/timer";

export function TimerDemo() {
  const [isStarted, setIsStarted] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [format, setFormat] = useState<TimerFormat>("mm:ss.xx");

  const handleRestart = () => setResetKey((k) => k + 1);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Format selector */}
      <Select value={format} onValueChange={(v) => setFormat(v as TimerFormat)}>
        <SelectTrigger className="w-[220px]" aria-label="Timer display format">
          <SelectValue placeholder="Format" />
        </SelectTrigger>
        <SelectContent>
          {FORMAT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Timer
        key={resetKey}
        isStarted={isStarted}
        format={format}
        className="text-3xl font-mono tabular-nums"
      />
      {/* Start/Pause/Restart buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsStarted(true)} disabled={isStarted}
          aria-label="Start / Resume"
        >
          <Play className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsStarted(false)} disabled={!isStarted}
          aria-label="Pause / Stop"
        >
          <Pause className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRestart}
          disabled={!isStarted}
          aria-label="Restart"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </div>
  );
}`;
