"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";

import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { createUserAuthSchema } from "@/lib/validation/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";

type FormData = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

interface AuthFormProps {
  isSignIn?: boolean;
}

export const AuthForm = ({ isSignIn }: AuthFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isShowingPassword, setIsShowingPassword] =
    React.useState<boolean>(false);

  const router = useRouter();
  const { data: session } = useSession();

  const locale = useLocale();
  const t = useTranslations("Auth.form");
  const tMessages = useTranslations("Auth.messages");
  const tAuth = useTranslations("Auth.validation");

  // Создайте схему с переводами
  const authSchema = React.useMemo(() => {
    return createUserAuthSchema(tAuth);
  }, [tAuth]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(
      isSignIn ? authSchema.pick({ email: true, password: true }) : authSchema,
    ),
  });

  // Redirect if already authenticated
  React.useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    toast.dismiss();

    try {
      if (isSignIn) {
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          switch (result.error) {
            case "CredentialsSignin":
              toast.error(tMessages("errors.invalidCredentials"));
              break;
            case "AccessDenied":
              toast.error(tMessages("errors.accessDenied"));
              break;
            default:
              toast.error(tMessages("errors.generalError"));
          }
        } else if (result?.ok) {
          toast.success(tMessages("success.signedIn"));
          router.push("/dashboard");
        }
      } else {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": locale,
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            locale,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(
            error.message || tMessages("errors.registrationFailed"),
          );
        }

        toast.success(tMessages("success.accountCreated"));

        const signInResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (signInResult?.ok) {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : tMessages("errors.submissionError"),
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handleGuestSignIn = async () => {
    setIsLoading(true);
    try {
      toast.success(tMessages("success.guestMode"));
      router.push("/dashboard?mode=guest");
    } catch (error) {
      toast.error(tMessages("errors.guestSignInFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name field */}
        <AnimatePresence>
          {!isSignIn && (
            <motion.div
              key="name-field"
              initial={{ opacity: 0, scaleY: 0, originY: 0, height: 0 }}
              animate={{ opacity: 1, scaleY: 1, originY: 0, height: "auto" }}
              exit={{ opacity: 0, scaleY: 0, originY: 0, height: 0 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
              className="origin-top overflow-hidden"
            >
              <div className="mb-4 grid space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  placeholder={t("namePlaceholder")}
                  type="text"
                  {...register("name")}
                  disabled={isLoading}
                  isError={!!errors.name}
                />
                {errors.name && (
                  <p className="-mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email field */}
        <div className="mb-4 grid space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            placeholder={t("emailPlaceholder")}
            type="email"
            {...register("email")}
            disabled={isLoading}
            isError={!!errors.email}
          />
          {errors.email && (
            <p className="-mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password field */}
        <div className="mb-4 grid space-y-2">
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="password">{t("password")}</Label>
            {isSignIn && (
              <Link
                href="/auth/forgot-password"
                className="font-light text-white/80 underline-offset-4 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info(tMessages("info.forgotPasswordSoon"));
                }}
              >
                {t("forgotPassword")}
              </Link>
            )}
          </div>
          <div className="relative">
            <Input
              id="password"
              placeholder={t("passwordPlaceholder")}
              type={isShowingPassword ? "text" : "password"}
              {...register("password")}
              disabled={isLoading}
              isError={!!errors.password}
              className="w-full pr-12"
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 -translate-y-1/2"
              onClick={() => setIsShowingPassword((prev) => !prev)}
              disabled={isLoading}
              aria-label={isShowingPassword ? "Hide password" : "Show password"}
            >
              {isShowingPassword ? (
                <Icons.eyeOff className="size-6" />
              ) : (
                <Icons.eye className="size-6" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="-mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <AnimatePresence>
          {!isSignIn && (
            <motion.div
              key="confirm-password-field"
              initial={{ opacity: 0, scaleY: 0, originY: 0, height: 0 }}
              animate={{ opacity: 1, scaleY: 1, originY: 0, height: "auto" }}
              exit={{ opacity: 0, scaleY: 0, originY: 0, height: 0 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
              className="origin-top overflow-hidden"
            >
              <div className="mb-4 grid space-y-2">
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    placeholder={t("confirmPasswordPlaceholder")}
                    type={isShowingPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    disabled={isLoading}
                    isError={!!errors.confirmPassword}
                    className="w-full pr-12"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                    onClick={() => setIsShowingPassword((prev) => !prev)}
                    disabled={isLoading}
                    aria-label={
                      isShowingPassword ? "Hide password" : "Show password"
                    }
                  >
                    {isShowingPassword ? (
                      <Icons.eyeOff className="size-6" />
                    ) : (
                      <Icons.eye className="size-6" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="-mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          className={cn(
            buttonVariants({ variant: "default" }),
            "relative w-full overflow-hidden",
          )}
          disabled={isLoading}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading && <Icons.loader className="size-5 animate-spin" />}
            {isSignIn
              ? isLoading
                ? t("signIn.submitting")
                : t("signIn.button")
              : isLoading
                ? t("signUp.submitting")
                : t("signUp.button")}
          </span>
        </button>
      </form>

      {/* Guest Sign In - только для Sign In */}
      {isSignIn && (
        <button
          type="button"
          className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          onClick={handleGuestSignIn}
          disabled={isLoading}
        >
          <Icons.user className="size-5" />
          {t("signIn.guestMode")}
        </button>
      )}

      {/* Divider */}
      <div className="flex items-center">
        <div className="h-px w-full flex-1 bg-white/10" />
        <div className="flex justify-center text-xs uppercase">
          <span className="px-3">{t("continueWith")}</span>
        </div>
        <div className="h-px w-full flex-1 bg-white/10" />
      </div>

      {/* OAuth Buttons */}
      <OAuthButtons isLoading={isLoading} />
    </div>
  );
};
