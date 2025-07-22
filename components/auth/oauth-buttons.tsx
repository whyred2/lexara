import { signIn } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface OAuthButtonsProps {
  isLoading: boolean;
}

export const OAuthButtons = ({ isLoading }: OAuthButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => signIn("google")}
        className={cn(buttonVariants({ variant: "outline" }), "h-10 gap-2")}
        disabled={isLoading}
      >
        <Icons.google className="size-5" />
        Google
      </button>
      <button
        type="button"
        onClick={() => signIn("github")}
        className={cn(buttonVariants({ variant: "outline" }), "h-10 gap-2")}
        disabled={isLoading}
      >
        <Icons.githubLight className="size-5" />
        GitHub
      </button>
    </div>
  );
};
