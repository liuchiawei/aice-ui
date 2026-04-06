"use client";

import { useTranslations } from "next-intl";
import Snippet from "@/components/ui-elements/snippet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getOpenUiCliAddCommandsExample,
  getShadcnInitCommand,
  getShadcnRegistryAddCommandsExample,
} from "@/lib/usage";

export function UsagePageClient() {
  const t = useTranslations("UsagePage");
  const openUiCliCommands = getOpenUiCliAddCommandsExample();
  const shadcnCommands = getShadcnRegistryAddCommandsExample();

  return (
    <div className="min-w-0 space-y-10 p-4 md:p-6 md:pt-3">
      <section className="space-y-3">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black font-roboto">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">{t("sections.prerequisites.title")}</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>{t("sections.prerequisites.node")}</li>
          <li>{t("sections.prerequisites.tailwind")}</li>
          <li>{t("sections.prerequisites.shadcn")}</li>
        </ul>
      </section>

      <section className="space-y-3 border-t border-border pt-6">
        <h2 className="text-lg font-bold">{t("sections.openUiCli.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("sections.openUiCli.description")}</p>

        <Tabs defaultValue="pnpm" className="w-full">
          <TabsList>
            {Object.keys(openUiCliCommands).map((pm) => (
              <TabsTrigger key={pm} value={pm}>
                {pm}
              </TabsTrigger>
            ))}
          </TabsList>
          {(Object.keys(openUiCliCommands) as Array<keyof typeof openUiCliCommands>).map((pm) => (
            <TabsContent key={pm} value={pm} className="mt-2">
              <Snippet.Provider
                code={openUiCliCommands[pm]}
                className="rounded-lg border border-border bg-shiki-light-bg dark:bg-shiki-dark-bg"
              >
                <Snippet.Input className="min-h-9" />
                <Snippet.Addon align="inline-end">
                  <Snippet.CopyButton />
                </Snippet.Addon>
              </Snippet.Provider>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="space-y-3 border-t border-border pt-6">
        <h2 className="text-lg font-bold">{t("sections.shadcnCli.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("sections.shadcnCli.description")}</p>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t("sections.shadcnCli.initLabel")}</p>
          <Snippet.Provider
            code={getShadcnInitCommand()}
            className="rounded-lg border border-border bg-shiki-light-bg dark:bg-shiki-dark-bg"
          >
            <Snippet.Input className="min-h-9" />
            <Snippet.Addon align="inline-end">
              <Snippet.CopyButton />
            </Snippet.Addon>
          </Snippet.Provider>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t("sections.shadcnCli.addLabel")}</p>
          <Tabs defaultValue="pnpm" className="w-full">
            <TabsList>
              {Object.keys(shadcnCommands).map((pm) => (
                <TabsTrigger key={pm} value={pm}>
                  {pm}
                </TabsTrigger>
              ))}
            </TabsList>
            {(Object.keys(shadcnCommands) as Array<keyof typeof shadcnCommands>).map((pm) => (
              <TabsContent key={pm} value={pm} className="mt-2">
                <Snippet.Provider
                  code={shadcnCommands[pm]}
                  className="rounded-lg border border-border bg-shiki-light-bg dark:bg-shiki-dark-bg"
                >
                  <Snippet.Input className="min-h-9" />
                  <Snippet.Addon align="inline-end">
                    <Snippet.CopyButton />
                  </Snippet.Addon>
                </Snippet.Provider>
              </TabsContent>
            ))}
          </Tabs>
          <p className="text-xs text-muted-foreground">{t("sections.shadcnCli.registryHint")}</p>
        </div>
      </section>

      <section className="space-y-3 border-t border-border pt-6">
        <h2 className="text-lg font-bold">{t("sections.manualCopy.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("sections.manualCopy.description")}</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>{t("sections.manualCopy.point1")}</li>
          <li>{t("sections.manualCopy.point2")}</li>
          <li>{t("sections.manualCopy.point3")}</li>
        </ul>
      </section>

      <section className="space-y-3 border-t border-border pt-6">
        <h2 className="text-lg font-bold">{t("sections.faq.title")}</h2>
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">{t("sections.faq.q1.q")}</p>
            <p className="text-sm text-muted-foreground">{t("sections.faq.q1.a")}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{t("sections.faq.q2.q")}</p>
            <p className="text-sm text-muted-foreground">{t("sections.faq.q2.a")}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{t("sections.faq.q3.q")}</p>
            <p className="text-sm text-muted-foreground">{t("sections.faq.q3.a")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

