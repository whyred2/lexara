"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <section
      className="relative h-screen w-full overflow-hidden border-b pt-25 dark:border-white/5"
      style={{
        backgroundImage:
          theme === "dark"
            ? "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)"
            : "linear-gradient(180deg, transparent 50%, rgba(255,255,255,0.6) 100%)",
      }}
    >
      <div className="mx-auto flex h-full w-[90%] flex-col items-center">
        {/* Text Content */}
        <h1 className="text-6xl leading-tight font-bold">
          Organize your tasks and goals with{" "}
          <span className="text-primary">Nexara</span>
        </h1>
        <p className="mx-auto mt-8 text-lg text-black/80 dark:text-white/80">
          A modern tool for task management and goal achievement. Organize your
          life effectively and easily.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "mt-6 text-lg")}
        >
          Start for free
        </Link>
        {/* Illustration Mac Window */}
        <div className="z-10 mt-10 h-full w-full px-25">
          <div className="relative h-full w-full rounded-t-lg border-t border-black/10 bg-black/10 px-3 pt-9 shadow-2xl backdrop-blur-md dark:border-white/5 dark:bg-white/2.5">
            <div className="absolute top-3 flex items-center gap-1.5">
              <div className="flex size-3 items-center justify-center rounded-full bg-neutral-800">
                <motion.div
                  className="size-1.5 rounded-full bg-neutral-400/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
              <div className="size-3 rounded-full bg-neutral-700" />
              <div className="size-3 rounded-full bg-neutral-600" />
            </div>
            <div className="flex h-full w-full items-center justify-center rounded-t-lg bg-gradient-to-b from-neutral-800 to-neutral-700">
              Illustration
            </div>
          </div>
        </div>
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
