// i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { headers, cookies } from "next/headers";
import { defaultLocale, locales, type Locale } from "./config";

async function getLocale(): Promise<Locale> {
  try {
    // Check cookies first
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get("locale")?.value;

    if (localeCookie && locales.includes(localeCookie as Locale)) {
      return localeCookie as Locale;
    }

    // Fallback to Accept-Language header
    const headerStore = await headers();
    const acceptLanguage = headerStore.get("accept-language");

    if (acceptLanguage) {
      for (const locale of locales) {
        if (acceptLanguage.includes(locale)) {
          return locale;
        }
      }
    }
  } catch (error) {
    console.warn("Error getting locale:", error);
  }

  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await getLocale();

  try {
    // Синхронное статическое определение модулей
    let messages;

    if (locale === "ru") {
      messages = (await import("@/messages/ru.json")).default;
    } else if (locale === "ua") {
      messages = (await import("@/messages/ua.json")).default;
    } else {
      messages = (await import("@/messages/en.json")).default;
    }

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error("Error loading messages:", error);
    // Fallback to English
    const messages = (await import("@/messages/en.json")).default;
    return {
      locale: defaultLocale,
      messages,
    };
  }
});
