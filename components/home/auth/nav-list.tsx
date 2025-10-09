"use client";

import * as React from "react";
import Link from "next/link";

import { Icons } from "@/components/icons";

export function NavList() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="relative flex h-screen w-100 flex-col justify-between bg-blue-500/10 p-4">
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer rounded-full bg-white/10 p-2"
          >
            <Icons.menu className="size-6 transition-transform duration-300 ease-in-out" />
          </div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="mt-6">
          <div className="flex h-10 w-full items-center gap-4 rounded-2xl bg-white/10 px-4 hover:bg-white/20">
            <Icons.clipboardPlus className="size-5" />
            <span className="text-sm">New project</span>
          </div>

          <h2 className="mt-10 px-4 text-lg font-medium text-white/80">
            Recent
          </h2>
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex h-10 w-full items-center rounded-2xl bg-white/10 px-4 hover:bg-white/20">
              <span className="text-sm">Example1</span>
            </div>
            <div className="flex h-10 w-full items-center rounded-2xl bg-white/10 px-4 hover:bg-white/20">
              <span className="text-sm">Example2</span>
            </div>
            <div className="flex h-10 w-full items-center rounded-2xl bg-white/10 px-4 hover:bg-white/20">
              <span className="text-sm">Example3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Link
          href="/"
          className="flex h-10 w-full items-center gap-4 rounded-2xl bg-white/10 px-4 hover:bg-white/20"
        >
          <Icons.home className="size-5" />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          href="/profile"
          className="flex h-10 w-full items-center gap-4 rounded-2xl bg-white/10 px-4 hover:bg-white/20"
        >
          <Icons.user className="size-5" />
          <span className="text-sm">Profile</span>
        </Link>
      </div>
    </div>
  );
}
