
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, DollarSign, Activity } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,345",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Revenue",
    value: "$45,678",
    change: "+8.2%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Growth Rate",
    value: "23.4%",
    change: "+4.1%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "Active Sessions",
    value: "1,234",
    change: "+15.3%",
    icon: Activity,
    color: "text-orange-600",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
