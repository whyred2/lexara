import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { formatDate, formatCurrency } from "@/lib/utils";

interface BillingHistoryProps {
  payments: Array<{
    id: string;
    amount: number;
    description?: string | null; // Разрешаем null
    createdAt: string;
    status: "SUCCEEDED" | "FAILED" | "PENDING";
  }>;
}

// Используем реальные данные вместо фиктивных
export const BillingHistory = ({ payments }: BillingHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="py-12 text-center">
            <Icons.fileText className="mx-auto mb-3 h-12 w-12" />
            <p className="text-white/60">No billing history</p>
            <p className="text-sm text-white/40">
              Your invoices will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between rounded-2xl border border-white/20 p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Icons.fileText className="size-5" />
                  </div>
                  <div>
                    <p className="text-white">
                      {formatCurrency(payment.amount)} -{" "}
                      {payment.description || "Subscription"}
                    </p>
                    <p className="text-sm text-white/60">
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    className={cn(
                      payment.status === "SUCCEEDED" && "bg-emerald-500",
                      payment.status === "FAILED" && "bg-red-500",
                      payment.status === "PENDING" && "bg-yellow-500",
                    )}
                  >
                    {payment.status}
                  </Badge>
                  <Button size="icon">
                    <Icons.download className="size-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
