import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ai-elements/code-block";

const code = `# Variables and Calculation
a = 10
b = 20
c = a + b
print("a =", a)
print("b =", b)
print("a + b =", c)`;

const language = "python";

function CodeBlockDemo() {
  return (
    <CodeBlock code={code} language={language} showLineNumbers className="w-full h-full">
      <CodeBlockHeader>
        <CodeBlockTitle>
          <CodeBlockFilename>{language}</CodeBlockFilename>
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton />
        </CodeBlockActions>
      </CodeBlockHeader>
    </CodeBlock>
  );
}

const codeBlockSource = `import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ai-elements/code-block";

const code = \`...\`;
const language = "python";

<CodeBlock code={code} language={language} showLineNumbers>
  <CodeBlockHeader>
    <CodeBlockTitle>
      <CodeBlockFilename>{language}</CodeBlockFilename>
    </CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton />
    </CodeBlockActions>
  </CodeBlockHeader>
</CodeBlock>`;

export { CodeBlockDemo, codeBlockSource };