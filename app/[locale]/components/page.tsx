import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ComponentsPageClient } from "./components-page-client";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ComponentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComponentsPageClient />;
}
