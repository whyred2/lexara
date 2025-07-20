"use client";

import * as React from "react";
import Link from "next/link";

import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = React.useState<boolean>(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-2 text-2xl font-bold text-emerald-600">Sign In</h1>
      <p className="mb-4">
        Please enter your credentials to sign in to your account.
      </p>
      <AuthForm isSignIn={isSignIn} />

      <div className="mt-4">
        <p>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="font-semibold text-emerald-400 hover:underline"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </main>
  );
}
