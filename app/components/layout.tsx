"use client";

import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
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
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger aria-label="Toggle sidebar" />
          <Link href="/" className="text-lg font-semibold text-foreground">
            {componentPageTitle}
          </Link>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
