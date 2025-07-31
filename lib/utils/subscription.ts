import { prisma } from "@/lib/prisma";

export async function getUserSubscription(userId: string) {
  const subscription = await prisma.userSubscription.findFirst({
    where: {
      userId,
      status: "ACTIVE",
    },
    include: {
      plan: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return subscription;
}

export async function getUserPlanFeatures(userId: string) {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    const freePlan = await prisma.subscriptionPlan.findUnique({
      where: { name: "personal" },
    });
    return freePlan?.features || {};
  }

  return subscription.plan.features;
}
