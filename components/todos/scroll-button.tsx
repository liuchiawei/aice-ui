"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ArrowUpToLine,
  ArrowDownToLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ScrollDirection = "up" | "down" | "left" | "right" | "top" | "bottom";

type ButtonVariant =
  | "outline"
  | "ghost"
  | "default"
  | "secondary"
  | "destructive"
  | "link";

interface ScrollButtonState {
  scrollTop: number;
  scrollX: number;
}

interface ScrollButtonActions {
  scrollTo: (direction: ScrollDirection) => void;
}

interface ScrollButtonContextValue {
  state: ScrollButtonState;
  actions: ScrollButtonActions;
}

const ScrollButtonContext = createContext<ScrollButtonContextValue | null>(
  null,
);

function useScrollButton() {
  const ctx = useContext(ScrollButtonContext);
  if (!ctx) {
    throw new Error(
      "ScrollButton components must be used within ScrollButton.Provider",
    );
  }
  return ctx;
}

// Provider: holds scroll state, consumers compose around it
function ScrollButtonProvider({ children }: { children: ReactNode }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
      setScrollX(window.scrollX ?? window.pageXOffset);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((direction: ScrollDirection) => {
    const vp = window.visualViewport;
    if (!vp) return;

    switch (direction) {
      case "up":
        window.scrollTo({
          top: window.scrollY - vp.height,
          behavior: "smooth",
        });
        break;
      case "down":
        window.scrollTo({
          top: window.scrollY + vp.height,
          behavior: "smooth",
        });
        break;
      case "left":
        window.scrollTo({
          left: window.scrollX - vp.width,
          behavior: "smooth",
        });
        break;
      case "right":
        window.scrollTo({
          left: window.scrollX + vp.width,
          behavior: "smooth",
        });
        break;
      case "top":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "bottom":
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        break;
    }
  }, []);

  const value: ScrollButtonContextValue = {
    state: { scrollTop, scrollX },
    actions: { scrollTo },
  };

  return (
    <ScrollButtonContext.Provider value={value}>
      {children}
    </ScrollButtonContext.Provider>
  );
}

// Internal trigger: receives direction and shared props
interface ScrollButtonTriggerProps {
  direction: ScrollDirection;
  variant?: ButtonVariant;
  className?: string;
  tooltip?: string;
  icon: ReactNode;
  children?: ReactNode;
}

function ScrollButtonTrigger({
  direction,
  variant = "outline",
  className = "",
  tooltip,
  icon,
  children,
}: ScrollButtonTriggerProps) {
  const { actions } = useScrollButton();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => actions.scrollTo(direction)}
          variant={variant}
          className={cn("group cursor-pointer", className)}
        >
          {icon}
          {children}
        </Button>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}

function getIconClassName(
  direction: ScrollDirection,
  iconClassName?: string
): string {
  const iconVariants = {
    "size-4 transition-transform duration-300": true,
    "group-hover:-translate-y-0.5": direction === "up" || direction === "top",
    "group-hover:translate-y-0.5": direction === "down" || direction === "bottom",
    "group-hover:-translate-x-0.5": direction === "left",
    "group-hover:translate-x-0.5": direction === "right",
  };
  return cn(iconVariants, iconClassName);
}

// Explicit variant components – self-documenting, no mode props
interface VariantProps {
  variant?: ButtonVariant;
  className?: string;
  iconClassName?: string;
  tooltip?: string;
  children?: ReactNode;
}

function ScrollButtonDown({
  variant,
  className,
  iconClassName,
  tooltip = "Scroll down",
  children,
}: VariantProps) {
  return (
    <ScrollButtonProvider>
      <ScrollButtonTrigger
        direction="down"
        variant={variant}
        className={className}
        tooltip={tooltip}
        icon={<ArrowDown className={getIconClassName("down", iconClassName)} />}
      >
        {children}
      </ScrollButtonTrigger>
    </ScrollButtonProvider>
  );
}

function ScrollButtonUp({
  variant,
  className,
  iconClassName,
  tooltip = "Scroll up",
  children,
}: VariantProps) {
  return (
    <ScrollButtonProvider>
      <ScrollButtonTrigger
        direction="up"
        variant={variant}
        className={className}
        tooltip={tooltip}
        icon={<ArrowUp className={getIconClassName("up", iconClassName)} />}
      >
        {children}
      </ScrollButtonTrigger>
    </ScrollButtonProvider>
  );
}

function ScrollButtonLeft({
  variant,
  className,
  iconClassName,
  tooltip = "Scroll left",
  children,
}: VariantProps) {
  return (
    <ScrollButtonProvider>
      <ScrollButtonTrigger
        direction="left"
        variant={variant}
        className={className}
        tooltip={tooltip}
        icon={<ArrowLeft className={getIconClassName("left", iconClassName)} />}
      >
        {children}
      </ScrollButtonTrigger>
    </ScrollButtonProvider>
  );
}

function ScrollButtonRight({
  variant,
  className,
  iconClassName,
  tooltip = "Scroll right",
  children,
}: VariantProps) {
  return (
    <ScrollButtonProvider>
      <ScrollButtonTrigger
        direction="right"
        variant={variant}
        className={className}
        tooltip={tooltip}
        icon={<ArrowRight className={getIconClassName("right", iconClassName)} />}
      >
        {children}
      </ScrollButtonTrigger>
    </ScrollButtonProvider>
  );
}

function ScrollButtonTop({
  variant,
  className,
  iconClassName,
  tooltip = "Scroll to top",
  children,
}: VariantProps) {
  return (
    <ScrollButtonProvider>
      <ScrollButtonTrigger
        direction="top"
        variant={variant}
        className={className}
        tooltip={tooltip}
        icon={<ArrowUpToLine className={getIconClassName("top", iconClassName)} />}
      >
        {children}
      </ScrollButtonTrigger>
    </ScrollButtonProvider>
  );
}

function ScrollButtonBottom({
  variant,
  className,
  iconClassName,
  tooltip = "Scroll to bottom",
  children,
}: VariantProps) {
  return (
    <ScrollButtonProvider>
      <ScrollButtonTrigger
        direction="bottom"
        variant={variant}
        className={className}
        tooltip={tooltip}
        icon={<ArrowDownToLine className={getIconClassName("bottom", iconClassName)} />}
      >
        {children}
      </ScrollButtonTrigger>
    </ScrollButtonProvider>
  );
}

// Compound component API
export const ScrollButton = {
  Provider: ScrollButtonProvider,
  Down: ScrollButtonDown,
  Up: ScrollButtonUp,
  Left: ScrollButtonLeft,
  Right: ScrollButtonRight,
  Top: ScrollButtonTop,
  Bottom: ScrollButtonBottom,
};

// Default export for backward compatibility – maps to ScrollButton.Down
export default ScrollButton.Down;
