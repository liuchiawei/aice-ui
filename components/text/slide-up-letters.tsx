"use client";

import * as motion from "motion/react-client";
import { Variants } from "motion/react";
import { cn } from "@/lib/utils";

export default function SlideUpLetters({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={cn("flex justify-center items-center", className)}
    >
      {text.split("").map((letter, index) => (
        <motion.div key={index} variants={variants} custom={index}>
          {letter}
        </motion.div>
      ))}
    </motion.div>
  );
}

const variants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number) => {
    const delay = i * 0.1; // 遅延時間の設定
    return {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay, type: "spring", duration: 0.8, bounce: 0.4 },
    };
  },
};
