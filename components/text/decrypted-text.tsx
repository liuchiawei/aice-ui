"use client";

import {
  createContext,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

// --- Helpers (outside component for stable refs) ---

function getNextIndex(
  revealedSet: Set<number>,
  textLength: number,
  revealDirection: "start" | "end" | "center"
): number {
  switch (revealDirection) {
    case "start":
      return revealedSet.size;
    case "end":
      return textLength - 1 - revealedSet.size;
    case "center": {
      const middle = Math.floor(textLength / 2);
      const offset = Math.floor(revealedSet.size / 2);
      const nextIndex =
        revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

      if (
        nextIndex >= 0 &&
        nextIndex < textLength &&
        !revealedSet.has(nextIndex)
      ) {
        return nextIndex;
      }
      for (let i = 0; i < textLength; i++) {
        if (!revealedSet.has(i)) return i;
      }
      return 0;
    }
    default:
      return revealedSet.size;
  }
}

function shuffleText(
  originalText: string,
  currentRevealed: Set<number>,
  availableChars: string[],
  useOriginalCharsOnly: boolean
): string {
  if (useOriginalCharsOnly) {
    const positions = originalText.split("").map((char, i) => ({
      char,
      isSpace: char === " ",
      index: i,
      isRevealed: currentRevealed.has(i),
    }));

    const nonSpaceChars = positions
      .filter((p) => !p.isSpace && !p.isRevealed)
      .map((p) => p.char);

    for (let i = nonSpaceChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nonSpaceChars[i], nonSpaceChars[j]] = [
        nonSpaceChars[j],
        nonSpaceChars[i],
      ];
    }

    let charIndex = 0;
    return positions
      .map((p) => {
        if (p.isSpace) return " ";
        if (p.isRevealed) return originalText[p.index];
        return nonSpaceChars[charIndex++];
      })
      .join("");
  } else {
    return originalText
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (currentRevealed.has(i)) return originalText[i];
        return availableChars[
          Math.floor(Math.random() * availableChars.length)
        ];
      })
      .join("");
  }
}

// --- Context ---

interface DecryptedTextContextValue {
  state: {
    isHovering: boolean;
    isScrambling: boolean;
    displayText: string;
  };
  actions: {
    setHovering: (v: boolean) => void;
  };
  meta: {
    containerRef: RefObject<HTMLSpanElement | null>;
    text: string;
    className: string;
    encryptedClassName: string;
  };
}

const DecryptedTextContext =
  createContext<DecryptedTextContextValue | null>(null);

// --- Provider ---

/**
 * Holds config and internal animation state. Only place that knows implementation
 * details (spring vs interval, refs vs state). Use for compound composition.
 */
interface DecryptedTextProviderProps {
  /** The final text to reveal after animation */
  text: string;
  /** Interval in ms between scramble updates (non-sequential mode) */
  speed?: number;
  /** Max shuffle cycles before revealing (non-sequential) */
  maxIterations?: number;
  /** Reveal one character at a time vs scramble then reveal all */
  sequential?: boolean;
  /** Order of reveal: start, end, or center */
  revealDirection?: "start" | "end" | "center";
  /** Use only chars from text for scramble */
  useOriginalCharsOnly?: boolean;
  /** Custom character set for scramble */
  characters?: string;
  /** Styles for revealed characters */
  className?: string;
  /** Styles for scrambled characters */
  encryptedClassName?: string;
  /** Wrapper element styles */
  parentClassName?: string;
  children: React.ReactNode;
}

