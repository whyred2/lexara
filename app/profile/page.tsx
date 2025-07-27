import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileCard } from "@/components/profile/profile-card";
import { ProfileStats } from "@/components/profile/profile-stats";

export default async function ProfilePage() {
  // Проверим авторизацию
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  // Получим полные данные пользователя из БД
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      accounts: {
        select: {
          provider: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="grid gap-2">
      {/* Profile Card */}
      <ProfileCard user={user} />
    </div>
  );
}
