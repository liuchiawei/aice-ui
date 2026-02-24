import { FloatingDock } from "@/components/navigation/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "X",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    <div className="flex items-center justify-center h-[30rem] w-full">
      <FloatingDock
        desktopClassName="rounded-full"
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}

export const floatingDockSource = `import { FloatingDock } from "@/components/navigation/floating-dock";
import { IconHome, IconBrandGithub } from "@tabler/icons-react";

const items = [
  { title: "Home", icon: <IconHome className="size-4" />, href: "#" },
  { title: "GitHub", icon: <IconBrandGithub className="size-4" />, href: "#" },
];

<FloatingDock items={items} desktopClassName="rounded-full" />`;
