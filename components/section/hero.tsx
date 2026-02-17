import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { topPage } from "@/lib/message";

export default function Hero() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center gap-10 text-center">
      <h1 className="text-7xl md:text-[10vw] font-roboto font-black tracking-tight text-foreground uppercase leading-none">
        {topPage.title}
      </h1>
      <p className="w-full max-w-md text-sm text-muted-foreground text-justify">
        {topPage.description}
      </p>
      <Button asChild>
        <Link
          href="/components"
          className="group inline-flex items-center gap-2"
        >
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />{" "}
          {topPage.CTA}
        </Link>
      </Button>
    </main>
  );
}
