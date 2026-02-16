"use client";

import Link from "next/link";
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
import { Eye, Code } from "lucide-react";
import { getDemoBySlug } from "@/lib/component-demos";
import { myComponents } from "@/lib/config";
import {
  componentPageIntro,
  componentTitle,
  componentDescription,
} from "@/lib/message";
import { InstallationSection } from "@/components/sections/installation-section";

interface ComponentShowcaseProps {
  slug: string;
}

export function ComponentShowcase({ slug }: ComponentShowcaseProps) {
  const config = getDemoBySlug(slug);
  if (!config) {
    notFound();
  }

  const { Demo, sourceCode, language } = config;

  const currentGroup = myComponents.find((group) =>
    group.items.some((item) => item.slug === slug),
  );
  const title = componentTitle[slug] ?? "Unknown";
  const description = componentDescription[slug] ?? componentPageIntro;

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Title & Description */}
      <section className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/components/${slug}`}>
                {title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </section>
      {/* Preview & Code */}
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
        <TabsContent value="preview" className="mt-3">
          <div className="rounded-lg border border-border bg-muted p-6">
            <Demo />
          </div>
        </TabsContent>
        <TabsContent value="source" className="mt-3">
          <CodeBlock
            code={sourceCode}
            language={language}
            showLineNumbers
            className="rounded-lg border border-border"
          />
        </TabsContent>
      </Tabs>

      {/* Installation */}
      <InstallationSection slug={slug} />

      {/* Related Components */}
      <section className="space-y-2">
        {currentGroup && (
          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground">
              同分類元件
            </span>
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {currentGroup.items.map((item, index) => (
                <li
                  key={item.slug}
                  className="inline-flex items-center gap-x-2"
                >
                  {index > 0 && (
                    <span className="text-muted-foreground">·</span>
                  )}
                  <Link
                    href={`/components/${item.slug}`}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
