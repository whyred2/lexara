"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useLanguageSwitcher } from "@/hooks/use-language-switcher";

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("Footer");
  const { currentLocale, switchLanguage } = useLanguageSwitcher();

  const getLanguageDisplayName = (locale: string) => {
    switch (locale) {
      case "en":
        return "English";
      case "ru":
        return "Русский";
      case "ua":
        return "Українська";
      default:
        return "English";
    }
  };

  return (
    <footer className="relative mt-20 w-full bg-gradient-to-b to-emerald-950">
      {/* Main Footer Content */}
      <div className="mx-auto w-[90%] px-6 py-16">
        {/* Top Section - Logo & Newsletter */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <h1 className="text-5xl font-bold">Lexara</h1>
            <p className="max-w-md text-lg text-white/60">{t("tagline")}</p>
          </div>

          {/* Newsletter Signup */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <form className="flex w-full max-w-md flex-col gap-3">
              <h3 className="text-right text-xl font-semibold">
                {t("newsletter.title")}
              </h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="w-80 flex-1"
                />
                <button
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "px-6 whitespace-nowrap",
                  )}
                >
                  {t("newsletter.subscribe")}
                </button>
              </div>
              <p className="text-right text-sm text-white/50">
                {t("newsletter.privacy")}{" "}
                <Link href="/" className="text-emerald-400 hover:underline">
                  {t("legal.privacy")}
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="my-16 h-px w-full bg-white/10" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">{t("company.title")}</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("company.about")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("company.careers")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("company.blog")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("company.contact")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">{t("products.title")}</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("products.desktop")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("products.mobile")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("products.web")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("products.api")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">{t("support.title")}</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("support.help")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("support.docs")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("support.community")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("support.status")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">{t("legal.title")}</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("legal.privacy")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("legal.terms")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("legal.cookies")}
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                {t("legal.security")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mx-auto w-[90%] border-t border-white/10">
        <div className="px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span>{t("copyright")}</span>
            </div>

            <div className="flex items-center gap-2">
              <Select
                value={currentLocale}
                onValueChange={(value: "en" | "ru" | "ua") =>
                  switchLanguage(value)
                }
              >
                <SelectTrigger
                  className={cn(
                    locale === "ru" || locale === "ua" ? "w-46" : "w-40",
                  )}
                  aria-label="Language Selector"
                >
                  <Icons.globe className="h-5 w-5" />
                  <SelectValue>
                    {getLanguageDisplayName(currentLocale)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ua">Українська</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
