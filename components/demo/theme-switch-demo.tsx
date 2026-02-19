import { ThemeSwitch } from "@/components/button/theme-switch";

export function ThemeSwitchDemo() {
  return (
    <div className="flex justify-center items-center h-48 w-full">
      <ThemeSwitch />
    </div>
  );
}

export const themeSwitchSource = `import { ThemeSwitch } from "@/components/button/theme-switch";

<ThemeSwitch />`;
