"use client";

import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/ui-elements/theme-switcher";
import { myComponents } from "@/lib/component-config";
import { componentPageTitle } from "@/lib/message";

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    return (
                      <SidebarMenuItem key={item.slug}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={`/components/${item.slug}`}
                            className="cursor-pointer"
                            aria-label={`Go to ${item.label} section`}
                          >
                            {item.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
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
          <ThemeSwitcher />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
