"use client";
import Link from "next/link";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { Send } from "lucide-react";
import RadarChartCard from "@/components/ui-elements/radar-chart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NameCard() {
  const isMobile = useIsMobile();
  const [isFlipped, setIsFlipped] = useState(false);
  /** 
    @function handleFlip
    @description: カードを裏返す関数
  */
  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };
  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      containerClassName="w-full md:max-w-200 h-[640px] md:h-132 mx-auto rounded-none md:rounded-[60px] bg-dot-6-s-2-foreground/40 p-6"
    >
      {/* カードの正面 */}
      <CardContainer
        containerClassName={`w-full h-full transition-all ${
          isFlipped ? "opacity-0" : ""
        }`}
        className="w-full h-full"
      >
        <CardBody className="bg-white w-full h-full rounded-3xl shadow-xl">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-2 p-8 items-center cursor-pointer w-full h-full **:data-primary-text:text-stone-950 **:data-secondary-text:text-stone-400 *:text-center *:md:text-left *:w-full hover:**:data-image:drop-shadow-xl"
            onClick={handleFlip}
          >
            {/* 画像 */}
            <CardItem
              translateZ={80}
              className="row-span-4 flex justify-center items-center"
            >
              <motion.div
                data-image
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.4 }}
                className="bg-accent-gradient rounded-full size-60 md:size-68 overflow-hidden z-0 flex justify-center items-center"
              >
                <motion.div
                  variants={scrollUpItemVariants}
                  className="size-72 md:size-82"
                >
                  <Image
                    src="/images/profile.svg"
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </CardItem>
            {/* サブタイトル */}
            <CardItem translateZ={60}>
              <h3 data-secondary-text className="text-sm md:text-lg">
                Graphic Designer / Frontend Engineer / Illustrator
              </h3>
            </CardItem>
            {/* 名前 */}
            <CardItem translateZ={100} className="row-span-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                data-secondary-text
                className="text-xl md:text-2xl mb-2"
              >
                リュウ チャーウェイ
              </motion.div>
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      data-primary-text
                      className="text-5xl md:text-6xl font-black"
                    >
                      Liu Chiawei
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>クリックしてもっと見る</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardItem>
            {/* メールアドレス */}
            <CardItem
              translateZ={40}
              className="hover:**:data-secondary-text:text-neutral-600 hover:**:data-secondary-text:font-bold hover:**:data-icon:-translate-y-1 hover:**:data-icon:translate-x-1"
            >
              <Link
                href="/contact"
                data-secondary-text
                className="text-md md:text-2xl transition-all flex justify-center md:justify-start items-center gap-4 "
              >
                <Send
                  data-secondary-text
                  data-icon
                  className="size-6 transition-all delay-200"
                />
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <h2>doublecheap@gmail.com</h2>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>メール送ってね</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      {/* カードの裏面 */}
      <CardContainer
        containerClassName={`w-full h-full transition-all ${
          isFlipped ? "" : "opacity-0"
        }`}
        className="w-full h-full"
      >
        <CardBody className="bg-stone-300 w-full h-full rounded-3xl shadow-xl">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center cursor-pointer p-8 w-full h-full *:text-center *:md:text-left *:w-full hover:**:data-image:drop-shadow-xl"
            onClick={handleFlip}
          >
            {!isMobile && (
              <CardItem translateZ={20} className="h-full w-full row-span-2">
                <RadarChartCard />
              </CardItem>
            )}
            <CardItem translateZ={50} className="p-4">
              <h2 className="text-md md:text-sm mb-4 text-stone-700">
                About Me
              </h2>
              <h1 className="text-4xl font-black text-stone-50">私について</h1>
            </CardItem>
            <CardItem translateZ={80} className="h-full p-2">
              <p className="text-sm md:text-md leading-6 text-justify text-stone-700">
                2011年にインフォグラフィックを中心としたデザイン事務所を設立し、2018年にフリーランスのイラストレーターおよびグラフィックデザイナーとして独立しました。創作スタイルはシンプルな線と鮮やかな色を特徴としています。プライベートではプロボクサーとして活動しています。
              </p>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </ReactCardFlip>
  );
}

const scrollUpItemVariants: Variants = {
  offscreen: {
    y: 300,
    scale: 0.7,
  },
  onscreen: {
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};
