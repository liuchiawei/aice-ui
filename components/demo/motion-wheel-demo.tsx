"use client";

import Image from "next/image";
import { MotionWheel } from "@/components/carousel/motion-wheel";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

interface Scene {
  id: number;
  name: string;
  image: string;
}

const demoScenes: Scene[] = [
  { id: 1, name: "Mountain Sunrise", image: "https://picsum.photos/300/300?random=1" },
  { id: 2, name: "Ocean Horizon", image: "https://picsum.photos/300/300?random=2" },
  { id: 3, name: "Forest Path", image: "https://picsum.photos/300/300?random=3" },
  { id: 4, name: "City Skyline", image: "https://picsum.photos/300/300?random=4" },
  { id: 5, name: "Desert Dunes", image: "https://picsum.photos/300/300?random=5" },
  { id: 6, name: "Northern Lights", image: "https://picsum.photos/300/300?random=6" },
];

function MotionWheelDemo() {
  return (
    <MotionWheel.Root items={demoScenes} initialIndex={2}>
      <MotionWheel.AutoCarousel interval={3000} />
      <MotionWheel.Border />
      <MotionWheel.Wheel<Scene>>
        {(scene, index) => (
          <MotionWheel.Item key={scene.id} item={scene} index={index}>
            <CardContainer className="relative">
              <CardBody className="flex flex-col items-center justify-center space-y-2">
                <CardItem translateZ={80}>
                  <Image
                    src={scene.image}
                    alt={scene.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </CardItem>
                <CardItem
                  translateZ={20}
                  className="flex flex-col justify-between items-center"
                >
                  <h3 className="text-base font-bold text-primary">
                    {scene.name}
                  </h3>
                </CardItem>
              </CardBody>
            </CardContainer>
          </MotionWheel.Item>
        )}
      </MotionWheel.Wheel>
      <MotionWheel.Navigation />
      <MotionWheel.CenterInfo<Scene>>
        {(scene) => (
          <h1 className="text-xl md:text-2xl font-sans font-[900]">
            {scene.name}
          </h1>
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
  { id: 1, name: "Mountain Sunrise", image: "..." },
  // ... more scenes
];

function MotionWheelDemo() {
  return (
    <MotionWheel.Root items={items} initialIndex={2}>
      <MotionWheel.AutoCarousel interval={5000} />
      <MotionWheel.Border />
      <MotionWheel.Wheel>
        {(scene, index) => (
          <MotionWheel.Item key={scene.id} item={scene} index={index}>
            <CardContainer className="relative">
              <CardBody className="flex flex-col items-center justify-center">
                <CardItem translateZ={80}>
                  <Image
                    src={scene.image}
                    alt={scene.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </CardItem>
                <CardItem
                  translateZ={20}
                  className="flex flex-col justify-between items-center"
                >
                  <h3 className="text-base font-bold text-primary">{scene.name}</h3>
                </CardItem>
              </CardBody>
            </CardContainer>
          </MotionWheel.Item>
        )}
      </MotionWheel.Wheel>
      <MotionWheel.Navigation />
      <MotionWheel.CenterInfo>
        {(scene) => (
          <h1 className="text-xl md:text-2xl font-sans font-[900]">{scene.name}</h1>
        )}
      </MotionWheel.CenterInfo>
      <MotionWheel.Dots />
    </MotionWheel.Root>
  );
}`;

export { MotionWheelDemo, motionWheelDemoSource };
