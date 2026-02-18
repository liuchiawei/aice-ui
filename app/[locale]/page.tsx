import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/section/hero";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 font-sans bg-dot-28-s-2-gray-400 dark:bg-dot-28-s-2-gray-500">
      <Hero />
    </div>
  );
}
