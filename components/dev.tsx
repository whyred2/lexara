"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export const Dev = () => {
  const [hide, setHide] = React.useState<boolean>(false);

  if (process.env.NODE_ENV === "development") return null;
  return (
    <div
      onClick={() => setHide(!hide)}
      className={cn(
        "fixed bottom-5 left-1/2 z-50 -translate-x-1/2 cursor-pointer rounded-full bg-red-800 px-4 py-2 text-white transition-transform duration-300 ease-in-out hover:bg-red-950",
        hide && "translate-y-12 opacity-5 hover:opacity-100",
      )}
    >
      Project is in development. Please check back later. Last updated:
      15.05.2025 0:13 (UTC+2)
    </div>
  );
};
