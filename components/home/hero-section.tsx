"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";

import { MacWindow } from "@/components/ui/home-ui";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const { theme } = useTheme();
  const t = useTranslations("Home.HeroSection");
  const locale = useLocale();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden border-b pt-25 dark:border-white/5"
      style={{
        backgroundImage:
          theme === "dark"
            ? "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)"
            : "linear-gradient(180deg, transparent 50%, rgba(255,255,255,0.6) 100%)",
      }}
      aria-label="Hero Section"
    >
      <div className="mx-auto flex h-full w-[90%] flex-col items-center">
        {/* Text Content */}
        <h1
          className={cn(
            "leading-tight font-bold",
            locale === "ru" ? "text-5xl" : "text-6xl",
          )}
        >
          {t("title")} <span className="text-primary">Lexara</span>
        </h1>
        <p className="mx-auto mt-8 text-lg text-black/80 dark:text-white/80">
          {t("subtitle")}
        </p>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "mt-6 text-lg")}
        >
          {t("cta")}
        </Link>
        {/* Illustration Mac Window */}
        <MacWindow>Illustration</MacWindow>
      </div>
      {/* Background */}
      <div
        className={cn(
          "absolute -inset-8 -left-5.5 -z-10",
          "dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px,transparent),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)]",
          "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px,transparent),linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px)]",
        )}
        style={{
          backgroundSize: "50px 50px",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-200 w-300 -translate-x-1/2 rounded-full bg-emerald-600/80 blur-[200px] dark:bg-emerald-600/40"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{ zIndex: -1 }}
      />
    </section>
  );
};
