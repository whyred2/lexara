"use client";

import { useTranslations } from "next-intl";
import { pricingConfig } from "@/config/pricing";
import { contentConfig } from "@/config/content";
import { FeatureItem, FAQItem, PricingPlan } from "@/types";

export function useTranslatedContent() {
  const tFeatures = useTranslations("Home.FeaturesSection");
  const tPricing = useTranslations("Home.PricingSection.pricingCards");
  const tFAQ = useTranslations("Home.FAQSection");

  const getTranslatedFeatures = (): FeatureItem[] => {
    return contentConfig.features.map((item) => ({
      icon: item.icon,
      title: tFeatures(`cards.${item.title}.title`),
      subtTitle: tFeatures(`cards.${item.subtTitle}.subtitle`),
      description: tFeatures(`cards.${item.description}.description`),
    }));
  };

  const getTranslatedPricing = (): PricingPlan[] => {
    return pricingConfig.plans.map((plan) => ({
      type: plan.type,
      title: tPricing(`plans.${plan.title}.title`),
      priceMonthly: tPricing(`plans.${plan.priceMonthly}.priceMonthly`),
      priceYearly: tPricing(`plans.${plan.priceYearly}.priceYearly`),
      description: tPricing(`plans.${plan.description}.description`),
      features: plan.features.map((_, index) =>
        tPricing(`plans.${plan.title}.features.${index}`),
      ),
      highlight: plan.highlight,
    }));
  };

  const getTranslatedFAQ = (): FAQItem[] => {
    return contentConfig.faq.map((faq, index) => ({
      question: tFAQ(`items.${index}.question`) || faq.question,
      answer: tFAQ(`items.${index}.answer`) || faq.answer,
    }));
  };

  return {
    features: getTranslatedFeatures(),
    pricing: getTranslatedPricing(),
    faq: getTranslatedFAQ(),
  };
}
