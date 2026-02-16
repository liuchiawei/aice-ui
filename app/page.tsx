import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 font-sans">
      <main className="mx-auto flex max-w-xl flex-col items-center gap-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          aice-ui
        </h1>
        <p className="text-muted-foreground text-balance">
          Component library and registry. View all components in the showcase.
        </p>
        <Link
          href="/components"
          className="inline-flex h-11 min-w-44 cursor-pointer items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Open component library
        </Link>
      </main>
    </div>
  );
}
