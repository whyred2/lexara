import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/components/icons";

import { formatDate, formatCurrency } from "@/lib/utils";

interface BillingOverviewProps {
  payments: Array<{
    id: string;
    amount: number;
    description?: string;
    createdAt: string;
    status: "SUCCEEDED" | "FAILED" | "PENDING";
  }>;
}

export const BillingOverview = ({ payments }: BillingOverviewProps) => {
  const usageData = [
    {
      name: "Storage",
      used: 2.1,
      limit: 1,
      unit: "GB",
      color: "bg-blue-500",
    },
    {
      name: "Team Members",
      used: 3,
      limit: 1,
      unit: "users",
      color: "bg-emerald-500",
    },
    {
      name: "Projects",
      used: 8,
      limit: 3,
      unit: "projects",
      color: "bg-violet-500",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Usage This Month</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {usageData.map((item) => {
            const percentage = (item.used / item.limit) * 100;
            return (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">{item.name}</span>
                  <span className="text-white">
                    {item.used} {item.unit} of{" "}
                    {item.limit === -1 ? "∞" : `${item.limit} ${item.unit}`}
                  </span>
                </div>
                <Progress
                  value={item.limit === -1 ? 0 : percentage}
                  className="h-2"
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Plan Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Plan Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                feature: "Team Members",
                value: 1,
              },
              {
                feature: "Storage",
                value: "1GB",
              },
              {
                feature: "Projects",
                value: 3,
              },
              {
                feature: "Support",
                value: "Community",
              },
            ].map((item) => (
              <div
                key={item.feature}
                className="flex justify-between border-b border-white/5 py-2 last:border-0"
              >
                <span className="text-white/60">{item.feature}</span>
                <span className="font-medium text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payments.length === 0 ? (
              <div className="py-8 text-center">
                <Icons.activity className="mx-auto mb-3 h-12 w-12 text-white/20" />
                <p className="text-white/60">No recent activity</p>
              </div>
            ) : (
              payments.slice(0, 3).map((payment: any) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between border-b border-white/5 py-3 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                      <Icons.dollarSign className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm text-white">Payment received</p>
                      <p className="text-xs text-white/60">
                        {formatDate(payment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium text-white">
                    {formatCurrency(Number(payment.amount))}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
