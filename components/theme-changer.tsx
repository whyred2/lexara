"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export const ThemeChanger = () => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={cn(
        buttonVariants({ variant: "outline" }),
        "relative flex h-10 w-10 items-center justify-center overflow-hidden",
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      type="button"
    >
      <Icons.sun
        className={cn(
          "absolute transition-[translate,opacity] duration-300 ease-in-out",
          theme === "dark" && "-translate-y-10 opacity-0",
        )}
      />
      <Icons.moon
        className={cn(
          "absolute transition-[translate,opacity] duration-300 ease-in-out",
          theme === "light" && "translate-y-10 opacity-0",
        )}
      />
    </button>
  );
};
