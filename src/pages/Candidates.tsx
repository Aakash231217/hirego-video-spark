
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Video, MessageSquare, Calendar, Star } from "lucide-react";

const candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    position: "Frontend Developer",
    experience: "3 years",
    location: "San Francisco, CA",
    aiMatch: 95,
    status: "Active",
    hasVideoResume: true,
    rating: 4.8,
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    position: "Data Scientist",
    experience: "5 years",
    location: "New York, NY",
    aiMatch: 88,
    status: "Interviewing",
    hasVideoResume: true,
    rating: 4.6,
    skills: ["Python", "Machine Learning", "SQL"],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    position: "Product Manager",
    experience: "4 years",
    location: "Austin, TX",
    aiMatch: 92,
    status: "Shortlisted",
    hasVideoResume: true,
    rating: 4.9,
    skills: ["Strategy", "Agile", "Analytics"],
  },
];

const Candidates = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Candidates</h1>
          <p className="text-muted-foreground">
            Manage and evaluate candidates with AI-powered insights
          </p>
        </div>
        <Button>
          <Video className="mr-2 h-4 w-4" />
          Review Video Resumes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {candidate.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{candidate.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{candidate.position}</p>
                  </div>
                </div>
                {candidate.hasVideoResume && (
                  <Video className="h-5 w-5 text-blue-600" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">AI Match Score</div>
                  <div className={`text-xl font-bold ${
                    candidate.aiMatch >= 90 ? 'text-green-600' : 
                    candidate.aiMatch >= 80 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {candidate.aiMatch}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{candidate.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{candidate.experience}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">{candidate.email}</div>
                <div className="text-sm text-muted-foreground">{candidate.location}</div>
              </div>

              <div className="flex flex-wrap gap-1">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    candidate.status === "Active" ? "default" :
                    candidate.status === "Interviewing" ? "destructive" : "secondary"
                  }
                >
                  {candidate.status}
                </Badge>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
