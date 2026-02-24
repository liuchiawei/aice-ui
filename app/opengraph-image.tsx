import { ImageResponse } from "next/og";
import { HomepageOgImage } from "@/components/og/homepage-og-image";

export const alt = "AICE UI – Open-source UI components for Next.js, React, Tailwind CSS, and shadcn/ui";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLE = "AICE UI";
const DESCRIPTION =
  "An open-source UI component library to help you build applications faster. It provides pre-built components like conversations, messages and more. Built with Next.js, React, Tailwind CSS, and shadcn/ui.";
const CTA = "Components";

async function loadRobotoBlack(): Promise<ArrayBuffer> {
  const url =
    "https://raw.githubusercontent.com/google/fonts/main/apache/roboto/static/Roboto-Black.ttf";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load font: ${res.status}`);
  return res.arrayBuffer();
}

export default async function Image() {
  try {
    const fontData = await loadRobotoBlack();

    return new ImageResponse(
      (
        <HomepageOgImage
          title={TITLE}
          description={DESCRIPTION}
          ctaText={CTA}
        />
      ),
      {
        ...size,
        fonts: [
          {
            name: "Roboto",
            data: fontData,
            style: "normal",
            weight: 900,
          },
        ],
      }
    );
  } catch (e) {
    console.error("OG image generation failed:", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
