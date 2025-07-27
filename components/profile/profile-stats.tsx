import { User, Account } from "@prisma/client";
import { Activity, Clock, Shield, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileStatsProps {
  user: User & {
    accounts: Pick<Account, "provider">[];
  };
}

export function ProfileStats({ user }: ProfileStatsProps) {
  const stats = [
    {
      title: "Account Age",
      value: `${Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days`,
      icon: Clock,
      color: "text-blue-500",
    },
    {
      title: "Connected Accounts",
      value: user.accounts.length.toString(),
      icon: Shield,
      color: "text-emerald-500",
    },
    {
      title: "Profile Status",
      value: "Active",
      icon: Activity,
      color: "text-green-500",
    },
    {
      title: "Account Type",
      value: "Personal",
      icon: Users,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Quick Stats</h3>

      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-slate-700 bg-slate-800/50 backdrop-blur-sm"
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`rounded-lg bg-slate-900/50 p-2`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <p className="font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
