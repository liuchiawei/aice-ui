import { setRequestLocale } from "next-intl/server";
import { ComponentsPageClient } from "./components-page-client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ComponentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComponentsPageClient />;
}
