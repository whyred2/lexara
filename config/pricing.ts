import { PricingConfig } from "@/types";

export const pricingConfig: PricingConfig = {
  plans: [
    {
      title: "Personal",
      priceMonthly: "Free",
      priceYearly: "Free",
      description: "Basic features to manage your tasks and goals.",
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
      title: "Pro",
      priceMonthly: "$4/mo",
      priceYearly: "$40/yr",
      description: "Advanced tools for power users.",
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
      title: "Team",
      priceMonthly: "$10/mo",
      priceYearly: "$100/yr",
      description: "Collaborate and grow with your team.",
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
