"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const localeLabels: Record<string, string> = {
  en: "English",
  ja: "日本語",
  zh: "中文",
};

export function LangSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="size-9 rounded-lg bg-muted/50 backdrop-blur-sm" />
    );
  }

  const defaultTriggerClassNames =
    "relative size-8 rounded-lg bg-card/20 backdrop-blur-xs border border-border/50 shadow-sm overflow-hidden group cursor-pointer flex items-center justify-center";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          type="button"
          className={cn(defaultTriggerClassNames, className)}
          aria-label="Switch language"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Languages
            className="size-4 text-foreground"
            strokeWidth={2}
            aria-hidden
          />
          <div className="absolute inset-0 rounded-lg ring-1 ring-foreground/0 group-hover:ring-foreground/10 transition-all duration-300" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[8rem] space-y-1">
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={cn(
              "focus:bg-foreground/10 cursor-pointer",
              locale === loc && "bg-primary text-primary-foreground font-medium"
            )}
          >
            {localeLabels[loc] ?? loc}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
