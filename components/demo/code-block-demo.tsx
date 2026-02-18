import { CodeBlock } from "@/components/ai-elements/code-block";

const code = `# Variables and Calculation
a = 10
b = 20
c = a + b
print("a =", a)
print("b =", b)
print("a + b =", c)`;

function CodeBlockDemo() {
  return <CodeBlock code={code} language="python" showLineNumbers className="w-full h-full" />;
}

const codeBlockSource = `import { CodeBlock } from "@/components/ai-elements/code-block";

const code = \`
# Variables and Calculation
a = 10
b = 20
c = a + b
print("a =", a)
print("b =", b)
print("a + b =", c)\`;

<CodeBlock code={code} language="python" showLineNumbers />`;

export { CodeBlockDemo, codeBlockSource };