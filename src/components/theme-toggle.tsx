"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder com mesmas dimensões para evitar layout shift
    return <div className="size-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      className="
        inline-flex items-center justify-center size-9 rounded-full cursor-pointer
        bg-zinc-100 dark:bg-zinc-800
        text-zinc-600 dark:text-zinc-300
        hover:bg-zinc-200 dark:hover:bg-zinc-700
        hover:text-zinc-900 dark:hover:text-zinc-100
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-zinc-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-zinc-950
      "
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </button>
  );
}
