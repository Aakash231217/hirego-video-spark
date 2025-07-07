
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Play, Eye, Download, MoreHorizontal } from "lucide-react";

const videoResumes = [
  {
    id: 1,
    candidateName: "Sarah Johnson",
    position: "Frontend Developer",
    duration: "1:23",
    uploadDate: "2024-01-15",
    status: "Reviewed",
    aiScore: 92,
    skills: ["React", "TypeScript", "UI/UX"],
  },
  {
    id: 2,
    candidateName: "Michael Chen",
    position: "Data Scientist",
    duration: "1:45",
    uploadDate: "2024-01-14",
    status: "Pending",
    aiScore: 88,
    skills: ["Python", "ML", "Analytics"],
  },
  {
    id: 3,
    candidateName: "Emily Rodriguez",
    position: "Product Manager",
    duration: "1:12",
    uploadDate: "2024-01-13",
    status: "Shortlisted",
    aiScore: 95,
    skills: ["Strategy", "Agile", "Leadership"],
  },
  {
    id: 4,
    candidateName: "David Park",
    position: "DevOps Engineer",
    duration: "1:38",
    uploadDate: "2024-01-12",
    status: "Reviewed",
    aiScore: 85,
    skills: ["AWS", "Docker", "Kubernetes"],
  },
];

const VideoResumes = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Video Resumes</h1>
          <p className="text-muted-foreground">
            AI-powered video resume analysis and candidate evaluation
          </p>
        </div>
        <Button>
          <Eye className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Video Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {videoResumes.map((video) => (
              <div
                key={video.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {video.candidateName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute -bottom-1 -right-1 h-6 w-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-medium">{video.candidateName}</h3>
                    <p className="text-sm text-muted-foreground">{video.position}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {video.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">AI Score</div>
                    <div className={`text-lg font-bold ${
                      video.aiScore >= 90 ? 'text-green-600' : 
                      video.aiScore >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {video.aiScore}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="text-sm font-medium">{video.duration}</div>
                  </div>
                  <Badge
                    variant={
                      video.status === "Shortlisted" ? "default" :
                      video.status === "Reviewed" ? "secondary" : "outline"
                    }
                  >
                    {video.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {video.uploadDate}
                  </span>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoResumes;
