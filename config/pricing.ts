import { PricingConfig } from "@/types";

export const pricingConfig: PricingConfig = {
  plans: [
    {
      type: "personal",
      title: "personal",
      priceMonthly: "personal",
      priceYearly: "personal",
      description: "personal",
      features: [
        "1 user",
        "Unlimited tasks",
        "Basic analytics",
        "Community support",
        "Cross-platform access",
      ],
      highlight: false,
    },
    {
      type: "pro",
      title: "pro",
      priceMonthly: "pro",
      priceYearly: "pro",
      description: "pro",
      features: [
        "10 users",
        "Everything in Free",
        "Priority support",
        "Team collaboration",
        "Custom themes",
      ],
      highlight: true,
    },
    {
      type: "team",
      title: "team",
      priceMonthly: "team",
      priceYearly: "team",
      description: "team",
      features: [
        "100 users",
        "Everything in Pro",
        "User roles & permissions",
        "Dedicated onboarding",
        "Shared team dashboards",
      ],
      highlight: false,
    },
  ],
};
