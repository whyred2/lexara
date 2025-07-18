"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { PricingCard } from "@/components/ui/home-ui";
import { PricingTable } from "@/components/home/pricing-table";

import { useTranslatedContent } from "@/hooks/use-translated-content";

import { cn } from "@/lib/utils";

export const PricingSection = () => {
  const [isYearly, setIsYearly] = React.useState<boolean>(false);
  const { pricing } = useTranslatedContent();
  const t = useTranslations("Home.PricingSection.pricingCards");
  const locale = useLocale();

  return (
    <section
      id="pricing"
      className="relative min-h-screen w-full pt-30"
      aria-label="Pricing Section"
    >
      {/* Text Content */}
      <div className="mx-auto flex h-full w-[90%] flex-col items-center gap-10">
        <div className="text-center">
          <h2 className="text-6xl font-bold">{t("title")}</h2>
          <p className="text-foreground/70 dark:text-foreground/50 mt-6 max-w-7xl text-lg">
            {t("description")}
          </p>
        </div>
        {/* Pricing Switcher */}
        <div className="grid w-fit grid-cols-3 items-center gap-4">
          <Label
            htmlFor="pricing-switcher"
            className="justify-self-end text-lg"
          >
            {t("priceSwitcher.monthly")}
          </Label>
          <Switch
            id="pricing-switcher"
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="justify-self-center"
          />
          <div className="relative flex items-center gap-2 justify-self-start">
            <Label htmlFor="pricing-switcher" className="text-lg">
              {t("priceSwitcher.yearly")}
            </Label>
            <div
              className={cn(
                "bg-background absolute rounded-full px-2 py-1 text-xs text-nowrap",
                locale === "ru" || locale === "ua" ? "left-28" : "left-16",
              )}
            >
              <div className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-800 shadow-[0_0_10px_0px_rgba(0,153,102,0.4)]" />
              20% off
            </div>
          </div>
        </div>
        {/* Pricing Cards */}
        <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-3">
          {pricing?.map((plan, index) => (
            <PricingCard
              key={index}
              type={plan.type}
              title={plan.title}
              priceMonthly={plan.priceMonthly}
              priceYearly={plan.priceYearly}
              description={plan.description}
              features={plan.features}
              highlight={plan.highlight}
              isYearly={isYearly}
            />
          ))}
        </div>
      </div>

      <PricingTable items={pricing} isYearly={isYearly} />
    </section>
  );
};
