"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTranslatedContent } from "@/hooks/use-translated-content";

import { FeaturesItemCard } from "@/components/ui/home-ui";

export const FeaturesSection = () => {
  const t = useTranslations("Home.FeaturesSection");
  const { features } = useTranslatedContent();

  return (
    <section
      className="relative min-h-screen w-full bg-gradient-to-b from-emerald-900/20 pt-20"
      aria-label="Features Section"
    >
      <div className="mx-auto flex h-full w-[90%] flex-col items-center gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 max-w-7xl text-center"
        >
          <h1 className="text-center text-4xl font-bold">{t("title")}</h1>
          <p className="mt-4 text-center text-lg text-white/80">
            {t("description")}
          </p>
        </motion.div>
        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((item, index) => (
            <FeaturesItemCard
              key={index}
              icon={item.icon}
              title={item.title}
              subtTitle={item.subtTitle}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </div>
      {/* Backgrounds */}
      <motion.div
        className="absolute top-0 left-1/2 -z-10 size-200 -translate-1/2 rounded-full bg-emerald-500 blur-[300px]"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute top-0 -z-20 h-full w-full bg-gradient-to-b from-emerald-900/20" />
    </section>
  );
};
