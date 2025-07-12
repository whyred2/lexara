"use client";

import * as React from "react";
import { motion } from "motion/react";

import { Icons } from "@/components/icons";

const FeatureItem = [
  {
    icon: "calendarClock",
    title: "Plan",
    subtTitle: "Smart scheduling",
    desctiption:
      "Create tasks, set deadlines, and group them by goals - everything you need to stay on top of your day. A clear structure keeps you productive and stress-free.",
  },
  {
    icon: "chartNoAxes",
    title: "Track",
    subtTitle: "Real-time progress",
    desctiption:
      "Visualize your journey with real-time statistics and goal tracking. Celebrate your achievements and stay motivated by seeing how far you've come.",
  },
  {
    icon: "monitorSmartphone",
    title: "Platform",
    subtTitle: "Cross-Platform Access",
    desctiption:
      "Access your tasks from anywhere - desktop, tablet, or mobile. All your data stays in sync and securely stored in the cloud.",
  },
];

interface FeatureItemCardProps {
  icon?: React.ReactNode;
  title: string;
  subtTitle: string;
  desctiption: string;
}

const FeaturesItemCard = ({
  icon,
  title,
  subtTitle,
  desctiption,
}: FeatureItemCardProps) => {
  return (
    <div className="z-10 w-100 rounded-2xl border p-2 shadow-2xl backdrop-blur-md dark:border-white/5 dark:bg-white/2.5">
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-bl from-emerald-900 to-emerald-400">
        {/* Icon */}

        <div className="absolute -top-0 -left-12 size-55">
          {React.createElement(Icons[icon as keyof typeof Icons], {
            className: "h-full w-full text-emerald-400",
          })}
        </div>
        {/* Content */}
        <div className="mt-55 flex h-full flex-col items-start gap-4 p-6">
          <h1
            className="font-poppins text-7xl font-extrabold text-transparent"
            style={{
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "#fff",
            }}
          >
            {title}
          </h1>
          <h2 className="text-3xl font-bold">{subtTitle}</h2>
          <p className="text-lg text-white/80">{desctiption}</p>
        </div>
      </div>
    </div>
  );
};

export const FeaturesSection = () => {
  return (
    <section
      className="relative min-h-screen w-full bg-gradient-to-b from-emerald-900/20 pt-20"
      aria-label="Features Section"
    >
      <div className="mx-auto flex h-full w-[90%] flex-col items-center gap-10">
        {/* Text Content */}
        <div className="mb-10 text-center">
          <h1 className="max-w-3xl text-center text-4xl font-bold">
            Powerful features designed to help you stay focused and reach your
            goals faster.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Unlock your productivity with features designed to help you plan,
            track, and achieve your goals effectively.
          </p>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FeatureItem.map((item, index) => (
            <FeaturesItemCard
              key={index}
              icon={item.icon}
              title={item.title}
              subtTitle={item.subtTitle}
              desctiption={item.desctiption}
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
