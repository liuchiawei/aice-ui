"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "20, 72, 140",
  secondColor = "242, 61, 109",
  thirdColor = "152, 50, 166",
  fourthColor = "30, 164, 217",
  fifthColor = "242, 87, 73",
  pointerColor = "225, 160, 94",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);

  // Use refs for animation values to avoid re-renders
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Set CSS variables on container (local scope) instead of document.body
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    container.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    container.style.setProperty("--first-color", firstColor);
    container.style.setProperty("--second-color", secondColor);
    container.style.setProperty("--third-color", thirdColor);
    container.style.setProperty("--fourth-color", fourthColor);
    container.style.setProperty("--fifth-color", fifthColor);
    container.style.setProperty("--pointer-color", pointerColor);
    container.style.setProperty("--size", size);
    container.style.setProperty("--blending-value", blendingValue);
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  // RequestAnimationFrame loop for smooth animation
  useEffect(() => {
    if (!interactive || !interactiveRef.current) return;

    const animate = () => {
      if (!interactiveRef.current) return;

      // Easing interpolation (1/20 factor for smooth movement)
      currentXRef.current += (targetXRef.current - currentXRef.current) / 20;
      currentYRef.current += (targetYRef.current - currentYRef.current) / 20;

      // Apply transform directly without triggering React re-render
      interactiveRef.current.style.transform = `translate(${Math.round(
        currentXRef.current
      )}px, ${Math.round(currentYRef.current)}px)`;

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [interactive]);

  // Listen to window pointermove events (viewport coordinate system)
  useEffect(() => {
    if (!interactive) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (!containerRef.current) return;

      // Use container's bounding rect as fixed reference frame
      // This avoids feedback loop from the moving interactiveRef element
      const rect = containerRef.current.getBoundingClientRect();

      // Calculate target position relative to container
      // Note: interactiveRef uses -top-1/2 -left-1/2, so we need to adjust
      targetXRef.current = event.clientX - rect.left;
      targetYRef.current = event.clientY - rect.top;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [interactive]);

  const [isSafari, setIsSafari] = useState(() =>
    typeof navigator !== "undefined"
      ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      : false
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        // "h-svh w-full relative overflow-hidden top-0 left-0 right-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        "h-full w-full relative",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full min-h-svh w-full overflow-hidden blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center]`,
            `animate-first`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)]`,
            `animate-second`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-200px)]`,
            `animate-fourth`,
            `opacity-70`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth`,
            `opacity-100`
          )}
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70 pointer-events-none`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};
