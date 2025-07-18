"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { ThemeChanger } from "@/components/theme-changer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { HeaderNavigation } from "@/types";

interface HeaderProps {
  items: HeaderNavigation[];
}

export const Header = ({ items }: HeaderProps) => {
  const { logo, links } = items[0];
  const t = useTranslations("Header");

  return (
    <header className="fixed top-4 left-1/2 z-100 w-[90%] -translate-x-1/2">
      {items?.length > 0 && (
        <div className="flex items-center justify-between">
          <Link href={logo.href} className="flex items-center">
            <span className="text-2xl font-bold">{logo.text}</span>
          </Link>

          <nav
            className="flex items-center justify-between gap-2 rounded-full border border-white/5 bg-black/5 p-1 shadow-xl backdrop-blur-md dark:bg-white/2.5"
            role="navigation"
            aria-label="Main Navigation"
          >
            <ThemeChanger />
            <ul className="flex items-center">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "rounded-full",
                    )}
                  >
                    {t(link.text)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="h-10 w-px bg-black/60 dark:bg-white/60" />
            <div className="flex gap-2">
              <Link
                href={"/sign-in"}
                className={buttonVariants({ variant: "secondary" })}
              >
                {t("auth.signIn")}
              </Link>
              <Link
                href={"/sign-up"}
                className={buttonVariants({ variant: "default" })}
              >
                {t("auth.signUp")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
