
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, Send, Users, FileText } from "lucide-react";

const quickActions = [
  {
    title: "Create Project",
    description: "Start a new project",
    icon: Plus,
    variant: "default" as const,
  },
  {
    title: "Upload Files",
    description: "Add new documents",
    icon: Upload,
    variant: "outline" as const,
  },
  {
    title: "Invite Users",
    description: "Add team members",
    icon: Users,
    variant: "outline" as const,
  },
  {
    title: "Generate Report",
    description: "Create analytics report",
    icon: FileText,
    variant: "outline" as const,
  },
  {
    title: "Send Message",
    description: "Notify team members",
    icon: Send,
    variant: "outline" as const,
  },
  {
    title: "Export Data",
    description: "Download platform data",
    icon: Download,
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-start space-y-2"
            >
              <div className="flex items-center space-x-2">
                <action.icon className="h-4 w-4" />
                <span className="font-medium">{action.title}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
