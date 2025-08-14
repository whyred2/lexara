import * as React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";

import { BillingStats } from "@/components/profile/billing/billing-stats";
import { BillingHistory } from "@/components/profile/billing/billing-history";
import { PaymentMethods } from "@/components/profile/billing/payment-methods";
import { PaymentDetails } from "@/components/profile/billing/payment-details";
import { BillingOverview } from "@/components/profile/billing/billing-overview";

function formatCurrencyUSD(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
function formatDateMDY(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function BillingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscriptions: {
        where: { status: "ACTIVE" },
        include: {
          plan: true,
          payments: { orderBy: { createdAt: "desc" }, take: 10 },
        },
        take: 1,
      },
      paymentMethods: true,
      billingProfile: true,
    },
  });

  if (!user) {
    redirect("/auth");
  }

  const currentSubscription = user.subscriptions[0];
  const plan = currentSubscription?.plan;
  const payments = currentSubscription?.payments || [];
  const isFreePlan = plan?.name === "personal";

  const stats = {
    planName: plan?.displayName ?? "Personal",
    price: isFreePlan ? "Free" : formatCurrencyUSD(Number(plan?.price || 0)),
    nextBilling: currentSubscription?.currentPeriodEnd
      ? formatDateMDY(currentSubscription.currentPeriodEnd)
      : "Never",
    status: currentSubscription?.status ?? "Active",
  };

  return (
    <div className="space-y-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Billing</h1>
          <p className="text-white/60">
            Manage your subscription and billing details
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Icons.crown className="mr-2 h-4 w-4" />
          {isFreePlan ? "Upgrade Plan" : "Manage Plan"}
        </Button>
      </div>

      {/* Quick Stats */}
      <BillingStats {...stats} />

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="payments-details">Billing Details</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <BillingOverview payments={payments as any} />
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-4">
          <PaymentMethods />
        </TabsContent>

        <TabsContent value="payments-details" className="space-y-4">
          <PaymentDetails />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <BillingHistory payments={payments as any} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
