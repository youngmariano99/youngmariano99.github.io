
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SkillsSection = () => {
  const technicalSkills = [
    { name: "Python", level: 80 },
    { name: "MySQL", level: 75 },
    { name: "Git", level: 70 },
    { name: "C++", level: 65 },
    { name: "Flask", level: 60 },
  ];

  const softSkills = [
    "Team Player",
    "Problem Solver",
    "Adaptability",
    "Responsibility",
    "Organization",
    "Continuous Learning"
  ];

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="chip mb-2">Skills</div>
          <h2 className="mb-6">My Skillset</h2>
          <p className="text-lg text-foreground/80">
            I combine technical expertise with strong soft skills to deliver
            well-rounded contributions to any team or project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-card overflow-hidden animate-slideUp">
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
              <CardDescription>Technologies and tools I work with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground text-sm">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-card overflow-hidden animate-slideUp animate-delay-200">
            <CardHeader>
              <CardTitle>Soft Skills</CardTitle>
              <CardDescription>Personal qualities that enhance my work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {softSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="px-4 py-2 bg-secondary rounded-full text-secondary-foreground font-medium text-sm animate-scaleIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-secondary/50 rounded-lg border border-border">
                <p className="text-foreground/80">
                  I consider myself an organized and responsible person who can work well in a team,
                  adapt to different contexts, and is eager to continue learning and gaining new
                  professional experiences.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
