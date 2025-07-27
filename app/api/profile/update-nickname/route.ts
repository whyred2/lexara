import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nickname } = await req.json();

    if (nickname && (nickname.length < 3 || nickname.length > 20)) {
      return NextResponse.json(
        { error: "Nickname must be between 3 and 20 characters" },
        { status: 400 },
      );
    }

    const nicknameRegex = /^[a-zA-Z0-9_-]+$/;
    if (nickname && !nicknameRegex.test(nickname)) {
      return NextResponse.json(
        {
          error:
            "Nickname can only contain letters, numbers, hyphens and underscores",
        },
        { status: 400 },
      );
    }

    if (nickname) {
      const existingUser = await prisma.user.findUnique({
        where: { nickname },
      });

      if (existingUser && existingUser.id !== session.user.id) {
        return NextResponse.json(
          { error: "Nickname already taken" },
          { status: 400 },
        );
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { nickname: nickname || null },
    });

    return NextResponse.json({
      message: "Nickname updated successfully",
      nickname,
    });
  } catch (error) {
    console.error("Error updating nickname:", error);
    return NextResponse.json(
      { error: "Failed to update nickname" },
      { status: 500 },
    );
  }
}
