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
import { LangSwitcher } from "@/components/ui-elements/lang-switcher";
import { ThemeSwitcher } from "@/components/ui-elements/theme-switcher";
import { myComponents } from "@/lib/component-config";
import { componentPageTitle } from "@/lib/message";

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Components");
  const tSidebar = useTranslations("Sidebar");
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="text-3xl font-black font-roboto">
            {componentPageTitle}
          </Link>
        </SidebarHeader>
        <SidebarContent>
          {myComponents.map((group) => (
            <SidebarGroup key={group.label} className="group py-0">
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="text-sidebar-foreground/70 ring-sidebar-ring group flex h-8 w-full shrink-0 cursor-pointer justify-between items-center gap-1 rounded-md px-2 text-left text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0"
                  >
                    {tSidebar(group.label)}
                    <ChevronRight
                      className="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-90"
                      aria-hidden
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.slug}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={`/components/${item.slug}`}
                              className="cursor-pointer"
                              aria-label={`Go to ${t(item.labelKey)} section`}
                            >
                              {t(item.labelKey)}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
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
            <Link href="/" className="text-lg font-semibold text-foreground">
              {componentPageTitle}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LangSwitcher />
            <ThemeSwitcher />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
