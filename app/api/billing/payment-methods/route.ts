import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const addSchema = z.object({
  brand: z
    .enum([
      "visa",
      "mastercard",
      "amex",
      "discover",
      "mir",
      "maestro",
      "unionpay",
    ])
    .default("visa"),
  last4: z.string().regex(/^\d{4}$/, "Last 4 digits only"),
  expMonth: z.number().int().min(1).max(12),
  expYear: z
    .number()
    .int()
    .min(new Date().getFullYear())
    .max(new Date().getFullYear() + 15),
  name: z.string().min(2).max(64).optional(),
  setDefault: z.boolean().optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const methods = await prisma.paymentMethod.findMany({
    where: { userId: session.user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ methods });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const data = addSchema.parse(body);

  const result = await prisma.$transaction(async (tx) => {
    if (data.setDefault) {
      await tx.paymentMethod.updateMany({
        where: { userId: session.user.id, isDefault: true },
        data: { isDefault: false },
      });
    }
    const pm = await tx.paymentMethod.create({
      data: {
        userId: session.user.id,
        brand: data.brand,
        last4: data.last4,
        expMonth: data.expMonth,
        expYear: data.expYear,
        name: data.name,
        isDefault: data.setDefault ?? false,
      },
    });
    return pm;
  });

  return NextResponse.json({ method: result }, { status: 201 });
}
