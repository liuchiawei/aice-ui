"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  cloneElement,
  Children,
  isValidElement,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** 0° = right, 90° = down, 180° = left, 270° = up (CSS/design convention) */
function angleToPosition(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  return { x, y };
}

const SPRING_SHOOTOUT = { stiffness: 800, damping: 24 };

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
interface SpeedDialContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  radius: number;
  spreadRangeAngle: number;
  directionAngle: number;
  itemCount: number;
  menuId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const SpeedDialContext = createContext<SpeedDialContextValue | null>(null);

function useSpeedDial(component: string) {
  const ctx = useContext(SpeedDialContext);
  if (!ctx) {
    throw new Error(`${component} must be used within SpeedDial.Root`);
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Trigger variants (cva)
// ---------------------------------------------------------------------------
const speedDialTriggerVariants = cva(
  "relative inline-flex items-center justify-center rounded-full shadow-lg transition-transform outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer z-10",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "size-16",
        sm: "size-12",
        lg: "size-20",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export interface SpeedDialRootProps {
  children: ReactNode;
  /** Total angle (degrees) the items spread over. e.g. 360 full circle, 180 half, 30 narrow. */
  spreadRangeAngle?: number;
  /** Direction of the fan: 0°=right, 90°=down, 180°=left, 270°=up. */
  directionAngle?: number;
  /** Distance from trigger to each item (px). */
  radius?: number;
  className?: string;
}

function SpeedDialRoot({
  children,
  spreadRangeAngle = 90,
  directionAngle = 90,
  radius = 120,
  className,
}: SpeedDialRootProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const childArray = Children.toArray(children);
  const itemCount = childArray.filter(
    (c) => isValidElement(c) && (c.type as unknown) === SpeedDialItem,
  ).length;

  const menuId = "speed-dial-menu";

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(target) && open) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("click", handleClickOutside, true);
      return () =>
        document.removeEventListener("click", handleClickOutside, true);
    }
  }, [open]);

  useEffect(() => {
    const handleFocusOut = (e: FocusEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(e.relatedTarget as Node) &&
        open
      ) {
        setOpen(false);
      }
    };
    if (open && rootRef.current) {
      rootRef.current.addEventListener("focusout", handleFocusOut);
      return () =>
        rootRef.current?.removeEventListener("focusout", handleFocusOut);
    }
  }, [open]);

  const value: SpeedDialContextValue = {
    open,
    setOpen,
    radius,
    spreadRangeAngle,
    directionAngle,
    itemCount,
    menuId,
    triggerRef,
  };

  const itemChildren: ReactNode[] = [];
  let triggerChild: ReactNode = null;
  const restChildren: ReactNode[] = [];
  let itemIndex = 0;
  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.type as unknown) === SpeedDialItem) {
      itemChildren.push(
        cloneElement(child as React.ReactElement<{ index: number }>, {
          index: itemIndex++,
        }),
      );
    } else if (
      isValidElement(child) &&
      (child.type as unknown) === SpeedDialTrigger
    ) {
      triggerChild = child;
    } else {
      restChildren.push(child);
    }
  });

  return (
    <SpeedDialContext.Provider value={value}>
      <div
        ref={rootRef}
        className={cn("relative", className)}
        role="group"
        aria-label="Speed dial menu"
      >
        {triggerChild}
        <AnimatePresence>
          {open && (
            <motion.div
              id={menuId}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { type: "spring", ...SPRING_SHOOTOUT },
              }}
              transition={{ duration: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              role="menu"
            >
              {itemChildren}
            </motion.div>
          )}
        </AnimatePresence>
        {restChildren}
      </div>
    </SpeedDialContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------
export interface SpeedDialTriggerProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof speedDialTriggerVariants> {
  children?: ReactNode;
}

function SpeedDialTrigger({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: SpeedDialTriggerProps) {
  const { open, setOpen, menuId, triggerRef } =
    useSpeedDial("SpeedDial.Trigger");

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const triggerAria = {
    "aria-haspopup": "menu" as const,
    "aria-expanded": open ? ("true" as const) : ("false" as const),
    "aria-controls": menuId,
    "aria-label": open ? "Close menu" : "Open menu",
  };

  return (
    <button
      ref={triggerRef}
      type="button"
      className={cn(speedDialTriggerVariants({ variant, size }), className)}
      onClick={() => setOpen((v) => !v)}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      {...triggerAria}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            {children ?? <X className="size-6" />}
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            {children ?? <Menu className="size-6" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Item (internal component for cloneElement check)
// ---------------------------------------------------------------------------
export interface SpeedDialItemProps {
  children: ReactNode;
  className?: string;
  /** Injected by SpeedDial.Root. */
  index?: number;
  onClick?: () => void;
}

/** size-12 = 48px; items 錨點為 bottom-right，需 offset 使中心落在 radial 位置上 */
const ITEM_HALF = 24;

function SpeedDialItemComponent({
  children,
  className,
  index = 0,
  onClick,
}: SpeedDialItemProps) {
  const { open, setOpen, radius, spreadRangeAngle, directionAngle, itemCount } =
    useSpeedDial("SpeedDial.Item");

  const angle =
    itemCount <= 1
      ? directionAngle
      : directionAngle -
        spreadRangeAngle / 2 +
        (index / Math.max(1, itemCount - 1)) * spreadRangeAngle;

  const centerPos = angleToPosition(angle, 0);
  const targetPos = angleToPosition(angle, radius);
  const centerX = centerPos.x + ITEM_HALF;
  const centerY = centerPos.y + ITEM_HALF;
  const targetX = targetPos.x + ITEM_HALF;
  const targetY = targetPos.y + ITEM_HALF;

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClick?.();
      close();
    },
    [onClick, close],
  );

  return (
    <motion.div
      role="menuitem"
      initial={{ opacity: 0, scale: 0, x: centerX, y: centerY }}
      animate={{
        opacity: open ? 1 : 0,
        scale: open ? 1 : 0,
        x: open ? targetX : centerX,
        y: open ? targetY : centerY,
      }}
      transition={{
        delay: open ? index * 0.03 : 0,
        ...(open
          ? { type: "tween" as const, duration: 0.2, ease: "easeOut" as const }
          : { type: "spring" as const, ...SPRING_SHOOTOUT }
        ),
      }}
      className={cn(
        "absolute bottom-0 right-0 flex items-center justify-center rounded-full size-12 shadow-lg transition-transform will-change-transform hover:scale-105 hover:shadow-xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
          close();
        }
      }}
      tabIndex={0}
    >
      {children}
    </motion.div>
  );
}

const SpeedDialItem = SpeedDialItemComponent;

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------
export const SpeedDial = {
  Root: SpeedDialRoot,
  Trigger: SpeedDialTrigger,
  Item: SpeedDialItem,
};

export { speedDialTriggerVariants };
