import Snippet from "@/components/ui-elements/snippet";

const SAMPLE_CODE = "pnpm add @aice-ui/snippet";

export function SnippetDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Snippet.Provider
        code={SAMPLE_CODE}
        className="rounded-lg border border-border bg-shiki-light-bg dark:bg-shiki-dark-bg"
      >
        <Snippet.Input className="min-h-9" />
        <Snippet.Addon align="inline-end">
          <Snippet.CopyButton />
        </Snippet.Addon>
      </Snippet.Provider>
      <Snippet.Provider
        code="npm install some-package"
        className="rounded-lg border border-border bg-shiki-light-bg dark:bg-shiki-dark-bg"
      >
        <Snippet.Addon align="inline-start">
          <Snippet.Text>$</Snippet.Text>
        </Snippet.Addon>
        <Snippet.Input className="min-h-9" />
        <Snippet.Addon align="inline-end">
          <Snippet.CopyButton />
        </Snippet.Addon>
      </Snippet.Provider>
    </div>
  );
}

export const snippetSource = `import Snippet from "@/components/ui-elements/snippet";

const code = "pnpm add @aice-ui/snippet";

export function SnippetDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Snippet.Provider
        code={code}
        className="rounded-lg border border-border bg-shiki-light-bg dark:bg-shiki-dark-bg"
      >
        <Snippet.Input className="min-h-9" />
        <Snippet.Addon align="inline-end">
          <Snippet.CopyButton />
        </Snippet.Addon>
      </Snippet.Provider>
      <Snippet.Provider
        code="npm install some-package"
        className="rounded-lg border border-border bg-shiki-light-bg dark:bg-shiki-dark-bg"
      >
        <Snippet.Addon align="inline-start">
          <Snippet.Text>$</Snippet.Text>
        </Snippet.Addon>
        <Snippet.Input className="min-h-9" />
        <Snippet.Addon align="inline-end">
          <Snippet.CopyButton />
        </Snippet.Addon>
      </Snippet.Provider>
    </div>
  );
}`;
