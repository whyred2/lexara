"use client";

import * as React from "react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { PricingCard } from "@/components/ui/home-ui";
import { PricingPlan } from "@/types";
import { PricingTable } from "@/components/home/pricing-table";

interface PricingSectionProps {
  items?: PricingPlan[];
}

export const PricingSection = ({ items }: PricingSectionProps) => {
  const [isYearly, setIsYearly] = React.useState<boolean>(false);

  return (
    <section
      id="pricing"
      className="relative min-h-screen w-full pt-30"
      aria-label="Pricing Section"
    >
      {/* Text Content */}
      <div className="mx-auto flex h-full w-[90%] flex-col items-center gap-10">
        <div className="text-center">
          <h2 className="text-6xl font-bold">Pricing & Plans</h2>
          <p className="text-foreground/70 dark:text-foreground/50 mt-6 max-w-xl text-lg">
            Choose the plan that fits your workflow and start achieving more
            today.
          </p>
        </div>
        {/* Pricing Switcher */}
        <div className="grid w-fit grid-cols-3 items-center gap-4">
          <Label
            htmlFor="pricing-switcher"
            className="justify-self-end text-lg"
          >
            Monthly
          </Label>
          <Switch
            id="pricing-switcher"
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="justify-self-center"
          />
          <div className="relative flex items-center gap-2 justify-self-start">
            <Label htmlFor="pricing-switcher" className="text-lg">
              Yearly
            </Label>
            <div className="bg-background absolute left-16 rounded-full px-2 py-1 text-xs text-nowrap">
              <div className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-800 shadow-[0_0_10px_0px_rgba(0,153,102,0.4)]" />
              20% off
            </div>
          </div>
        </div>
        {/* Pricing Cards */}
        <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items?.map((plan, index) => (
            <PricingCard
              key={index}
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

      <PricingTable items={items} isYearly={isYearly} />
    </section>
  );
};
