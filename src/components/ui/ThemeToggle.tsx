import { useState, useEffect } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark" | "system";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const applyTheme = (currentTheme: Theme) => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      if (currentTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
        localStorage.setItem("theme", "system");
        return;
      }

      root.classList.add(currentTheme);
      localStorage.setItem("theme", currentTheme);
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  if (!mounted) {
    // Render a placeholder or null during server rendering/initial client mount to avoid hydration mismatch
    return <div style={{ width: '24px', height: '24px' }} />; // Or null, or a Skeleton
  }

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const Icon =
    theme === "light" ? Sun : theme === "dark" ? Moon : Laptop;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label={`Switch to ${
        theme === "light"
          ? "dark"
          : theme === "dark"
          ? "system"
          : "light"
      } theme`}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
};

export default ThemeToggle;
