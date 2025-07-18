"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { PopularPlan } from "@/components/ui/home-ui";

import { isFeatureIncluded } from "@/lib/price-utils";
import { cn } from "@/lib/utils";
import { PricingPlan } from "@/types";

interface PricingTableProps {
  items?: PricingPlan[];
}

export const PricingTable = ({
  items,
  isYearly,
}: PricingTableProps & { isYearly: boolean }) => {
  const t = useTranslations("Home.PricingSection.pricingTable");

  const features = [
    t("features.0"),
    t("features.1"),
    t("features.2"),
    t("features.3"),
    t("features.4"),
    t("features.5"),
    t("features.6"),
    t("features.7"),
    t("features.8"),
    t("features.9"),
  ];

  return (
    <div
      className="relative min-h-screen w-full py-30"
      aria-label="Pricing Table"
    >
      <div className="mx-auto flex h-full w-[90%] flex-col items-center gap-10">
        {/* Pricing Table Header */}
        <div className="relative flex w-full max-w-7xl flex-col gap-2">
          <motion.div
            className="absolute top-1/3 left-0 -z-10 size-50 bg-emerald-600 blur-[200px]"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0.8 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <div className="grid grid-cols-4 gap-6">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-white">{t("title")}</h3>
            </div>
            {items?.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl bg-white/2.5 p-6",
                )}
              >
                {item.highlight && <PopularPlan />}
                <div className="flex w-full flex-col items-start gap-4">
                  <div
                    className={cn(
                      "rounded-full bg-white/10 p-3",
                      item.type === "personal" && "bg-blue-400",
                      item.type === "pro" && "bg-emerald-400",
                      item.type === "team" && "bg-violet-400",
                    )}
                  >
                    <div
                      className={cn(
                        "size-5 border-3 border-black",
                        item.type === "personal" && "rounded-full",
                        item.type === "pro" && "rounded-md",
                        item.type === "team" && "rotate-45 rounded-md",
                      )}
                    />
                  </div>
                  <h4 className="text-2xl">{item.title}</h4>
                  <p className="mt-2 text-4xl font-bold text-white">
                    {item.title === "personal"
                      ? item.priceMonthly
                      : isYearly
                        ? item.priceYearly
                        : item.priceMonthly}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Feature Rows */}
          {features.map((feature, featureIndex) => (
            <div key={featureIndex} className="grid grid-cols-4 gap-6">
              <div className="flex items-center p-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-neutral-300">{feature}</span>
                </div>
              </div>
              {items?.map((plan, planIndex) => (
                <div
                  key={planIndex}
                  className="flex items-center justify-center rounded-2xl bg-white/2.5"
                >
                  {isFeatureIncluded(plan, feature, items) ? (
                    <Icons.check className="size-5 text-emerald-400" />
                  ) : (
                    <Icons.minus className="size-5 text-white/40" />
                  )}
                </div>
              ))}
            </div>
          ))}
          {/* Footer with buttons */}
          <div className="grid grid-cols-4 gap-6">
            <div className="p-6"></div>
            {items?.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/2.5 p-6",
                )}
              >
                <div className="flex items-center gap-2">
                  <Icons.windows className="size-6 fill-neutral-700" />
                  <Icons.android className="size-6 fill-neutral-700" />
                </div>
                <motion.button
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    plan.highlight &&
                      "rounded-full border-2 border-emerald-500 bg-gradient-to-br from-emerald-600/80 to-emerald-900/80 px-4 py-2 text-white shadow-[0_0_20px_0px_rgba(0,153,102,0.2)] hover:bg-emerald-700",
                    !plan.highlight && buttonVariants({ variant: "outline" }),
                    "w-full",
                  )}
                >
                  {plan.type === "personal" ? t("cta.free") : t("cta.paid")}
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
