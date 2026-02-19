"use client";

import Image from "next/image";
import { MotionWheel } from "@/components/ui-elements/motion-wheel";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

interface Product {
  id: number;
  name_jp: string;
  name_en: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

const demoProducts: Product[] = [
  {
    id: 1,
    name_jp: "プレミアム格闘技グローブ",
    name_en: "Premium Fighting Gloves",
    price: 15800,
    image: "https://picsum.photos/200/300?random=1",
    category: "グローブ",
    brand: "BushiGear Pro",
  },
  {
    id: 2,
    name_jp: "プロフェッショナルミット",
    name_en: "Professional Mitt",
    price: 12500,
    image: "https://picsum.photos/200/300?random=2",
    category: "ミット",
    brand: "Martial World",
  },
  {
    id: 3,
    name_jp: "アドバンスドプロテクター",
    name_en: "Advanced Protector",
    price: 18900,
    image: "https://picsum.photos/200/300?random=3",
    category: "プロテクター",
    brand: "BushiGear Elite",
  },
  {
    id: 4,
    name_jp: "トレーニングウェア",
    name_en: "Training Wear",
    price: 8900,
    image: "https://picsum.photos/200/300?random=4",
    category: "服",
    brand: "Fighter Wear",
  },
  {
    id: 5,
    name_jp: "コンバットミット",
    name_en: "Combat Mitt",
    price: 14200,
    image: "https://picsum.photos/200/300?random=5",
    category: "ミット",
    brand: "Combat Pro",
  },
  {
    id: 6,
    name_jp: "ファイタープロテクション",
    name_en: "Fighter Protection",
    price: 21500,
    image: "https://picsum.photos/200/300?random=6",
    category: "プロテクター",
    brand: "Guard Master",
  },
];

function MotionWheelDemo() {
  return (
    <MotionWheel.Root items={demoProducts} initialIndex={2}>
      <MotionWheel.Border />
      <MotionWheel.Wheel<Product>>
        {(product, index) => (
          <MotionWheel.Item key={product.id} item={product} index={index}>
            <CardContainer className="relative">
              <CardBody className="flex flex-col items-center justify-center">
                <CardItem translateZ={80}>
                  <Image
                    src={product.image}
                    alt={product.name_jp}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </CardItem>
                <CardItem
                  translateZ={20}
                  className="flex flex-col justify-between items-center gap-2"
                >
                  <h3 className="text-base font-bold text-primary">
                    {product.name_jp}
                  </h3>
                  <p className="text-sm text-neutral-400">{product.brand}</p>
                </CardItem>
              </CardBody>
            </CardContainer>
          </MotionWheel.Item>
        )}
      </MotionWheel.Wheel>
      <MotionWheel.Navigation />
      <MotionWheel.CenterInfo<Product>>
        {(product) => (
          <>
            <h3 className="text-neutral-400 mb-1 text-sm md:text-base uppercase">
              {product.brand}
            </h3>
            <h1 className="text-xl md:text-2xl font-sans font-[900] mb-2">
              {product.name_jp}
            </h1>
            <p className="text-neutral-400 mb-1 text-sm md:text-base uppercase">
              {product.name_en}
            </p>
            <p className="text-3xl font-bold text-primary">
              ¥{product.price.toLocaleString()}
            </p>
          </>
        )}
      </MotionWheel.CenterInfo>
      <MotionWheel.Dots />
    </MotionWheel.Root>
  );
}

const motionWheelDemoSource = `import Image from "next/image";
import { MotionWheel } from "@/components/ui-elements/motion-wheel";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const items = [
  { id: 1, name_jp: "...", name_en: "...", price: 15800, image: "...", category: "...", brand: "..." },
  // ... more items
];

function MotionWheelDemo() {
  return (
    <MotionWheel.Root items={items} initialIndex={2}>
      <MotionWheel.Border />
      <MotionWheel.Wheel>
        {(product, index) => (
          <MotionWheel.Item key={product.id} item={product} index={index}>
            <CardContainer className="relative">
              <CardBody className="flex flex-col items-center justify-center">
                <CardItem translateZ={80}>
                  <Image src={product.image} alt={product.name_jp} width={300} height={300} className="w-full h-full object-cover" />
                </CardItem>
                <CardItem translateZ={20} className="flex flex-col justify-between items-center gap-2">
                  <h3 className="text-base font-bold text-primary">{product.name_jp}</h3>
                  <p className="text-sm text-neutral-400">{product.brand}</p>
                </CardItem>
              </CardBody>
            </CardContainer>
          </MotionWheel.Item>
        )}
      </MotionWheel.Wheel>
      <MotionWheel.Navigation />
      <MotionWheel.CenterInfo>
        {(product) => (
          <>
            <h3 className="text-neutral-400 mb-1 text-sm md:text-base uppercase">{product.brand}</h3>
            <h1 className="text-xl md:text-2xl font-sans font-[900] mb-2">{product.name_jp}</h1>
            <p className="text-neutral-400 mb-1 text-sm md:text-base uppercase">{product.name_en}</p>
            <p className="text-3xl font-bold text-primary">¥\${product.price.toLocaleString()}</p>
          </>
        )}
      </MotionWheel.CenterInfo>
      <MotionWheel.Dots />
    </MotionWheel.Root>
  );
}`;

export { MotionWheelDemo, motionWheelDemoSource };
