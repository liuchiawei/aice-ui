import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Home");
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center gap-10 text-center">
      <h1 className="text-7xl md:text-[10vw] font-roboto font-black tracking-tight text-foreground uppercase leading-none">
        {t("title")}
      </h1>
      <p className="w-full max-w-md text-sm text-muted-foreground text-justify">
        {t("description")}
      </p>
      <Button asChild>
        <Link
          href="/components"
          className="group inline-flex items-center gap-2"
        >
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />{" "}
          {t("CTA")}
        </Link>
      </Button>
    </main>
  );
}
