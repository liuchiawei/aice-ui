// AnimatedCounter, a component that animates a number from a starting number to a target number.
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate } from "motion/react";
import { cn } from "@/lib/utils";

export default function AnimatedCounter({
  value, // The number to animate to
  from = 0, // The starting number, default is 0
  className,
  speed = 0.8, // The speed of the animation, default is 0.8
}: {
  value: number;
  from?: number;
  className?: string;
  speed?: number;
}) {
  const nodeRef = useRef<HTMLParagraphElement>(null);
  const [isInView, setIsInView] = useState(false);
  const to = Number(value);

  useEffect(() => {
    const currentNode = nodeRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 },
    );

    if (currentNode) observer.observe(currentNode);
    return () => {
      if (currentNode) observer.unobserve(currentNode);
    };
  }, []);

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: speed,
        onUpdate: (current) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(current).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, speed]);

  return (
    <motion.p
      ref={nodeRef}
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    />
  );
}