function DecryptedTextProvider({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  children,
}: DecryptedTextProviderProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  const availableChars = useMemo(
    () =>
      useOriginalCharsOnly
        ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
        : characters.split(""),
    [text, characters, useOriginalCharsOnly]
  );

  const decoderSpring = useSpring(0, { stiffness: 8, damping: 4 });
  const outputRef = useRef<string>(text);
  const revealedRef = useRef<Set<number>>(new Set());
  const maxPositionRef = useRef(0);
  const cancelledRef = useRef(false);
  const currentIterationRef = useRef(0);
  const content = text.split("");

  const renderOutput = (str: string, revealed: Set<number>) => {
    if (!containerRef.current) return;
    const revealedClassName = cn(className);
    const scrambledClassName = cn(encryptedClassName);
    const html = str
      .split("")
      .map(
        (char, i) =>
          `<span class="${revealed.has(i) || !isScrambling || !isHovering ? revealedClassName : scrambledClassName}">${char}</span>`
      )
      .join("");
    containerRef.current.innerHTML = html;
  };

  useEffect(() => {
    cancelledRef.current = false;
    maxPositionRef.current = 0;
    currentIterationRef.current = 0;
    revealedRef.current = new Set();
    outputRef.current = text;
    setDisplayText(text);
    setIsScrambling(false);
    setIsHovering(false);
  }, [text]);

  useEffect(() => {
    if (reduceMotion) {
      outputRef.current = text;
      setDisplayText(text);
      setIsScrambling(false);
      renderOutput(text, new Set(text.split("").map((_, i) => i)));
      return;
    }

    if (!isHovering) {
      outputRef.current = text;
      setDisplayText(text);
      setIsScrambling(false);
      revealedRef.current = new Set();
      renderOutput(text, new Set(text.split("").map((_, i) => i)));
      return;
    }

    if (sequential) {
      setIsScrambling(true);
      const unsubscribe = decoderSpring.on("change", (value: number) => {
        if (cancelledRef.current) return;
        const rawPos = Math.floor(value);
        const pos = Math.min(content.length, Math.max(0, rawPos));
        maxPositionRef.current = Math.max(maxPositionRef.current, pos);

        const orderedRevealed = new Set<number>();
        for (let i = 0; i < maxPositionRef.current; i++) {
          orderedRevealed.add(
            getNextIndex(orderedRevealed, content.length, revealDirection)
          );
        }

        const next = shuffleText(
          text,
          orderedRevealed,
          availableChars,
          useOriginalCharsOnly
        );
        outputRef.current = next;
        revealedRef.current = orderedRevealed;
        renderOutput(next, orderedRevealed);
      });

      decoderSpring.jump(0);
      decoderSpring.set(content.length);

      return () => {
        cancelledRef.current = true;
        unsubscribe();
      };
    }

    setIsScrambling(true);
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      if (cancelledRef.current) return;

      currentIterationRef.current += 1;
      const prevRevealed = revealedRef.current;

      if (currentIterationRef.current >= maxIterations) {
        if (interval) clearInterval(interval);
        setIsScrambling(false);
        outputRef.current = text;
        setDisplayText(text);
        renderOutput(text, new Set(text.split("").map((_, i) => i)));
        return;
      }

      const next = shuffleText(text, prevRevealed, availableChars, useOriginalCharsOnly);
      outputRef.current = next;
      renderOutput(next, prevRevealed);
    }, speed);

    return () => {
      cancelledRef.current = true;
      if (interval) clearInterval(interval);
    };
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    useOriginalCharsOnly,
    reduceMotion,
    decoderSpring,
    content.length,
    availableChars,
  ]);

  const contextValue: DecryptedTextContextValue = {
    state: { isHovering, isScrambling, displayText },
    actions: { setHovering: setIsHovering },
    meta: {
      containerRef,
      text,
      className,
      encryptedClassName,
    },
  };

  return (
    <DecryptedTextContext.Provider value={contextValue}>
      {children}
    </DecryptedTextContext.Provider>
  );
}

// --- Compound Components ---

/** Wraps content and handles hover or view-based trigger */
function DecryptedTextRoot({
  children,
  className,
  animateOn = "hover",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  animateOn?: "view" | "hover";
  [key: string]: unknown;
}) {
  const ctx = use(DecryptedTextContext);
  if (!ctx) throw new Error("DecryptedText.Root must be inside DecryptedText.Provider");

  if (animateOn === "hover") {
    return (
      <DecryptedTextHoverRoot className={className} {...props}>
        {children}
      </DecryptedTextHoverRoot>
    );
  }
  return (
    <DecryptedTextViewRoot className={className} {...props}>
      {children}
    </DecryptedTextViewRoot>
  );
}

