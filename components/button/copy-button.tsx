"use client";

import type { ComponentProps, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

export type CopyButtonProps = {
  value: string;
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  children?: ReactNode;
  tooltip?: string;
} & Omit<ComponentProps<typeof Button>, "onClick">;

const DEFAULT_TIMEOUT = 2000;

export function CopyButton({
  value,
  onCopy,
  onError,
  timeout = DEFAULT_TIMEOUT,
  children,
  className,
  size = "icon",
  variant = "ghost",
  tooltip = "Copy",
  ...props
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleCopy = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      onCopy?.();

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
        timeoutRef.current = null;
      }, timeout);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }, [value, onCopy, onError, timeout]);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const defaultContent =
    children === undefined ? (
      isCopied ? (
        <Check className="size-4 shrink-0" />
      ) : (
        <Copy className="size-4 shrink-0" />
      )
    ) : (
      children
    );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size={size}
          variant={variant}
          className={cn("shrink-0", className)}
          onClick={handleCopy}
          aria-label={tooltip}
          {...props}
        >
          {defaultContent}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
