
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Users, Building, UserCheck, BarChart3, MessageSquare } from "lucide-react";

const quickActions = [
  {
    title: "Review Video Resumes",
    description: "AI-powered video analysis",
    icon: Video,
    variant: "default" as const,
  },
  {
    title: "Add Candidate",
    description: "Onboard new candidates",
    icon: Users,
    variant: "outline" as const,
  },
  {
    title: "Post New Job",
    description: "Create job posting",
    icon: Building,
    variant: "outline" as const,
  },
  {
    title: "Start Screening",
    description: "Automated AI screening",
    icon: UserCheck,
    variant: "outline" as const,
  },
  {
    title: "View Analytics",
    description: "Hiring insights & metrics",
    icon: BarChart3,
    variant: "outline" as const,
  },
  {
    title: "Message Candidates",
    description: "Communicate with prospects",
    icon: MessageSquare,
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
