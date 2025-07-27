import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/profile?error=invalid-token", req.url),
      );
    }

    // Находим токен по уникальному полю token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL("/profile?error=invalid-token", req.url),
      );
    }

    // Проверяем не истёк ли токен
    if (verificationToken.expires < new Date()) {
      // Удаляем истёкший токен по id
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });
      return NextResponse.redirect(
        new URL("/profile?error=token-expired", req.url),
      );
    }

    // Обновляем пользователя
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    // Удаляем использованный токен по id
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return NextResponse.redirect(
      new URL("/profile?success=email-verified", req.url),
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.redirect(
      new URL("/profile?error=verification-failed", req.url),
    );
  }
}
