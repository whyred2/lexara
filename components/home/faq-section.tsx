"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { useTranslatedContent } from "@/hooks/use-translated-content";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const t = useTranslations("Home.FAQSection");
  const { faq } = useTranslatedContent();

  return (
    <section
      className="relative min-h-screen w-full py-20"
      aria-label="FAQ Section"
    >
      <div className="mx-auto w-[90%] max-w-4xl">
        {/* Header */}
        <div className="mb-16 flex max-w-7xl flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-medium text-emerald-400">FAQ</h2>
            <h1 className="mt-2 text-5xl font-bold">{t("title")}</h1>
            <p className="mt-4 text-lg text-white/70">{t("description")}</p>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0.6, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Accordion type="multiple" className="flex w-full flex-col gap-4">
            {faq.map((item, index) => (
              <AccordionItem
                key={`item-${index + 1}`}
                value={`item-${index + 1}`}
              >
                <AccordionTrigger className="text-left text-xl font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/80">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-white/70">
            {t("contact.title")}{" "}
            <Link
              href="/contact"
              className="font-semibold text-emerald-400 hover:underline"
            >
              {t("contact.cta")}
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.div
        className="absolute top-20 right-10 -z-10 size-60 rounded-full bg-emerald-600 blur-[120px]"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 -z-10 size-60 rounded-full bg-emerald-600 blur-[100px]"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.5 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
    </section>
  );
};
