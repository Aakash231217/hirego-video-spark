
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "Created new project",
    time: "2 hours ago",
    type: "create",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Updated user profile",
    time: "4 hours ago",
    type: "update",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Deleted old files",
    time: "6 hours ago",
    type: "delete",
  },
  {
    id: 4,
    user: "Sarah Wilson",
    action: "Commented on task",
    time: "8 hours ago",
    type: "comment",
  },
  {
    id: 5,
    user: "Alex Brown",
    action: "Uploaded documents",
    time: "12 hours ago",
    type: "upload",
  },
];

const getActionColor = (type: string) => {
  switch (type) {
    case "create":
      return "bg-green-100 text-green-800";
    case "update":
      return "bg-blue-100 text-blue-800";
    case "delete":
      return "bg-red-100 text-red-800";
    case "comment":
      return "bg-purple-100 text-purple-800";
    case "upload":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function RecentActivity() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {activity.user.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={getActionColor(activity.type)}>
                  {activity.type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
