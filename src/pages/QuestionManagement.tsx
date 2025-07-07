
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionGenerator } from "@/components/QuestionGenerator";
import { Search, Plus, Edit, Trash2, Copy } from "lucide-react";

const savedQuestionSets = [
  {
    id: 1,
    name: "Frontend Developer - React",
    questions: 5,
    lastUsed: "2024-01-15",
    category: "Technical",
    skills: ["React", "JavaScript", "CSS"]
  },
  {
    id: 2,
    name: "Data Scientist - Python/ML",
    questions: 7,
    lastUsed: "2024-01-14",
    category: "Technical",
    skills: ["Python", "Machine Learning", "SQL"]
  },
  {
    id: 3,
    name: "Product Manager - General",
    questions: 6,
    lastUsed: "2024-01-13",
    category: "Behavioral",
    skills: ["Leadership", "Strategy", "Communication"]
  }
];

const QuestionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredSets = savedQuestionSets.filter(set => 
    set.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "all" || set.category.toLowerCase() === selectedCategory)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Question Management</h1>
          <p className="text-muted-foreground">
            Create and manage AI-powered interview questions for different roles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Question Set
        </Button>
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator">AI Generator</TabsTrigger>
          <TabsTrigger value="saved">Saved Sets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="space-y-4">
          <QuestionGenerator />
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Saved Question Sets</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search question sets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">All Categories</option>
                    <option value="technical">Technical</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="role-specific">Role Specific</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSets.map((set) => (
                  <div
                    key={set.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{set.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {set.questions} questions • Last used: {set.lastUsed}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{set.category}</Badge>
                          {set.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Preview Questions
                      </Button>
                      <Button size="sm">
                        Use for Job Posting
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestionManagement;
