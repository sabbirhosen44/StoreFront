"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-10">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hover:bg-accent/50 cursor-pointer size-10"
    >
      {theme === "dark" ? (
        <Sun className="size-6 stroke-[1.5px] text-yellow-500" />
      ) : (
        <Moon className="size-6 stroke-[1.5px] text-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
