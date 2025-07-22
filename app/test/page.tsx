"use client";

import { toast } from "react-toastify";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-xl border border-white/5 bg-white/2.5 p-4">
      {children}
    </div>
  );
};

export default function TestPage() {
  return (
    <div className="w-[90%]gap-4 mx-auto min-h-screen py-10">
      <h1 className="text-center text-3xl font-bold">Playground Page</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Toasts */}
        <Card>
          <h1>Toasts</h1>
          <button
            onClick={() => toast("Hello, World!")}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Show Toast
          </button>
          <button
            type="button"
            onClick={() => toast.info("This is a test toast!")}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Info Toast
          </button>
          <button
            type="button"
            onClick={() => toast.error("This is an error toast!")}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Error Toast
          </button>
          <button
            type="button"
            onClick={() => toast.success("This is a success toast!")}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Success Toast
          </button>
          <button
            type="button"
            onClick={() => toast.warning("This is a warning toast!")}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Warning Toast
          </button>
        </Card>
        {/* Button Variants */}
        <Card>
          <h1>Button Variants</h1>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
          >
            Default Button
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Secondary Button
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Outline Button
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
          >
            Ghost Button
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "link" }), "w-full")}
          >
            Link Button
          </button>
        </Card>
      </div>
    </div>
  );
}
