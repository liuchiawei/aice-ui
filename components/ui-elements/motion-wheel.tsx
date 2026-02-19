"use client";

import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

/** Minimum item shape: must have an id for keys and positioning. (slug: motion-wheel) */
export type MotionWheelItemBase = { id: string | number };

/** Context value for wheel state, actions, and config. Injected by MotionWheel.Root. */
interface MotionWheelContextValue<T extends MotionWheelItemBase> {
  state: {
    items: T[];
    currentIndex: number;
    wheelRotation: number;
    isAnimating: boolean;
  };
  actions: {
    goNext: () => void;
    goPrev: () => void;
    goToIndex: (index: number) => void;
  };
  meta: {
    radius: number;
    count: number;
    spring: { stiffness: number; damping: number; duration: number };
  };
}

const MotionWheelContext =
  createContext<MotionWheelContextValue<MotionWheelItemBase> | null>(null);

/**
 * Use: Access wheel state and actions. Must be used within MotionWheel.Root.
 * Returns { state, actions, meta } for the current wheel.
 * (slug: motion-wheel-hook)
 */
export function useMotionWheel<T extends MotionWheelItemBase>() {
  const ctx = useContext(
    MotionWheelContext,
  ) as MotionWheelContextValue<T> | null;
  if (!ctx) {
    throw new Error("useMotionWheel must be used within MotionWheel.Root");
  }
  return ctx;
}

/**
 * Use: Wrap the entire wheel. Pass `items` array and optional radius/spring/className.
 * Must wrap all other MotionWheel parts. Place as the outermost wrapper.
 * Props: items (required), radius?, spring?, className?, initialIndex?
 * (slug: motion-wheel-root)
 */
function MotionWheelRoot<T extends MotionWheelItemBase>({
  items,
  children,
  className,
  radius: radiusProp,
  spring = { stiffness: 120, damping: 25, duration: 0.5 },
  initialIndex = 0,
}: {
  items: T[];
  children: ReactNode;
  className?: string;
  radius?: number;
  spring?: { stiffness?: number; damping?: number; duration?: number };
  initialIndex?: number;
}) {
  const isMobile = useIsMobile();
  const radius = radiusProp ?? (isMobile ? 270 : 320);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  const count = items.length;
  const angleStep = count > 0 ? 360 / count : 0;

  const goNext = useCallback(() => {
    if (isAnimating || count === 0) return;
    setIsAnimating(true);
    setWheelRotation((prev) => prev + angleStep);
    setCurrentIndex((prev) => (prev - 1 + count) % count);
    setTimeout(() => setIsAnimating(false), 500);
  }, [angleStep, count, isAnimating]);

  const goPrev = useCallback(() => {
    if (isAnimating || count === 0) return;
    setIsAnimating(true);
    setWheelRotation((prev) => prev - angleStep);
    setCurrentIndex((prev) => (prev + 1) % count);
    setTimeout(() => setIsAnimating(false), 500);
  }, [angleStep, count, isAnimating]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isAnimating || count === 0) return;
      setIsAnimating(true);
      const rotationDiff = (currentIndex - index) * angleStep;
      setWheelRotation((prev) => prev + rotationDiff);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [angleStep, count, currentIndex, isAnimating],
  );

  const value = useMemo(
    (): MotionWheelContextValue<T> => ({
      state: {
        items,
        currentIndex,
        wheelRotation,
        isAnimating,
      },
      actions: { goNext, goPrev, goToIndex },
      meta: {
        radius,
        count,
        spring: {
          stiffness: spring.stiffness ?? 120,
          damping: spring.damping ?? 25,
          duration: spring.duration ?? 0.5,
        },
      },
    }),
    [
      items,
      currentIndex,
      wheelRotation,
      isAnimating,
      goNext,
      goPrev,
      goToIndex,
      radius,
      count,
      spring,
    ],
  );

  return (
    <MotionWheelContext.Provider
      value={value as MotionWheelContextValue<MotionWheelItemBase>}
    >
      <div
        className={cn(
          "w-full h-[840px] flex justify-center items-center relative overflow-hidden",
          className,
        )}
      >
        {children}
      </div>
    </MotionWheelContext.Provider>
  );
}

/**
 * Use: Optional decorative border circle. Place inside Root, typically behind the wheel.
 * Props: className?
 * (slug: motion-wheel-border)
 */
function MotionWheelBorder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-primary size-120 md:size-160 rounded-full z-0 pointer-events-none",
        className,
      )}
    />
  );
}

/**
 * Use: The rotating wheel container. Renders each item via children render function.
 * Place inside Root. Props: children(item, index) => ReactNode.
 * (slug: motion-wheel-wheel)
 */
