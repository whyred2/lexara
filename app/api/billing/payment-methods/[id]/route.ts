import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pm = await prisma.paymentMethod.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!pm) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.$transaction(async (tx) => {
    await tx.paymentMethod.delete({ where: { id: pm.id } });
    if (pm.isDefault) {
      const next = await tx.paymentMethod.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
      });
      if (next) {
        await tx.paymentMethod.update({
          where: { id: next.id },
          data: { isDefault: true },
        });
      }
    }
  });

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const setDefault = z.object({ isDefault: z.boolean() }).safeParse(body);

  const pm = await prisma.paymentMethod.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!pm) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const result = await prisma.$transaction(async (tx) => {
    if (setDefault.success && setDefault.data.isDefault) {
      await tx.paymentMethod.updateMany({
        where: { userId: session.user.id, isDefault: true },
        data: { isDefault: false },
      });
    }
    return tx.paymentMethod.update({
      where: { id: pm.id },
      data: {
        isDefault: setDefault.success
          ? setDefault.data.isDefault
          : pm.isDefault,
      },
    });
  });

  return NextResponse.json({ method: result });
}
