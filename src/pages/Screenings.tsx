
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, XCircle, Clock } from "lucide-react";

const screenings = [
  {
    id: 1,
    candidateName: "Sarah Johnson",
    position: "Frontend Developer",
    stage: "Technical Assessment",
    progress: 85,
    status: "In Progress",
    aiInsights: {
      communication: 92,
      technicalSkills: 88,
      confidence: 90,
      emotionalIntelligence: 85,
    },
    timeRemaining: "12 mins",
  },
  {
    id: 2,
    candidateName: "Michael Chen",
    position: "Data Scientist",
    stage: "Video Interview",
    progress: 100,
    status: "Completed",
    aiInsights: {
      communication: 87,
      technicalSkills: 95,
      confidence: 82,
      emotionalIntelligence: 89,
    },
    timeRemaining: "Completed",
  },
  {
    id: 3,
    candidateName: "Emily Rodriguez",
    position: "Product Manager",
    stage: "Behavioral Assessment",
    progress: 45,
    status: "Paused",
    aiInsights: {
      communication: 94,
      technicalSkills: 78,
      confidence: 91,
      emotionalIntelligence: 92,
    },
    timeRemaining: "25 mins",
  },
];

const Screenings = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Screenings</h1>
          <p className="text-muted-foreground">
            Automated screening workflows with real-time AI evaluation
          </p>
        </div>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          Start New Screening
        </Button>
      </div>

      <div className="space-y-6">
        {screenings.map((screening) => (
          <Card key={screening.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{screening.candidateName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {screening.position} • {screening.stage}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {screening.status === "Completed" && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {screening.status === "In Progress" && (
                    <Clock className="h-5 w-5 text-blue-600" />
                  )}
                  {screening.status === "Paused" && (
                    <XCircle className="h-5 w-5 text-yellow-600" />
                  )}
                  <Badge
                    variant={
                      screening.status === "Completed" ? "default" :
                      screening.status === "In Progress" ? "destructive" : "secondary"
                    }
                  >
                    {screening.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{screening.progress}%</span>
                </div>
                <Progress value={screening.progress} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  Time remaining: {screening.timeRemaining}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {screening.aiInsights.communication}%
                  </div>
                  <div className="text-xs text-muted-foreground">Communication</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {screening.aiInsights.technicalSkills}%
                  </div>
                  <div className="text-xs text-muted-foreground">Technical Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {screening.aiInsights.confidence}%
                  </div>
                  <div className="text-xs text-muted-foreground">Confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {screening.aiInsights.emotionalIntelligence}%
                  </div>
                  <div className="text-xs text-muted-foreground">Emotional Intelligence</div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">
                  {screening.status === "Completed" ? "Review Results" : "Monitor"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Screenings;
