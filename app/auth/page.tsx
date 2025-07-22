"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { AuthForm } from "@/components/auth/auth-form";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = React.useState<boolean>(true);
  const t = useTranslations("Auth");

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br via-emerald-900/20">
      {/* Logo */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/" className="text-3xl font-bold">
          Lexara
        </Link>
      </div>

      {/* Background decoration */}
      <div
        className={cn(
          "absolute inset-0 -left-5.5 -z-10",
          "dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px,transparent),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)]",
          "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px,transparent),linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px)]",
        )}
        style={{
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-3 text-3xl font-bold text-emerald-500">
            {isSignIn ? t("signIn.title") : t("signUp.title")}
          </h1>
          <p className="text-lg text-white/80">
            {isSignIn ? t("signIn.subtitle") : t("signUp.subtitle")}
          </p>
        </motion.div>

        {/* Auth Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-2xl border border-emerald-900/80 bg-gradient-to-b via-transparent to-emerald-900/20 p-6 backdrop-blur-md"
        >
          <AuthForm isSignIn={isSignIn} />
        </motion.div>

        {/* Toggle Mode */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-400">
            {isSignIn ? t("signIn.noAccount") : t("signUp.alreadyHaveAccount")}{" "}
            <button
              type="button"
              onClick={() => setIsSignIn(!isSignIn)}
              className="font-semibold text-emerald-400 transition-colors duration-200 hover:text-emerald-300 hover:underline"
            >
              {isSignIn ? t("signIn.signUpLink") : t("signUp.signInLink")}
            </button>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
