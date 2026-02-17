import { ThemeSwitcher } from "@/components/ui-elements/theme-switcher";

export function ThemeSwitchDemo() {
  return (
    <div className="flex justify-center items-center h-48 w-full">
      <ThemeSwitcher />
    </div>
  );
}

export const themeSwitchSource = `import { ThemeSwitcher } from "@/components/ui-elements/theme-switcher";

<ThemeSwitcher />`;