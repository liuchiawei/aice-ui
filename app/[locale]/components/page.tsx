import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ComponentsPageClient } from "./components-page-client";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function ComponentsPageContent({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComponentsPageClient />;
}

export default function ComponentsPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ComponentsPageContent params={params} />
    </Suspense>
  );
}
