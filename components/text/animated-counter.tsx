// AnimatedCounter, a component that animates a number from a starting number to a target number.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, animate } from "motion/react";
import { cn } from "@/lib/utils";

export type AnimatedCounterTrigger = "enter" | "hover" | "whileInView";

export default function AnimatedCounter({
  value,
  from = 0,
  className,
  speed = 0.8,
  trigger = "enter",
}: {
  value: number;
  from?: number;
  className?: string;
  speed?: number;
  /** When to run the animation: "enter" = when first entering view, "whileInView" = each time entering view, "hover" = on hover */
  trigger?: AnimatedCounterTrigger;
}) {
  const nodeRef = useRef<HTMLParagraphElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const to = Number(value);
  const useViewport = trigger === "enter" || trigger === "whileInView";

  const runAnimation = useCallback(() => {
    if (!nodeRef.current) return;
    const controls = animate(from, to, {
      duration: speed,
      onUpdate: (current) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.round(current).toString();
        }
      },
    });
    return controls;
  }, [from, to, speed]);

  const resetToFrom = useCallback(() => {
    if (nodeRef.current) {
      nodeRef.current.textContent = Math.round(from).toString();
    }
  }, [from]);

  // Viewport-based triggers (enter, whileInView)
  useEffect(() => {
    if (!useViewport) return;
    const currentNode = nodeRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
        } else if (trigger === "whileInView") {
          setShouldAnimate(false);
          resetToFrom();
        }
      },
      { threshold: 0.1 },
    );

    if (currentNode) observer.observe(currentNode);
    return () => {
      if (currentNode) observer.unobserve(currentNode);
    };
  }, [useViewport, trigger, resetToFrom]);

  // Run animation when triggered (viewport modes)
  useEffect(() => {
    if (useViewport && shouldAnimate && nodeRef.current) {
      const controls = runAnimation();
      return () => controls?.stop();
    }
  }, [useViewport, shouldAnimate, runAnimation]);

  const handleMouseEnter = useCallback(() => {
    if (trigger === "hover") runAnimation();
  }, [trigger, runAnimation]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === "hover") resetToFrom();
  }, [trigger, resetToFrom]);

  // Hover mode: set initial value on mount
  useEffect(() => {
    if (trigger === "hover" && nodeRef.current) {
      nodeRef.current.textContent = Math.round(from).toString();
    }
  }, [trigger, from]);

  const isVisible = trigger === "hover" ? true : shouldAnimate;

  return (
    <motion.p
      ref={nodeRef}
      className={cn(trigger === "hover" && "cursor-default", className)}
      initial={{ opacity: trigger === "hover" ? 1 : 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
