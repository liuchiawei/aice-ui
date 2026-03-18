"use client";

import React, {
  createContext,
  useState,
  useCallback,
  use,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import ThreeDCard from "@/components/card/3d-card";

/** Inline flip container: two faces, CSS 3D transform. Does not own state; receives isFlipped/flipDirection from Root. */
function CardFlipContainer({
  isFlipped,
  flipDirection,
  containerClassName,
  front,
  back,
}: {
  isFlipped: boolean;
  flipDirection: "horizontal" | "vertical";
  containerClassName?: string;
  front: ReactNode;
  back: ReactNode;
}) {
  const isHorizontal = flipDirection === "horizontal";
  const rotate = isFlipped ? "180deg" : "0deg";
  const transformInner = isHorizontal
    ? { transform: `rotateY(${rotate})` }
    : { transform: `rotateX(${rotate})` };
  const transformBack = isHorizontal
    ? { transform: "rotateY(180deg)" }
    : { transform: "rotateX(180deg)" };

  return (
    <div
      className={cn("relative h-full w-full perspective-[1000px]", containerClassName)}
      style={{ overflow: "hidden" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-in-out transform-3d"
        style={transformInner}
      >
        <div
          className="absolute inset-0 backface-hidden"
          style={isHorizontal ? { transform: "rotateY(0deg)" } : { transform: "rotateX(0deg)" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0 backface-hidden"
          style={transformBack}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

/** Context value for flip state and actions. Injected by FlipCard.Root. */
interface FlipCardContextValue {
  isFlipped: boolean;
  flip: () => void;
  onFlip?: (flipped: boolean) => void;
}

/** Which face (front or back) the current subtree belongs to. */
type FlipCardSide = "front" | "back" | null;

const FlipCardContext = createContext<FlipCardContextValue | null>(null);
const FlipCardSideContext = createContext<FlipCardSide>(null);

/** Hook to access flip state and actions. Must be used within FlipCard.Root. */
export function useFlipCard() {
  const ctx = use(FlipCardContext);
  if (!ctx) {
    throw new Error("useFlipCard must be used within FlipCard.Root");
  }
  return ctx;
}

/** Root flip card wrapper. Manages flip state and CardFlipContainer. */
function FlipCardRoot({
  children,
  className,
  containerClassName,
  flipDirection = "horizontal",
  onFlip,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  flipDirection?: "horizontal" | "vertical";
  onFlip?: (flipped: boolean) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flip = useCallback(() => {
    setIsFlipped((prev) => {
      const next = !prev;
      onFlip?.(next);
      return next;
    });
  }, [onFlip]);

  const value: FlipCardContextValue = {
    isFlipped,
    flip,
    onFlip,
  };

  const childArray = React.Children.toArray(children);
  const [front, back] = [
    childArray[0] ?? <div />,
    childArray[1] ?? <div />,
  ];

  return (
    <FlipCardContext.Provider value={value}>
      <CardFlipContainer
        isFlipped={isFlipped}
        flipDirection={flipDirection}
        containerClassName={cn(containerClassName)}
        front={front}
        back={back}
      />
    </FlipCardContext.Provider>
  );
}

/** Front face slot. Renders the first visible side. */
function FlipCardFront({ children }: { children: ReactNode }) {
  return (
    <FlipCardSideContext.Provider value="front">
      {children}
    </FlipCardSideContext.Provider>
  );
}

/** Back face slot. Renders the second side shown when flipped. */
function FlipCardBack({ children }: { children: ReactNode }) {
  return (
    <FlipCardSideContext.Provider value="back">
      {children}
    </FlipCardSideContext.Provider>
  );
}

/** 3D perspective container. Wraps CardContainer for mouse-tracking tilt. */
function FlipCardContainer({
  children,
  className,
  containerClassName,
}: {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const ctx = use(FlipCardContext);
  const side = use(FlipCardSideContext);

  const opacityClass =
    ctx && side === "front"
      ? ctx.isFlipped
        ? "opacity-0"
        : ""
      : ctx && side === "back"
        ? ctx.isFlipped
          ? ""
          : "opacity-0"
        : "";

  const mergedContainerClassName = cn(
    "w-full h-full transition-all",
    opacityClass,
    containerClassName
  );

  return (
    <ThreeDCard.Container
      containerClassName={mergedContainerClassName}
      className={cn("w-full h-full", className)}
    >
      {children}
    </ThreeDCard.Container>
  );
}

/** Card surface with preserve-3d. Wraps CardBody. */
function FlipCardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ThreeDCard.Body
      className={cn(
        "h-96 w-96 transform-3d *:transform-3d",
        className
      )}
    >
      {children}
    </ThreeDCard.Body>
  );
}

/** 3D transform item. Wraps CardItem for translateZ/rotate effects. */
function FlipCardItem({
  as,
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: unknown;
}) {
  return (
    <ThreeDCard.Item
      as={
        as as
          | React.ElementType<React.PropsWithChildren<Record<string, unknown>>>
          | undefined
      }
      translateX={translateX}
      translateY={translateY}
      translateZ={translateZ}
      rotateX={rotateX}
      rotateY={rotateY}
      rotateZ={rotateZ}
      className={className}
      {...rest}
    >
      {children}
    </ThreeDCard.Item>
  );
}

const FlipCard = {
  Root: FlipCardRoot,
  Front: FlipCardFront,
  Back: FlipCardBack,
  Container: FlipCardContainer,
  Body: FlipCardBody,
  Item: FlipCardItem,
};

export { FlipCard };
