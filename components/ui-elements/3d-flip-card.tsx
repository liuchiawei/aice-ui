"use client";

import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/3d-card";
import ReactCardFlip from "react-card-flip";

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
  const ctx = useContext(FlipCardContext);
  if (!ctx) {
    throw new Error("useFlipCard must be used within FlipCard.Root");
  }
  return ctx;
}

/** Root flip card wrapper. Manages flip state and ReactCardFlip. */
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

  return (
    <FlipCardContext.Provider value={value}>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection={flipDirection}
        containerClassName={cn(containerClassName)}
      >
        {children}
      </ReactCardFlip>
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
  const ctx = useContext(FlipCardContext);
  const side = useContext(FlipCardSideContext);

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
    <CardContainer
      containerClassName={mergedContainerClassName}
      className={cn("w-full h-full", className)}
    >
      {children}
    </CardContainer>
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
    <CardBody
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </CardBody>
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
    <CardItem
      as={as}
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
    </CardItem>
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
