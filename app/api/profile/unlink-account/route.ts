import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { provider } = await req.json();

    if (!provider) {
      return NextResponse.json(
        { error: "Provider is required" },
        { status: 400 },
      );
    }

    // Проверяем, какие методы входа есть у пользователя
    const userAccounts = await prisma.account.findMany({
      where: { userId: session.user.id },
    });

    // Не позволяем отвязать единственный аккаунт
    if (userAccounts.length <= 1) {
      return NextResponse.json(
        { error: "Cannot unlink the only connected account" },
        { status: 400 },
      );
    }

    // Для email (credentials) не позволяем отвязать, если нет других OAuth аккаунтов
    if (provider === "credentials") {
      const hasOtherAccounts = userAccounts.some(
        (acc) => acc.provider !== "credentials",
      );
      if (!hasOtherAccounts) {
        return NextResponse.json(
          {
            error:
              "Cannot unlink email account without other connected accounts",
          },
          { status: 400 },
        );
      }
      // Сбрасываем пароль в таблице User, чтобы отключить вход по email/паролю
      await prisma.user.update({
        where: { id: session.user.id },
        data: { password: null },
      });
    }

    // Удаляем аккаунт
    await prisma.account.deleteMany({
      where: {
        userId: session.user.id,
        provider: provider,
      },
    });

    return NextResponse.json(
      { message: "Account unlinked successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error unlinking account:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
