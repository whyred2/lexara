import Link from "next/link";

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <footer className="relative mt-20 w-full bg-gradient-to-b to-emerald-950">
      {/* Main Footer Content */}
      <div className="mx-auto w-[90%] px-6 py-16">
        {/* Top Section - Logo & Newsletter */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <h1 className="text-5xl font-bold">Nexara</h1>
            <p className="max-w-md text-lg text-white/60">
              Organize your tasks and goals with the modern tool for
              productivity.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <form className="flex w-full max-w-md flex-col gap-3">
              <h3 className="text-right text-xl font-semibold">Stay updated</h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 flex-1"
                />
                <button
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "px-6 whitespace-nowrap",
                  )}
                >
                  Subscribe
                </button>
              </div>
              <p className="text-right text-sm text-white/50">
                By subscribing you agree to our{" "}
                <Link href="/" className="text-emerald-400 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="my-16 h-px w-full bg-white/10" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Company</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                About
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Careers
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Blog
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Products</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Desktop App
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Mobile App
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Web App
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                API
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Support</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Help Center
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Documentation
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Community
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Status
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Cookie Policy
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-white"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mx-auto w-[90%] border-t border-white/10">
        <div className="px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span>© 2025 Nexara. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-2">
              <Select defaultValue="en">
                <SelectTrigger className="w-42" aria-label="Language Selector">
                  <Icons.globe className="h-5 w-5" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Ukrainian</SelectItem>
                  <SelectItem value="fr">Russian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
