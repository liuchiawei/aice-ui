import { CodeBlock } from "@/components/ai-elements/code-block";

export function CodeBlockDemo() {
  return <CodeBlock code={codeBlockSource} language="tsx" showLineNumbers />;
}

export const codeBlockSource = `<CodeBlock code={code} language="tsx" showLineNumbers />`;