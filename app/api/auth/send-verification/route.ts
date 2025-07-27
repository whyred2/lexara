import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendEmailVerification, generateVerificationToken } from "@/lib/email";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 },
      );
    }

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: user.email,
        expires: {
          gte: oneHourAgo,
        },
      },
      orderBy: { expires: "desc" },
    });

    if (recentToken) {
      return NextResponse.json(
        { error: "Please wait before requesting another email" },
        { status: 429 },
      );
    }

    const token = generateVerificationToken();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.deleteMany({
      where: { identifier: user.email },
    });

    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token,
        expires,
      },
    });

    // Отправляем email
    await sendEmailVerification(user.email, token);

    return NextResponse.json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 },
    );
  }
}
