"use client";

import * as React from "react";
import { motion } from "motion/react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

import { PricingPlan } from "@/types";

interface PricingSectionProps {
  items?: PricingPlan[];
}

const PricingCard = ({
  title,
  priceMonthly,
  priceYearly,
  description,
  features,
  highlight,
  isYearly,
}: PricingPlan & { isYearly: boolean }) => {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border bg-white/2.5 p-6 shadow-lg backdrop-blur-md",
        highlight &&
          "bg-gradient-to-b to-emerald-950 text-white shadow-[0_0_8px_0px_rgba(0,153,102,0.2)] inset-shadow-[0_0_8px_0px_rgba(0,153,102,0.2)]",
        highlight ? "border-emerald-600" : "border-white/5",
      )}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-4xl font-extrabold">
          {isYearly ? priceYearly : priceMonthly}
        </p>
        <p className="text-base text-white/60">{description}</p>
      </div>

      {highlight && (
        <div className="absolute top-6 right-6 flex items-center gap-2 rounded-lg border border-white/10 bg-emerald-600/40 px-3 py-2 font-medium">
          <Icons.sparkles className="size-5" />
          Popular
        </div>
      )}
      <button
        className={cn(
          buttonVariants({
            variant: highlight ? "default" : "outline",
          }),
          "mt-6 w-full",
        )}
      >
        {highlight ? "Get Started" : "Select"}
      </button>

      <div className="my-8 h-px w-full bg-white/5" />

      <ul className="flex-1 space-y-3">
        {features.map((feat) => (
          <li key={feat} className="text-foreground flex items-center gap-3">
            <Icons.check className="text-success size-5" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      {/* Card background */}
      {highlight && (
        <motion.div
          className="absolute top-0 -right-0 -z-10 size-80 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600 blur-[150px]"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </div>
  );
};

export const PricingSection = ({ items }: PricingSectionProps) => {
  const [isYearly, setIsYearly] = React.useState<boolean>(false);

  return (
    <section
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
    </section>
  );
};
