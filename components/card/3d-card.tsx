"use client";

import { cn } from "@/lib/utils";

import React, {
  createContext,
  useState,
  useContext,
  useRef,
} from "react";

/** Sensitivity divisor for tilt effect. Higher = less tilt. */
const TILT_SENSITIVITY = 25;

/** CSS perspective value for 3D space. */
const PERSPECTIVE = "1000px";

interface Card3DContextValue {
  isMouseEntered: boolean;
  setIsMouseEntered: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card3DContext = createContext<Card3DContextValue | undefined>(undefined);

/**
 * Root wrapper that enables 3D tilt on hover.
 * Tracks mouse position and provides hover state to children.
 *
 * @param containerClassName - Applied to the outer wrapper (centering, padding)
 * @param className - Applied to the tiltable inner div
 */
const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
    setIsMouseEntered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !rectRef.current) return;
    const { left, top, width, height } = rectRef.current;
    const x = (e.clientX - left - width / 2) / TILT_SENSITIVITY;
    const y = (e.clientY - top - height / 2) / TILT_SENSITIVITY;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (containerRef.current) {
      containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
    setIsMouseEntered(false);
  };

  const contextValue: Card3DContextValue = {
    isMouseEntered,
    setIsMouseEntered,
  };

  return (
    <Card3DContext.Provider value={contextValue}>
      <div
        className={cn(
          "py-20 flex items-center justify-center",
          containerClassName
        )}
        style={{ perspective: PERSPECTIVE }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </Card3DContext.Provider>
  );
};

/**
 * Content wrapper with 3D transform preserved.
 * Place your card content here.
 *
 * @param className - Customize size (default h-96 w-96) and layout
 */
const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Child element that moves/rotates in 3D when the card is hovered.
 *
 * @param translateX - X offset in px when hovered
 * @param translateY - Y offset in px when hovered
 * @param translateZ - Z offset (depth) in px when hovered
 * @param rotateX - X rotation in deg when hovered
 * @param rotateY - Y rotation in deg when hovered
 * @param rotateZ - Z rotation in deg when hovered
 * @param as - Render as a different element (e.g. "span")
 */
const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  style,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) => {
  const [isMouseEntered] = useMouseEnter();

  const transform = isMouseEntered
    ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    : "translateX(0) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";

  return (
    <Tag
      className={cn("w-fit transition duration-200 ease-linear", className)}
      style={{ ...style, transform }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/**
 * Hook that returns [isMouseEntered, setIsMouseEntered].
 * Must be used within CardContainer.
 */
const useMouseEnter = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const context = useContext(Card3DContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within CardContainer");
  }
  return [context.isMouseEntered, context.setIsMouseEntered];
};

const ThreeDCard = {
  Container: CardContainer,
  Body: CardBody,
  Item: CardItem,
  useMouseEnter,
};

export default ThreeDCard;