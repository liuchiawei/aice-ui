"use client";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  name_jp: string;
  name_en: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

export default function MotionWheel() {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setWheelRotation((prev) => prev + 360 / featuredProducts.length); // Rotate 45 degrees clockwise
    setCurrentIndex(
      (prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length
    );
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setWheelRotation((prev) => prev - 360 / featuredProducts.length); // Rotate 45 degrees counter-clockwise
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Calculate which product is currently at the "center" based on wheel rotation
  const getCurrentProduct = () => {
    return featuredProducts[currentIndex];
  };

  const getVisibleProducts = () => {
    return featuredProducts.map((product, index) => ({
      ...product,
      position: index - 2, // Static positions: -2, -1, 0, 1, 2, 3
    }));
  };

  return (
    <div className="w-full h-[840px] flex justify-center items-center relative overflow-hidden">
      {/* Decorative Border Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-primary size-120 md:size-160 rounded-full z-0 pointer-events-none" />

      {/* Products Wheel */}
      <motion.div
        className="w-full h-full relative"
        animate={{
          rotate: wheelRotation,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 25,
          duration: 0.5,
        }}
      >
        <AnimatePresence mode="wait">
          {getVisibleProducts().map((product) => {
            // Check if this is the current product
            const isCurrentProduct =
              product.id === featuredProducts[currentIndex].id;

            const angle = product.position * (360 / featuredProducts.length);
            const radius = isMobile ? 270 : 320;
            const x = isCurrentProduct
              ? 0
              : Math.sin((angle * Math.PI) / 180) * radius;
            const y = isCurrentProduct
              ? 0
              : -Math.cos((angle * Math.PI) / 180) * radius;
            const scale = isCurrentProduct ? 1 : 0.4;
            const zIndex = isCurrentProduct
              ? 50
              : 5 - Math.abs(product.position);
            const cardRotation = angle;

            return (
              <motion.div
                key={product.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{
                  x: x,
                  y: y,
                  scale: scale,
                  rotate: cardRotation,
                  opacity: 1,
                }}
                animate={{
                  x: x,
                  y: y,
                  scale: scale,
                  rotate: cardRotation,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 25,
                  duration: 0.5,
                }}
                style={{ zIndex }}
              >
                <CardContainer className="relative">
                  <CardBody className="flex flex-col items-center justify-center">
                    <CardItem translateZ={80}>
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.image}
                          alt={product.name_jp}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      className="flex flex-col justify-between items-center gap-2"
                    >
                      <h3 className="text-base font-bold text-primary">
                        {product.name_jp}
                      </h3>
                      <p className="text-sm text-neutral-400">
                        {product.brand}
                      </p>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={isAnimating}
          className="size-12 rounded-full hover:bg-primary hover:text-background"
        >
          <ChevronLeft className="size-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={isAnimating}
          className="size-12 rounded-full hover:bg-primary hover:text-background"
        >
          <ChevronRight className="size-6" />
        </Button>
      </div>

      {/* Current Product Info */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 py-3 px-6 text-center bg-card/[0.3] backdrop-blur-xs rounded-xl shadow-2xl"
        key={wheelRotation}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-neutral-400 mb-1 text-sm md:text-base uppercase">
          {getCurrentProduct().brand}
        </h3>
        <h1 className="text-xl md:text-2xl font-sans font-[900] mb-2">
          {getCurrentProduct().name_jp}
        </h1>
        <p className="text-neutral-400 mb-1 text-sm md:text-base uppercase">
          {getCurrentProduct().name_en}
        </p>
        <p className="text-3xl font-bold text-primary">
          ¥{getCurrentProduct().price.toLocaleString()}
        </p>
      </motion.div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                const rotationDifference =
                  (currentIndex - index) * (360 / featuredProducts.length);
                setWheelRotation((prev) => prev + rotationDifference);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={`size-3 rounded-full transition-all duration-300 cursor-pointer ${
              getCurrentProduct().id === featuredProducts[index].id
                ? "bg-accent scale-125"
                : "bg-white/50 hover:bg-primary"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name_jp: "プレミアム格闘技グローブ",
    name_en: "Premium Fighting Gloves",
    price: 15800,
    image: "/images/glove_01.png",
    category: "グローブ",
    brand: "BushiGear Pro",
  },
  {
    id: 31,
    name_jp: "プロフェッショナルミット",
    name_en: "Professional Mitt",
    price: 12500,
    image: "/images/mitt_01.png",
    category: "ミット",
    brand: "Martial World",
  },
  {
    id: 21,
    name_jp: "アドバンスドプロテクター",
    name_en: "Advanced Protector",
    price: 18900,
    image: "/images/protector_01.png",
    category: "プロテクター",
    brand: "BushiGear Elite",
  },
  {
    id: 12,
    name_jp: "トレーニングウェア",
    name_en: "Training Wear",
    price: 8900,
    image: "/images/fuku_02.png",
    category: "服",
    brand: "Fighter Wear",
  },
  {
    id: 32,
    name_jp: "コンバットミット",
    name_en: "Combat Mitt",
    price: 14200,
    image: "/images/mitt_02.png",
    category: "ミット",
    brand: "Combat Pro",
  },
  {
    id: 22,
    name_jp: "ファイタープロテクション",
    name_en: "Fighter Protection",
    price: 21500,
    image: "/images/protector_02.png",
    category: "プロテクター",
    brand: "Guard Master",
  },
];