function MotionWheelWheel<T extends MotionWheelItemBase>({
  children,
}: {
  children: (item: T, index: number) => ReactNode;
}) {
  const { state, meta } = useMotionWheel<T>();

  return (
    <motion.div
      className="w-full h-full relative"
      animate={{ rotate: state.wheelRotation }}
      transition={{
        type: "spring",
        stiffness: meta.spring.stiffness,
        damping: meta.spring.damping,
        duration: meta.spring.duration,
      }}
    >
      <AnimatePresence mode="wait">
        {state.items.map((item, index) => (
          <React.Fragment key={item.id}>{children(item, index)}</React.Fragment>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Use: Wraps a single carousel item. Place inside MotionWheel.Wheel's render function.
 * Handles position, scale, zIndex. Pass card content as children.
 * Props: item (required), index (required), children (required).
 * (slug: motion-wheel-item)
 */
function MotionWheelItem<T extends MotionWheelItemBase>({
  item,
  index,
  children,
}: {
  item: T;
  index: number;
  children: ReactNode;
}) {
  const { state, meta } = useMotionWheel<T>();
  const prevRotationRef = useRef(0);
  const isCurrent = state.items[state.currentIndex]?.id === item.id;
  const position = index - state.currentIndex;
  const angle = position * (360 / meta.count);
  const x = isCurrent ? 0 : Math.sin((angle * Math.PI) / 180) * meta.radius;
  const y = isCurrent ? 0 : -Math.cos((angle * Math.PI) / 180) * meta.radius;
  const scale = isCurrent ? 1 : 0.4;
  const zIndex = isCurrent ? 50 : 5 - Math.abs(position);

  const rawTarget = isCurrent ? -state.wheelRotation : angle;
  const prev = prevRotationRef.current;
  const cardRotation = isCurrent
    ? // Current item: counteract parent wheel rotation so it stays upright (0°)
      (() => {
        const n = Math.round((prev - rawTarget) / 360);
        return rawTarget + n * 360;
      })()
    : // Other items: maintain their original angle
      angle;
  prevRotationRef.current = cardRotation;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ x, y, scale, rotate: cardRotation, opacity: 1 }}
      animate={{ x, y, scale, rotate: cardRotation, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: meta.spring.stiffness,
        damping: meta.spring.damping,
        duration: meta.spring.duration,
      }}
      style={{ zIndex }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Use: Prev/Next navigation buttons. Place inside Root, typically at wheel sides.
 * Props: className?, prevClassName?, nextClassName?
 * (slug: motion-wheel-navigation)
 */
function MotionWheelNavigation({
  className,
  prevClassName,
  nextClassName,
}: {
  className?: string;
  prevClassName?: string;
  nextClassName?: string;
}) {
  const { state, actions } = useMotionWheel();

  return (
    <div
      className={cn(
        "flex justify-between absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
        className,
      )}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={actions.goPrev}
        disabled={state.isAnimating}
        className={cn(
          "size-12 rounded-full hover:bg-primary hover:text-background",
          prevClassName,
        )}
      >
        <ChevronLeft className="size-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={actions.goNext}
        disabled={state.isAnimating}
        className={cn(
          "size-12 rounded-full hover:bg-primary hover:text-background",
          nextClassName,
        )}
      >
        <ChevronRight className="size-6" />
      </Button>
    </div>
  );
}

/**
 * Use: Dot indicators for direct index navigation. Place inside Root, typically at bottom.
 * Props: className?
 * (slug: motion-wheel-dots)
 */
function MotionWheelDots({ className }: { className?: string }) {
  const { state, actions } = useMotionWheel();
  const currentItem = state.items[state.currentIndex];

  return (
    <div
      className={cn(
        "absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20",
        className,
      )}
    >
      {state.items.map((item, index) => (
        <button
          key={item.id}
          title={`Go to ${index + 1}`}
          onClick={() => actions.goToIndex(index)}
          className={cn(
            "size-3 rounded-full transition-all duration-300 cursor-pointer",
            currentItem?.id === item.id
              ? "bg-accent scale-125"
              : "bg-white/50 hover:bg-primary",
          )}
        />
      ))}
    </div>
  );
}

/**
 * Use: Bottom panel showing current item info. Place inside Root.
 * Pass children as function (item) => ReactNode to customize, or use default slot.
 * Props: children?: (item) => ReactNode, className?
 * (slug: motion-wheel-center-info)
 */
function MotionWheelCenterInfo<T extends MotionWheelItemBase>({
  children,
  className,
}: {
  children?: (item: T) => ReactNode;
  className?: string;
}) {
  const { state } = useMotionWheel<T>();
  const currentItem = state.items[state.currentIndex];

  if (!currentItem) return null;

  return (
    <motion.div
      className={cn(
        "absolute bottom-16 left-1/2 -translate-x-1/2 z-20 py-3 px-6 text-center bg-card/[0.3] backdrop-blur-xs rounded-xl shadow-2xl",
        className,
      )}
      key={state.wheelRotation}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children ? children(currentItem) : null}
    </motion.div>
  );
}

const MotionWheel = {
  Root: MotionWheelRoot,
  Border: MotionWheelBorder,
  Wheel: MotionWheelWheel,
  Item: MotionWheelItem,
  Navigation: MotionWheelNavigation,
  Dots: MotionWheelDots,
  CenterInfo: MotionWheelCenterInfo,
};

export { MotionWheel };
