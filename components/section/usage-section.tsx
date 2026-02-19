"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
} from "@/components/ai-elements/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInstallCommands } from "@/lib/installation";
import { useTranslations } from "next-intl";

interface UsageSectionProps {
  slug: string;
}

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn"] as const;

export function UsageSection({ slug }: UsageSectionProps) {
  const t = useTranslations("ComponentPage");
  const commands = getInstallCommands(slug);

  return (
    <section className="flex flex-col gap-3 border-t border-border pt-6">
      <h2 className="text-lg font-bold">{t("install")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("install")}
      </p>

      <Tabs defaultValue="pnpm" className="w-full">
        <TabsList>
          {PACKAGE_MANAGERS.map((pm) => (
            <TabsTrigger key={pm} value={pm}>
              {pm}
            </TabsTrigger>
          ))}
        </TabsList>

        {PACKAGE_MANAGERS.map((pm) => (
          <TabsContent key={pm} value={pm}>
            <CodeBlock
              code={commands[pm]}
              language="bash"
              className="flex flex-row-reverse items-center justify-between pr-3 rounded-lg border border-border bg-shiki-light-bg dark:bg-shiki-dark-bg"
            >
              <CodeBlockActions>
                <CodeBlockCopyButton />
              </CodeBlockActions>
            </CodeBlock>
          </TabsContent>
        ))}
      </Tabs>

      {/* <p className="text-sm text-muted-foreground">
        または、上のコードタブからコンポーネントのコードをコピーしてプロジェクトに手動で追加してください。
      </p> */}
    </section>
  );
}
