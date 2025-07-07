
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Video, UserCheck, Building } from "lucide-react";

const stats = [
  {
    title: "Active Candidates",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Video Resumes",
    value: "1,923",
    change: "+18.2%",
    icon: Video,
    color: "text-green-600",
  },
  {
    title: "Successful Matches",
    value: "456",
    change: "+23.4%",
    icon: UserCheck,
    color: "text-purple-600",
  },
  {
    title: "Active Job Posts",
    value: "89",
    change: "+8.3%",
    icon: Building,
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