/** Wraps Root with onMouseEnter / onMouseLeave for hover trigger */
function DecryptedTextHoverRoot({
  children,
  className,
  parentClassName,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  parentClassName?: string;
  [key: string]: unknown;
}) {
  const ctx = use(DecryptedTextContext);
  if (!ctx) throw new Error("DecryptedText.HoverRoot must be inside DecryptedText.Provider");

  return (
    <motion.span
      className={cn("inline-block whitespace-pre-wrap", className, parentClassName)}
      onMouseEnter={() => ctx.actions.setHovering(true)}
      onMouseLeave={() => ctx.actions.setHovering(false)}
      {...props}
    >
      {children}
    </motion.span>
  );
}

/** Wraps Root with IntersectionObserver; triggers animation when in view */
function DecryptedTextViewRoot({
  children,
  className,
  parentClassName,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  parentClassName?: string;
  [key: string]: unknown;
}) {
  const ctx = use(DecryptedTextContext);
  const [hasAnimated, setHasAnimated] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);

  if (!ctx) throw new Error("DecryptedText.ViewRoot must be inside DecryptedText.Provider");

  useEffect(() => {
    setHasAnimated(false);
  }, [ctx.meta.text]);

  useEffect(() => {
    if (hasAnimated) return;
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ctx.actions.setHovering(true);
            setHasAnimated(true);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ctx.actions, hasAnimated]);

  return (
    <motion.span
      ref={rootRef}
      className={cn("inline-block whitespace-pre-wrap", className, parentClassName)}
      {...props}
    >
      {children}
    </motion.span>
  );
}

/** Renders the scrambled/revealed character grid via ref and innerHTML */
function DecryptedTextContent() {
  const ctx = use(DecryptedTextContext);
  if (!ctx) throw new Error("DecryptedText.Content must be inside DecryptedText.Provider");

  return (
    <>
      <span className="sr-only">{ctx.state.displayText}</span>
      <span aria-hidden ref={ctx.meta.containerRef as RefObject<HTMLSpanElement>} />
    </>
  );
}

// --- Main Component ---

/**
 * Scrambled text that reveals on hover or when in view.
 * Uses ref-based DOM updates for performance; supports sequential and batch modes.
 */
interface DecryptedTextProps {
  /** The final text to reveal after animation */
  text: string;
  /** Interval in ms between scramble updates (non-sequential mode) */
  speed?: number;
  /** Max shuffle cycles before revealing (non-sequential) */
  maxIterations?: number;
  /** Reveal one character at a time vs scramble then reveal all */
  sequential?: boolean;
  /** Order of reveal: start, end, or center */
  revealDirection?: "start" | "end" | "center";
  /** Use only chars from text for scramble */
  useOriginalCharsOnly?: boolean;
  /** Custom character set for scramble */
  characters?: string;
  /** Styles for revealed characters */
  className?: string;
  /** Styles for scrambled characters */
  encryptedClassName?: string;
  /** Wrapper element styles */
  parentClassName?: string;
  /** Trigger: hover or when in view */
  animateOn?: "view" | "hover";
  [key: string]: unknown;
}

/** Default export: convenience wrapper that composes Provider, Root, and Content. */
export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  ...props
}: DecryptedTextProps) {
  return (
    <DecryptedTextProvider
      text={text}
      speed={speed}
      maxIterations={maxIterations}
      sequential={sequential}
      revealDirection={revealDirection}
      useOriginalCharsOnly={useOriginalCharsOnly}
      characters={characters}
      className={className}
      parentClassName={parentClassName}
      encryptedClassName={encryptedClassName}
    >
      <DecryptedTextRoot parentClassName={parentClassName} animateOn={animateOn} {...props}>
        <DecryptedTextContent />
      </DecryptedTextRoot>
    </DecryptedTextProvider>
  );
}

DecryptedText.Provider = DecryptedTextProvider;
DecryptedText.Root = DecryptedTextRoot;
DecryptedText.HoverRoot = DecryptedTextHoverRoot;
DecryptedText.ViewRoot = DecryptedTextViewRoot;
DecryptedText.Content = DecryptedTextContent;
