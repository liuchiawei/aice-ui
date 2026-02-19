"use client";

import { useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Timer from "@/components/ui-elements/timer";

export function TimerDemo() {
  const [isStarted, setIsStarted] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const handleRestart = () => setResetKey((k) => k + 1);

  return (
    <div className="flex flex-col items-center gap-6">
      <Timer
        key={resetKey}
        isStarted={isStarted}
        format="mm:ss.xx"
        className="text-3xl font-mono tabular-nums"
      />
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
import Timer from "@/components/ui-elements/timer";

export function TimerDemo() {
  const [isStarted, setIsStarted] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const handleRestart = () => setResetKey((k) => k + 1);

  return (
    <div className="flex flex-col items-center gap-6">
      <Timer
        key={resetKey}
        isStarted={isStarted}
        format="mm:ss.xx"
        className="text-3xl font-mono tabular-nums"
      />
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={() => setIsStarted(true)} disabled={isStarted} aria-label="Start / Resume">
          <Play className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => setIsStarted(false)} disabled={!isStarted} aria-label="Pause / Stop">
          <Pause className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleRestart} aria-label="Restart">
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </div>
  );
}`;
