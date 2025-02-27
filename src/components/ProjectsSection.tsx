
import { Github, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Sistema de Gestión para Almacenes",
      description: "A warehouse management system with a GUI interface built using Python, MySQL, and Flask. Features inventory tracking, order management, and reporting tools.",
      tags: ["Python", "MySQL", "Flask", "GUI"],
      githubUrl: "https://github.com/youngmariano99/sistema_gesti-n_web.git",
      image: "/placeholder.svg"
    },
    {
      title: "Sistema de Gestión para Mayorista",
      description: "A wholesale management system with a CLI interface developed in C++. Includes customer management, product catalog, and transaction processing.",
      tags: ["C++", "CLI", "Database"],
      githubUrl: "https://github.com/youngmariano99/sistema_gestion_mayorista.git",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="chip mb-2">Portfolio</div>
          <h2 className="mb-6">Featured Projects</h2>
          <p className="text-lg text-foreground/80">
            Here are some projects I've worked on. Each represents my skills
            and approach to solving real-world problems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden bg-white shadow-card h-full card-hover animate-slideUp" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{project.description}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                >
                  <Github size={18} className="mr-2" />
                  View Code
                </a>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-primary"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Live Demo
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
