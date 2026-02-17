"use client";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
} from "@/components/ai-elements/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInstallCommands } from "@/lib/installation";
import {
  installationSectionTitle,
  installationSectionDescription,
} from "@/lib/message";

interface InstallationSectionProps {
  slug: string;
}

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn"] as const;

export function InstallationSection({ slug }: InstallationSectionProps) {
  const commands = getInstallCommands(slug);

  return (
    <section className="flex flex-col gap-3 border-t border-border pt-6">
      <h2 className="text-lg font-bold">{installationSectionTitle}</h2>
      <p className="text-sm text-muted-foreground">
        {installationSectionDescription}
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
              className="flex flex-row-reverse items-center justify-between pr-3 rounded-lg border border-border"
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
