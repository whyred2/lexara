"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

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

  const handleLocaleChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    // Обновляем страницу для перезагрузки локали
    router.refresh();
  };

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger
        className={cn(locale === "ru" || locale === "ua" ? "w-46" : "w-40")}
        aria-label="Language Selector"
      >
        <Icons.globe className="h-5 w-5" />
        <SelectValue>{getLanguageDisplayName(locale)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ua">Українська</SelectItem>
        <SelectItem value="ru">Русский</SelectItem>
      </SelectContent>
    </Select>
  );
}
