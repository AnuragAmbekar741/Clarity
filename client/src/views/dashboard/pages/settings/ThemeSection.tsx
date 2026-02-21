import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import type { Theme } from "@/components/theme/theme-context";

interface ThemeSectionProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function ThemeSection({ theme, setTheme }: ThemeSectionProps) {

  return (
    <section className="border border-border/40 rounded-lg p-6 bg-card/50 space-y-4">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">Theme</h2>
        <p className="text-sm text-muted-foreground">
          Choose your preferred color scheme
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setTheme("light")}
          variant={theme === "light" ? "default" : "outline"}
          className="gap-2"
          aria-pressed={theme === "light"}
          aria-label="Light theme"
        >
          <Sun className="w-4 h-4" />
          Light
        </Button>
        <Button
          onClick={() => setTheme("dark")}
          variant={theme === "dark" ? "default" : "outline"}
          className="gap-2"
          aria-pressed={theme === "dark"}
          aria-label="Dark theme"
        >
          <Moon className="w-4 h-4" />
          Dark
        </Button>
        <Button
          onClick={() => setTheme("system")}
          variant={theme === "system" ? "default" : "outline"}
          className="gap-2"
          aria-pressed={theme === "system"}
          aria-label="System theme"
        >
          System
        </Button>
      </div>
    </section>
  );
}
