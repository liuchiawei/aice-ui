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
import { myComponents } from "@/lib/config";

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          {myComponents.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.href}
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
          <h1 className="text-lg font-semibold text-foreground">
            aice-ui 元件展示
          </h1>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
