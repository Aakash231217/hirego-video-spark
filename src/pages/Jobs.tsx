
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Users, MapPin, Clock, DollarSign } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    applicants: 45,
    posted: "2 days ago",
    status: "Active",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "DataFlow Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $140k",
    applicants: 32,
    posted: "1 week ago",
    status: "Active",
    skills: ["Python", "Machine Learning", "SQL"],
  },
  {
    id: 3,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90k - $120k",
    applicants: 28,
    posted: "3 days ago",
    status: "Active",
    skills: ["Strategy", "Agile", "Analytics"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech Ltd.",
    location: "Seattle, WA",
    type: "Contract",
    salary: "$95k - $125k",
    applicants: 18,
    posted: "5 days ago",
    status: "Paused",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
];

const Jobs = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Postings</h1>
          <p className="text-muted-foreground">
            Manage job postings and track candidate applications
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Job Posting
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{job.company}</p>
                </div>
                <Badge
                  variant={job.status === "Active" ? "default" : "secondary"}
                >
                  {job.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{job.applicants} applicants</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">Posted {job.posted}</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Applications
                  </Button>
                  <Button size="sm">
                    Edit Job
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

export default Jobs;
