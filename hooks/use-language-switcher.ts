"use client";

import { useLocale } from "next-intl";
import { type Locale } from "@/i18n/config";

export function useLanguageSwitcher() {
  const currentLocale = useLocale() as Locale;

  const switchLanguage = (locale: Locale) => {
    // Set cookie
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // Reload the page to apply new locale
    window.location.reload();
  };

  return {
    currentLocale,
    switchLanguage,
  };
}
