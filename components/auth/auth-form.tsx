"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { userAuthSchema } from "@/lib/validation/auth";
import { cn } from "@/lib/utils";

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

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(
      isSignIn
        ? userAuthSchema.pick({ email: true, password: true })
        : userAuthSchema,
    ),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      if (isSignIn) {
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          console.error("Sign in error:", result.error);
        } else {
          console.log("Signed in successfully");
        }
      } else {
        console.log("Registration data:", data);
      }
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-120 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        {/* Name field */}
        <AnimatePresence>
          {!isSignIn && (
            <motion.div
              key="name-field"
              initial={{ opacity: 0, scaleY: 0, originY: 0, height: 0 }}
              animate={{ opacity: 1, scaleY: 1, originY: 0, height: "auto" }}
              exit={{ opacity: 0, scaleY: 0, originY: 0, height: 0 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
            >
              <div className="mb-4 grid space-y-1">
                <div className="grid space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                    {...register("name")}
                    disabled={isLoading}
                    isError={!!errors.name}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email field */}
        <div className="z-10 mb-4 grid space-y-1">
          <div className="grid space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              {...register("email")}
              disabled={isLoading}
              isError={!!errors.email}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password field */}
        <div className="z-10 mb-4 grid space-y-1">
          <div className="grid space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              {...register("password")}
              disabled={isLoading}
              isError={!!errors.password}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
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
            >
              <div className="mb-4 grid space-y-1">
                <div className="grid space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    type="password"
                    {...register("confirmPassword")}
                    disabled={isLoading}
                    isError={!!errors.confirmPassword}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
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
                ? "Signing In"
                : "Sign In"
              : isLoading
                ? "Creating Account"
                : "Create Account"}
          </span>
        </button>
      </form>

      {/* OAuth Buttons */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <OAuthButtons isLoading={isLoading} signIn={signIn} />
    </div>
  );
};
