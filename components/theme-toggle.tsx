"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="hover:bg-accent/50 cursor-pointer size-10"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-6 stroke-[1.5px] text-yellow-400" />
      ) : (
        <Moon className="size-6 stroke-[1.5px]" />
      )}
    </Button>
  );
}
