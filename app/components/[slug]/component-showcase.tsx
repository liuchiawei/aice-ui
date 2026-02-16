"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/ai-elements/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDemoBySlug } from "@/lib/component-demos";
import { myComponents } from "@/lib/config";
import {
  componentPageDescription,
  componentPageIntro,
} from "@/lib/message";

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
    group.items.some((item) => item.slug === slug)
  );
  const description =
    componentPageDescription[slug] ?? componentPageIntro;

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <section className="flex flex-col gap-3">
        <Tabs defaultValue="example" className="w-full">
          <TabsList>
            <TabsTrigger value="example">Example</TabsTrigger>
            <TabsTrigger value="source">Source</TabsTrigger>
          </TabsList>
          <TabsContent value="example" className="mt-3">
            <div className="rounded-lg border border-border bg-muted/30 p-6">
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
      </section>

      <section className="flex flex-col gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">{description}</p>
        {currentGroup && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              同分類元件
            </span>
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {currentGroup.items.map((item, index) => (
                <li key={item.slug} className="inline-flex items-center gap-x-2">
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
