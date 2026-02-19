"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { LangSwitcher } from "@/components/ui-elements/lang-switcher";
import { ThemeSwitch } from "@/components/button/theme-switch";
import { myComponents, isNewComponent } from "@/lib/component-config";
import { componentPageTitle } from "@/lib/message";

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Components");
  const tCategory = useTranslations("Category");
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="text-3xl font-black font-roboto">
            {componentPageTitle}
          </Link>
        </SidebarHeader>
        <SidebarContent>
          {myComponents.map((group, index) => (
            <SidebarGroup key={group.label} className="group py-0">
              <Collapsible defaultOpen={index === 0}>
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="text-sidebar-foreground/70 ring-sidebar-ring group flex h-8 w-full shrink-0 cursor-pointer justify-between items-center gap-1 rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0"
                  >
                    {tCategory(group.label)}
                    <ChevronRight
                      className="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-90"
                      aria-hidden
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <SidebarGroupContent>
                    <SidebarMenu className="border-l ml-2 pl-1">
                      {group.items.map((item) => {
                        const isNew = isNewComponent(item.date);
                        return (
                          <SidebarMenuItem key={item.slug}>
                            <SidebarMenuButton asChild>
                              <Link
                                href={`/components/${item.slug}`}
                                className="font-bold cursor-pointer flex items-center gap-1.5 min-w-0"
                                aria-label={`Go to ${t(item.labelKey)} section`}
                              >
                                <span className="truncate">
                                  {t(item.labelKey)}
                                </span>
                                {isNew ? (
                                  <Badge
                                    variant="outline"
                                    className="shrink-0"
                                  >
                                    {t("newLabel")}
                                  </Badge>
                                ) : null}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="h-14 flex shrink-0 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger aria-label="Toggle sidebar" />
            <Link
              href="/"
              className="text-lg font-extrabold font-roboto text-foreground uppercase"
            >
              {componentPageTitle}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LangSwitcher />
            <ThemeSwitch />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
