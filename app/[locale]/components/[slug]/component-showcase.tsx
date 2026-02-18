"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/ai-elements/code-block";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Code } from "lucide-react";
import { getItemBySlug, myComponents } from "@/lib/component-config";
import { InstallationSection } from "@/components/section/installation-section";
import { ComingSoon } from "@/components/section/coming-soon";

interface ComponentShowcaseProps {
  slug: string;
}

export function ComponentShowcase({ slug }: ComponentShowcaseProps) {
  const t = useTranslations("Components");
  const tPage = useTranslations("ComponentPage");
  const result = getItemBySlug(slug);
  if (result === undefined) {
    notFound();
  }

  const { item } = result;
  const currentGroup = myComponents.find((group) =>
    group.items.some((i) => i.slug === slug),
  );

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Title & Description */}
      <section className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{tPage("breadcrumb.home")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/components">{tPage("breadcrumb.components")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/components/${slug}`}>{t(item.labelKey)}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black">
          {t(item.labelKey)}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t(item.descriptionKey ?? tPage("description"))}
        </p>
      </section>

      {result.kind === "demo" ? (
        <>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview" className="text-xs">
                <Eye className="size-4" /> Preview
              </TabsTrigger>
              <TabsTrigger value="source" className="text-xs">
                <Code className="size-4" />
                Code
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="preview"
              className="relative w-full h-full rounded-lg border border-border bg-muted p-6"
            >
              <result.Demo />
            </TabsContent>
            <TabsContent value="source" className="min-w-0 max-w-5xl">
              <CodeBlock
                code={result.sourceCode}
                language={result.language}
                showLineNumbers
                className="w-full min-w-0 rounded-lg border border-border bg-shiki-light-bg dark:bg-shiki-dark-bg"
              />
            </TabsContent>
          </Tabs>
          <InstallationSection slug={slug} />
        </>
      ) : (
        <ComingSoon componentName={t(result.item.labelKey)} />
      )}

      {/* Related Components */}
      <section>
        {currentGroup && (
          <>
            <h3 className="text-xs font-medium text-muted-foreground mb-3">
              {tPage("related")}
            </h3>
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {currentGroup.items.map((item) => (
                <li
                  key={item.slug}
                  className="inline-flex items-center gap-x-2"
                >
                  <Link href={`/components/${item.slug}`}>
                    <Badge
                      variant="outline"
                      className="py-1 hover:bg-primary/20 transition-colors"
                    >
                      {t(item.labelKey)}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
