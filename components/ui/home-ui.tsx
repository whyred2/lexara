"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

import { PricingPlan } from "@/types";

interface MacWindowProps {
  children?: React.ReactNode;
}

interface PopularPlanProps {
  children?: React.ReactNode;
}

interface FeatureItemCardProps {
  icon: string;
  title: string;
  subtTitle: string;
  description: string;
  index?: number;
}

export const MacWindow = ({ children }: MacWindowProps) => {
  return (
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
          {children}
        </div>
      </div>
    </div>
  );
};

export const FeaturesItemCard = ({
  icon,
  title,
  subtTitle,
  description,
  index = 0,
}: FeatureItemCardProps) => {
  const locale = useLocale();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="z-10 w-110 rounded-2xl border p-2 shadow-2xl backdrop-blur-md dark:border-white/5 dark:bg-white/2.5"
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-bl from-emerald-900 to-emerald-400">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          viewport={{ once: true }}
          className="absolute -top-0 -left-12 size-55"
        >
          {React.createElement(Icons[icon as keyof typeof Icons], {
            className: "h-full w-full text-emerald-400",
          })}
        </motion.div>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
          viewport={{ once: true }}
          className="flex h-full flex-col items-start gap-4 p-6 pt-61"
        >
          <h1
            className={cn(
              locale === "ru" && "break-words",
              locale === "ua" && "break-words",
              "w-full bg-gradient-to-r from-emerald-700 to-emerald-950 bg-clip-text text-7xl font-extrabold text-transparent",
            )}
          >
            {title}
          </h1>
          <h2
            className={cn(
              locale === "ru" && "min-h-18",
              locale === "ua" && "min-h-18",
              "text-3xl font-bold",
            )}
          >
            {subtTitle}
          </h2>
          <p className="line-clamp-6 text-lg text-white/80">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const PopularPlan = ({ children }: PopularPlanProps) => {
  const t = useTranslations("Home.PricingSection");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true }}
      className="absolute top-6 right-6 flex items-center gap-2 rounded-full border border-white/10 bg-emerald-600/40 px-3 py-2 font-medium"
    >
      <Icons.sparkles className="size-5" />
      {children || t("popular")}
    </motion.div>
  );
};

export const PricingCard = ({
  type,
  title,
  priceMonthly,
  priceYearly,
  description,
  features,
  highlight,
  isYearly,
}: PricingPlan & { isYearly: boolean }) => {
  const t = useTranslations("Home.PricingSection.pricingCards");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: type === "pro" ? 0.2 : type === "team" ? 0.4 : 0,
      }}
      viewport={{ once: true }}
      className={cn(
        "relative flex max-w-[430px] flex-col overflow-hidden rounded-2xl border bg-white/2.5 p-6 shadow-lg backdrop-blur-md transition-all duration-300",
        highlight &&
          "from-background bg-gradient-to-b to-emerald-950 text-white shadow-[0_0_8px_0px_rgba(0,153,102,0.2)] inset-shadow-[0_0_8px_0px_rgba(0,153,102,0.2)]",
        highlight ? "border-emerald-600" : "border-white/5",
      )}
    >
      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className={cn(
            "w-fit rounded-full p-3",
            type === "pro" ? "bg-emerald-400" : "bg-white/20",
          )}
        >
          <div
            className={cn(
              "size-5 border-3 border-black",
              type === "personal" && "rounded-full",
              type === "pro" && "rounded-md",
              type === "team" && "rotate-45 rounded-md",
            )}
          />
        </motion.div>

        <h3 className="text-2xl font-semibold">{title}</h3>
        <div className="flex flex-col gap-2">
          <motion.p
            key={`${isYearly}-${title}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-extrabold"
          >
            {isYearly ? priceYearly : priceMonthly}
          </motion.p>
          <p className="text-base text-white/60">{description}</p>
        </div>
      </div>

      {highlight && <PopularPlan />}

      <motion.button
        whileTap={{ scale: 0.99 }}
        className={cn(
          highlight &&
            "rounded-full border-2 border-emerald-500 bg-gradient-to-br from-emerald-600/80 to-emerald-900/80 px-4 py-2 text-white shadow-[0_0_20px_0px_rgba(0,153,102,0.2)] hover:bg-emerald-700",
          !highlight &&
            buttonVariants({
              variant: "outline",
            }),
          "mt-6 w-full",
        )}
      >
        {highlight ? t("plans.pro.cta") : t("plans.personal.cta")}
      </motion.button>

      <div className="my-8 h-px w-full bg-white/5" />

      <ul className="flex-1 space-y-3">
        {features.map((feat, index) => (
          <motion.li
            key={feat}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-foreground flex items-center gap-3"
          >
            <Icons.check className="text-success size-5" />
            <span>{feat}</span>
          </motion.li>
        ))}
      </ul>

      {/* Card background */}
      {highlight && (
        <motion.div
          className="absolute top-0 -right-0 -z-10 size-30 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 blur-[100px]"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </motion.div>
  );
};
