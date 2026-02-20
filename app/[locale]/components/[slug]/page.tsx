import { Suspense } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ComponentShowcase } from "./component-showcase";
import { demoSlugs, myComponents } from "@/lib/component-config";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const allSlugs: string[] = myComponents.flatMap((group) =>
  group.items.map((item) => item.slug),
);

async function ComponentSlugPageContent({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!allSlugs.includes(slug)) {
    notFound();
  }
  return <ComponentShowcase slug={slug} />;
}

export default function ComponentSlugPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ComponentSlugPageContent params={params} />
    </Suspense>
  );
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    demoSlugs.map((slug) => ({ locale, slug })),
  );
}
