
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Wand2 } from "lucide-react";

interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const defaultQuestions = {
  technical: [
    "Explain your experience with the primary technology stack for this role.",
    "Describe a challenging technical problem you solved recently.",
    "How do you stay updated with the latest technologies in your field?",
    "Walk us through your approach to debugging and troubleshooting."
  ],
  behavioral: [
    "Tell us about a time you had to work under pressure.",
    "Describe a situation where you had to collaborate with a difficult team member.",
    "How do you handle criticism and feedback?",
    "Tell us about a project you're particularly proud of."
  ],
  roleSpecific: [
    "What interests you most about this specific role?",
    "How do you see yourself contributing to our team?",
    "What are your career goals for the next 2-3 years?",
    "Why do you want to work for our company?"
  ]
};

export function QuestionGenerator() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const commonSkills = [
    "JavaScript", "React", "Python", "Node.js", "SQL", "AWS", "Docker",
    "Leadership", "Communication", "Problem Solving", "Team Work", "Agile"
  ];

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setCustomSkill("");
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const generateQuestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI question generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const questions: Question[] = [
      {
        id: "1",
        text: `Tell us about yourself and why you're interested in the ${jobTitle} position.`,
        category: "Introduction",
        difficulty: "easy"
      },
      {
        id: "2",
        text: `Describe your experience with ${selectedSkills.slice(0, 2).join(" and ")}.`,
        category: "Technical",
        difficulty: "medium"
      },
      {
        id: "3",
        text: "Walk us through a challenging project you've worked on recently.",
        category: "Experience",
        difficulty: "medium"
      },
      {
        id: "4",
        text: "How do you approach problem-solving in your work?",
        category: "Behavioral",
        difficulty: "medium"
      },
      {
        id: "5",
        text: `What specific value would you bring to our ${jobTitle} team?`,
        category: "Role-Specific",
        difficulty: "hard"
      }
    ];

    // Add more questions based on selected skills
    selectedSkills.forEach((skill, index) => {
      if (index < 3) {
        questions.push({
          id: `skill-${index}`,
          text: `How would you apply your ${skill} skills in this role?`,
          category: "Technical",
          difficulty: "medium"
        });
      }
    });

    setGeneratedQuestions(questions);
    setIsGenerating(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            AI Question Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Frontend Developer, Data Scientist"
            />
          </div>

          <div>
            <Label htmlFor="jobDescription">Job Description (Optional)</Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here for more targeted questions..."
              rows={3}
            />
          </div>

          <div>
            <Label>Required Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2 mb-2">
              <Input
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Add custom skill..."
                onKeyPress={(e) => e.key === 'Enter' && addSkill(customSkill)}
              />
              <Button
                variant="outline"
                onClick={() => addSkill(customSkill)}
                disabled={!customSkill}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {commonSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => addSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            onClick={generateQuestions}
            disabled={!jobTitle || isGenerating}
            className="w-full"
          >
            {isGenerating ? "Generating Questions..." : "Generate AI Questions"}
          </Button>
        </CardContent>
      </Card>

      {generatedQuestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Questions ({generatedQuestions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedQuestions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Question {index + 1}
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="outline">{question.category}</Badge>
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-900">{question.text}</p>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button variant="outline">Save Question Set</Button>
              <Button>Use These Questions</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
