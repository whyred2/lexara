import { getRequestConfig } from "next-intl/server";
import { headers, cookies } from "next/headers";
import { defaultLocale, locales, type Locale } from "./config";

async function getLocale(): Promise<Locale> {
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

  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await getLocale();

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
