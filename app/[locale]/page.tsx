import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/section/hero";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function HomeContent({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 font-sans bg-dot-28-s-2-gray-400 dark:bg-dot-28-s-2-gray-500">
      <Hero />
    </div>
  );
}

export default function Home({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeContent params={params} />
    </Suspense>
  );
}
