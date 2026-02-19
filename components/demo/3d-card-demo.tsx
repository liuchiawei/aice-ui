"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import ThreeDCard from "@/components/card/3d-card";

function ThreeDCardDemo() {
  const t = useTranslations("ThreeDCardDemo");

  return (
    <div className="flex justify-center items-center min-h-[420px] w-full p-6">
      <ThreeDCard.Container
        containerClassName="w-full max-w-sm"
        className="relative"
      >
        <ThreeDCard.Body className="flex flex-col items-center justify-center gap-4 rounded-xl border bg-card p-4 shadow-lg h-80 w-72">
          <ThreeDCard.Item translateZ={80}>
            <Image
              src="https://picsum.photos/200/120?random=1"
              alt="demo image"
              width={200}
              height={120}
              className="rounded-lg object-cover"
            />
          </ThreeDCard.Item>
          <ThreeDCard.Item
            translateZ={20}
            className="flex flex-col items-center text-center gap-1"
          >
            <h3 className="text-lg font-bold text-primary">{t("title")}</h3>
            <p className="text-xs text-muted-foreground">{t("hint")}</p>
          </ThreeDCard.Item>
        </ThreeDCard.Body>
      </ThreeDCard.Container>
    </div>
  );
}

const threeCardDemoSource = `import Image from "next/image";
import ThreeDCard from "@/components/card/3d-card";

function ThreeDCardDemo() {
  return (
    <ThreeDCard.Container containerClassName="w-full max-w-sm">
      <ThreeDCard.Body className="h-80 w-72 p-4">
        <ThreeDCard.Item translateZ={80}>
          <Image
            src="https://picsum.photos/200/120"
            alt="demo image"
            width={200}
            height={120}
            className="rounded-lg object-cover"
          />
        </ThreeDCard.Item>
        <ThreeDCard.Item translateZ={20}>
          <h3 className="text-lg font-bold">Title</h3>
          <p className="text-xs text-muted-foreground">Hint</p>
        </ThreeDCard.Item>
      </ThreeDCard.Body>
    </ThreeDCard.Container>
  );
}`;

export { ThreeDCardDemo, threeCardDemoSource };
