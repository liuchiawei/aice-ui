"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Base class for stroke-outline text layers (outline + motion stroke). */
const strokeOutlineTextClass =
  "fill-transparent stroke-gray-200 font-[helvetica] text-[5rem] font-bold dark:stroke-gray-800";
/** Base class for the gradient-masked text layer (stroke from gradient, no fill). */
const gradientTextClass =
  "fill-transparent font-[helvetica] text-[5rem] font-bold";

/**
 * Props for the Text Hover Effect component.
 * @see TextHoverEffect
 */
export interface TextHoverEffectProps {
  /** The text to display. Revealed with a cursor-following gradient and stroke animation on hover. */
  text: string;
  /**
   * Duration (seconds) for the radial mask to follow the cursor.
   * Use 0 for no transition (instant follow). Default: 0.
   */
  duration?: number;
  /** Optional CSS class for the root SVG container (e.g. width, height, margin). */
  className?: string;
  /** Optional CSS class merged into all text elements (e.g. font size, font family, stroke). */
  textClassName?: string;
}

/**
 * Text that reveals a cursor-following gradient and stroke animation on hover.
 * Use className for the SVG container; use textClassName to style the text (font, size, stroke).
 */
export const TextHoverEffect = ({
  text,
  duration,
  className,
  textClassName,
}: TextHoverEffectProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={cn(strokeOutlineTextClass, textClassName)}
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={cn(strokeOutlineTextClass, textClassName)}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className={cn(gradientTextClass, textClassName)}
      >
        {text}
      </text>
    </svg>
  );
};
