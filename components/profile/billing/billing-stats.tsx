import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface Props {
  planName: string;
  price: string;
  nextBilling: string;
  status: string;
}

export const BillingStats = ({
  planName,
  price,
  nextBilling,
  status,
}: Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Icons.creditCard className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-white/60">Current Plan</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-white">{planName}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Icons.dollarSign className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-white/60">Monthly Cost</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-white">{price}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Icons.calendar className="h-4 w-4 text-violet-500" />
            <span className="text-sm text-white/60">Next Billing</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-white">{nextBilling}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Icons.checkCircle className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-white/60">Status</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-white">{status}</p>
        </CardContent>
      </Card>
    </div>
  );
};
