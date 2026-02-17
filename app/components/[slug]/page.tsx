import { notFound } from "next/navigation";
import { ComponentShowcase } from "./component-showcase";
import { myComponents } from "@/lib/component-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const allSlugs: string[] = myComponents.flatMap((group) =>
  group.items.map((item) => item.slug),
);

export default async function ComponentSlugPage({ params }: PageProps) {
  const { slug } = await params;
  if (!allSlugs.includes(slug)) {
    notFound();
  }
  return <ComponentShowcase slug={slug} />;
}

export function generateStaticParams() {
  const demoSlugs = [
    "glass-surface",
    "code-block",
    "background-gradient-animation",
    "webcam",
  ];
  return demoSlugs.map((slug) => ({ slug }));
}
