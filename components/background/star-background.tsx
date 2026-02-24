"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

const TWO_PI = 2 * Math.PI;

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  phase: number;
}

export interface StarBackgroundProps {
  starCount?: number;
  twinkleSpeed?: number;
  starColor?: string;
  backgroundColor?: string;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
}

function initStars(width: number, height: number, count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.1  + Math.random() * 1.5,
      baseOpacity: 0.3 + Math.random() * 0.7,
      phase: Math.random() * TWO_PI,
    });
  }
  return stars;
}

export function StarBackground({
  starCount = 200,
  twinkleSpeed = 0.002,
  starColor = "255, 255, 255",
  backgroundColor = "transparent",
  className,
  containerClassName,
  children,
  style = {},
}: StarBackgroundProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const starsRef = useRef<Star[]>([]);
  const frameIdRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  const configRef = useRef({
    starCount,
    twinkleSpeed,
    starColor,
    backgroundColor,
  });

  useEffect(() => {
    configRef.current = {
      starCount,
      twinkleSpeed,
      starColor,
      backgroundColor,
    };
  }, [starCount, twinkleSpeed, starColor, backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    ctxRef.current = canvas.getContext("2d");

    function setSize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      sizeRef.current = { width, height };
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      starsRef.current = initStars(width, height, configRef.current.starCount);
    }

    function tick(t: number) {
      const ctx = ctxRef.current;
      const stars = starsRef.current;
      const { width, height } = sizeRef.current;
      const {
        twinkleSpeed: speed,
        starColor: color,
        backgroundColor: bg,
      } = configRef.current;

      if (!ctx || !width || !height) {
        frameIdRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const rgb = color.replace(/\s/g, "");
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const opacity =
          speed === 0
            ? star.baseOpacity
            : star.baseOpacity *
              (0.4 + 0.6 * (Math.sin(star.phase + t * speed) * 0.5 + 0.5));
        ctx.fillStyle = `rgba(${rgb}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, TWO_PI);
        ctx.fill();
      }

      frameIdRef.current = requestAnimationFrame(tick);
    }

    setSize();
    frameIdRef.current = requestAnimationFrame(tick);

    const observer = new ResizeObserver(() => {
      setSize();
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden",
        containerClassName,
      )}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 block w-full h-full", className)}
        style={{ backgroundColor }}
      />
      {children != null ? (
        <div className="absolute inset-0">{children}</div>
      ) : null}
    </div>
  );
}
