import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { password, confirmPassword } = await req.json();

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Обновляем пароль пользователя
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hash },
    });

    // Если для email/credentials ещё нет записи в Account, создаём её
    const existingCredentialAccount = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "credentials",
      },
    });
    if (!existingCredentialAccount) {
      await prisma.account.create({
        data: {
          userId: session.user.id,
          type: "credentials",
          provider: "credentials",
          // Используем email пользователя в качестве providerAccountId
          providerAccountId: session.user.email as string,
        },
      });
    }

    return NextResponse.json(
      { message: "Password set successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error setting password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
