"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import {
  User,
  CreditCard,
  Bell,
  Palette,
  Database,
  Key,
  Users,
} from "lucide-react";

const settingsItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    description: "Manage your personal information",
  },
  {
    title: "Billing",
    href: "/profile/billing",
    icon: CreditCard,
    description: "Payment methods & subscription",
  },
  {
    title: "Sessions",
    href: "/profile/sessions",
    icon: Users,
    description: "Active sessions & devices",
  },
  {
    title: "Notifications",
    href: "/profile/notifications",
    icon: Bell,
    description: "Email & push notifications",
  },
  {
    title: "Appearance",
    href: "/profile/appearance",
    icon: Palette,
  },
  {
    title: "API Keys",
    href: "/settings/api-keys",
    icon: Key,
    description: "Manage API access keys",
  },
  {
    title: "Data Export",
    href: "/settings/data",
    icon: Database,
    description: "Export or delete your data",
  },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-[calc(100vh-2rem)] flex-col justify-between space-y-2 rounded-3xl bg-white/5 p-4">
      <div>
        <h1>
          <div className="mb-4 ml-2 text-2xl font-bold">Settings</div>
        </h1>

        <div className="space-y-1">
          {settingsItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-5 py-2.5 transition-colors duration-200",
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                    : "text-white hover:bg-white/10",
                )}
              >
                <Icon className={cn("size-6", isActive ? "text-white" : "")} />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "w-full rounded-2xl",
          )}
        >
          Home
        </Link>
        <div
          onClick={() => signOut()}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full rounded-2xl bg-red-600 hover:bg-red-800!",
          )}
        >
          Sign Out
        </div>
      </div>
    </nav>
  );
}
