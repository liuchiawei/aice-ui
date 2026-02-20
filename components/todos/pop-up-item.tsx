"use client"
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { cn } from "@/lib/utils";

// TODO:
// 元件化: make it a reusable component under vercel-composition-pattern.
// 增加控制項: add Props to control the component's behavior. like when to start the animation (hover/whileInView/Click, etc.), duration, delay, animation type(spring/ease/linear/etc.), className, etc.

export default function PopUpItem({ emoji }: { emoji: string }) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.4 }}
      className="mx-auto mt-8 w-full max-w-xl h-[280px] md:h-[450px] rounded-3xl bg-accent-gradient flex justify-center items-center relative overflow-hidden"
    >
      <motion.div
        variants={scrollUpItemVariants}
        className="size-40 md:size-60 bg-stone-50 rounded-3xl flex justify-center items-center absolute shadow-xl"
      >
        <div className="text-[96px] md:text-[132px] select-none">{emoji}</div>
      </motion.div>
    </motion.div>
  );
}

const scrollUpItemVariants: Variants = {
  offscreen: {
    y: -400,
  },
  onscreen: {
    y: 1 / 2,
    rotate: -8,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};
