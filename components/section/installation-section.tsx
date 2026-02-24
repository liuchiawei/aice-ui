import Snippet from "@/components/ui-elements/snippet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInstallCommands } from "@/lib/installation";
import { useTranslations } from "next-intl";

interface InstallationSectionProps {
  slug: string;
}

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn"] as const;

export function InstallationSection({ slug }: InstallationSectionProps) {
  const t = useTranslations("ComponentPage");
  const commands = getInstallCommands(slug);

  return (
    <section className="flex flex-col gap-3 border-t border-border pt-6">
      <h2 className="text-lg font-bold">{t("install.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("install.description")}
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
            <Snippet.Provider
              code={commands[pm]}
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

      {/* <p className="text-sm text-muted-foreground">
        または、上のコードタブからコンポーネントのコードをコピーしてプロジェクトに手動で追加してください。
      </p> */}
    </section>
  );
}
