"use client";

import Link from "next/link";
import { motion } from "motion/react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  return (
    <section
      className="relative min-h-screen w-full py-20"
      aria-label="FAQ Section"
    >
      <div className="mx-auto w-[90%] max-w-4xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-medium text-emerald-400">FAQ</h2>
            <h1 className="mt-2 text-5xl font-bold">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              Find answers to common questions about Nexara and how it can help
              you stay organized.
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="multiple" className="flex w-full flex-col gap-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-xl font-semibold">
                What is Nexara?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Nexara is a modern productivity tool designed to help you
                organize your tasks and goals efficiently. It combines intuitive
                design with powerful features to boost your productivity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-xl font-semibold">
                How do I get started?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Getting started is easy! Simply sign up for a free account on
                our website, create your first project, and start adding tasks.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-xl font-semibold">
                Is there a mobile app?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Yes! Nexara has native mobile apps available for both iOS and
                Android devices. Your data syncs seamlessly across all
                platforms, so you can stay productive wherever you are.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-xl font-semibold">
                What features does Nexara offer?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Nexara offers comprehensive features including task management,
                project tracking, real-time analytics, team collaboration,
                custom themes, priority levels, and much more to enhance your
                productivity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-xl font-semibold">
                How can I contact support?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Our support team is here to help! You can reach us via email at
                support@nexara.com, through the in-app support chat, or visit
                our comprehensive help center for detailed guides and tutorials.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left text-xl font-semibold">
                Is my data secure?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Absolutely! We use industry-standard encryption to protect your
                data both in transit and at rest. Your privacy is our priority,
                and we never share your personal information with third parties.
              </AccordionContent>
            </AccordionItem>
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
            Still have questions?{" "}
            <Link
              href="/contact"
              className="font-semibold text-emerald-400 hover:underline"
            >
              Contact Us
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.div
        className="absolute top-20 right-10 -z-10 size-60 rounded-full bg-emerald-600 blur-[150px]"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 -z-10 size-40 rounded-full bg-emerald-600 blur-[150px]"
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
