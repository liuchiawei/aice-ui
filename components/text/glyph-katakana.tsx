// KatakanaTitle.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const glyphs = [
  "ア",
  "イ",
  "ウ",
  "エ",
  "オ",
  "カ",
  "キ",
  "ク",
  "ケ",
  "コ",
  "サ",
  "シ",
  "ス",
  "セ",
  "ソ",
  "タ",
  "チ",
  "ツ",
  "テ",
  "ト",
  "ナ",
  "ニ",
  "ヌ",
  "ネ",
  "ノ",
  "ハ",
  "ヒ",
  "フ",
  "ヘ",
  "ホ",
  "マ",
  "ミ",
  "ム",
  "メ",
  "モ",
  "ヤ",
  "ユ",
  "ヨ",
  "ー",
  "ラ",
  "リ",
  "ル",
  "レ",
  "ロ",
  "ワ",
  "ヰ",
  "ヱ",
  "ヲ",
  "ン",
  "ガ",
  "ギ",
  "グ",
  "ゲ",
  "ゴ",
  "ザ",
  "ジ",
  "ズ",
  "ゼ",
  "ゾ",
  "ダ",
  "ヂ",
  "ヅ",
  "デ",
  "ド",
  "バ",
  "ビ",
  "ブ",
  "ベ",
  "ボ",
  "パ",
  "ピ",
  "プ",
  "ペ",
  "ポ",
];

enum CharType {
  Glyph = "glyph",
  Value = "value",
}

interface CharItem {
  type: CharType;
  value: string;
}

interface GlyphKatakanaProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 目標文字，需為片假名 */
  text: string;
  /** 是否啟動動畫 (預設 true) */
  start?: boolean;
  /** 動畫開始前的延遲時間 (毫秒，預設 0) */
  delay?: number;
}

/**
 * 將輸入的文字陣列轉換為狀態陣列，
 * 到位的字元顯示真實文字，其他則隨機取自 glyphs
 */
function shuffle(
  content: string[],
  current: CharItem[],
  position: number
): CharItem[] {
  return content.map((char, index) => {
    if (index < position) {
      return { type: CharType.Value, value: char };
    }
    // 產生隨機的片假名
    const rand = Math.floor(Math.random() * glyphs.length);
    return { type: CharType.Glyph, value: glyphs[rand] };
  });
}

/**
 * KatakanaTitle - 組件載入時以解碼動畫效果，由隨機片假名逐步呈現正確文字
 */
const GlyphKatakana: React.FC<GlyphKatakanaProps> = (
  ({ text, start = true, delay = 0, className, ...props }) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const reduceMotion = useReducedMotion();
    const decoderSpring = useSpring(0, { stiffness: 8, damping: 4 });
    const content = text.split("");
    const output = useRef<CharItem[]>(
      content.map(() => ({ type: CharType.Glyph, value: "" }))
    );

    // 定義針對不同文字狀態的 Tailwind class
    const tailwindClasses: Record<string, string> = {
      glyph: "opacity-50 transition-all",
      value: "transition-all",
    };

    // 直接操作 innerHTML 將各字元以 span 包裹
    const renderOutput = () => {
      if (containerRef.current) {
        const html = output.current
          .map(
            (item) =>
              `<span class="${tailwindClasses[item.type]}">${item.value}</span>`
          )
          .join("");
        containerRef.current.innerHTML = html;
      }
    };

    useEffect(() => {
      const unsubscribe = decoderSpring.on("change", (value: number) => {
        output.current = shuffle(content, output.current, Math.floor(value));
        renderOutput();
      });

      const startAnimation = async () => {
        await new Promise((resolve) => setTimeout(resolve, delay));
        decoderSpring.set(content.length);
      };

      if (start && !reduceMotion) {
        startAnimation();
      } else {
        output.current = content.map((char) => ({
          type: CharType.Value,
          value: char,
        }));
        renderOutput();
      }

      return () => {
        unsubscribe();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decoderSpring, reduceMotion, start, delay, text]);

    return (
      <span
        className={cn(
          "inline-block",
          className
        )}
        {...props}
      >
        <span aria-hidden ref={containerRef} />
      </span>
    );
  }
);

export default GlyphKatakana;
