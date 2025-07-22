import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ru", "ua"],
  defaultLocale: "en",
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
