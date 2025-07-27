import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { SettingsNav } from "@/components/profile/profile-nav";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  return (
    <div className="mx-auto min-h-screen w-full bg-gradient-to-br to-emerald-950/50">
      <div className="flex gap-4 p-4">
        {/* Navigation Sidebar */}
        <div className="w-100">
          <SettingsNav />
        </div>

        {/* Main Content */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
