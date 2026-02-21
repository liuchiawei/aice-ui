"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

export type PopUpItemTrigger = "scroll" | "hover" | "click";

export interface PopUpItemTransition {
  duration?: number;
  delay?: number;
  bounce?: number;
}

export interface PopUpItemViewport {
  amount?: number;
  threshold?: number;
  once?: boolean;
}

export interface PopUpItemProps {
  trigger?: PopUpItemTrigger;
  className?: string;
  contentClassName?: string;
  transition?: PopUpItemTransition;
  viewport?: PopUpItemViewport;
  children: React.ReactNode;
}

const defaultTransition = { duration: 1, delay: 0, bounce: 0.4 };
const hidden = { y: "200%", rotate: 0 };
const visible = { y: 0, rotate: -8 };

export default function PopUpItem({
  trigger = "scroll",
  className,
  contentClassName,
  transition: t,
  viewport = {},
  children,
}: PopUpItemProps) {
  const transition = { ...defaultTransition, ...t };
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const toggle = useCallback(() => setClicked((c) => !c), []);

  const viewportConfig = {
    amount: viewport.amount ?? 0.4,
    threshold: viewport.threshold,
    once: viewport.once ?? false, // play animation  every time element enters viewport(default)
  };

  const springTransition = {
    type: "spring" as const,
    bounce: transition.bounce,
    duration: transition.duration,
    delay: transition.delay,
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const useInViewResult = useInView(containerRef, {
    amount: viewportConfig.amount,
    once: viewportConfig.once,
  });

  const contentProps =
    trigger === "scroll"
      ? {
          initial: hidden,
          animate: useInViewResult ? visible : hidden,
          transition: springTransition,
        }
      : {
          initial: hidden,
          animate:
            (trigger === "click" ? clicked : hovered) ? visible : hidden,
          transition: springTransition,
        };

  return (
    <motion.div
      ref={trigger === "scroll" ? containerRef : undefined}
      className={cn(
        "flex justify-center items-center relative overflow-hidden",
        trigger === "click" && "cursor-pointer",
        className,
      )}
      {...(trigger === "hover"
        ? { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }
        : trigger === "click"
          ? {
              onClick: toggle,
              role: "button" as const,
              tabIndex: 0,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle();
                }
              },
            }
          : {})}
    >
      <motion.div {...contentProps} className={cn(contentClassName)}>
        {children}
      </motion.div>
    </motion.div>
  );
}
