
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EducationSection = () => {
  const education = [
    {
      degree: "Técnico en Programación",
      institution: "Universidad Tecnológica Nacional (UTN)",
      period: "Currently studying",
      description: "Studying programming techniques, algorithms, data structures, and software development methodologies."
    },
    {
      degree: "Licenciatura en Administración de Empresas",
      institution: "Universidad Siglo 21",
      period: "Completed",
      description: "Studied business administration, management principles, finance, and organizational behavior."
    },
    {
      degree: "Técnico Electromecánico",
      institution: "",
      period: "Completed",
      description: "Learned about electrical and mechanical systems, control circuits, and technical drawing."
    }
  ];

  const certificates = [
    {
      title: "Python Profesional",
      institution: "Código Facilito",
      url: "https://codigofacilito.com/cursos/python-profesional"
    },
    {
      title: "Profesional de Base de Datos",
      institution: "Código Facilito",
      url: "https://codigofacilito.com/cursos/base-datos-profesional"
    }
  ];

  return (
    <section id="education" className="py-16 md:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="chip mb-2">Education</div>
          <h2 className="mb-6">Academic Background</h2>
          <p className="text-lg text-foreground/80">
            My educational journey combines technical knowledge, business understanding, 
            and specialized programming skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-medium mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-primary">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
              Formal Education
            </h3>
            <div className="space-y-6">
              {education.map((item, index) => (
                <Card key={index} className="bg-white shadow-card overflow-hidden animate-slideRight" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader className="pb-2">
                    <Badge variant="outline" className="mb-1 self-start">
                      {item.period}
                    </Badge>
                    <CardTitle className="text-xl">{item.degree}</CardTitle>
                    {item.institution && (
                      <p className="text-sm text-muted-foreground">{item.institution}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-medium mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-primary">
                <rect width="18" height="14" x="3" y="4" rx="2"/>
                <line x1="8" x2="16" y1="2" y2="2"/>
                <line x1="12" x2="12" y1="14" y2="18"/>
                <line x1="8" x2="16" y1="18" y2="18"/>
              </svg>
              Certifications
            </h3>
            <div className="space-y-6">
              {certificates.map((cert, index) => (
                <a 
                  key={index}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-white shadow-card overflow-hidden hover:border-primary/50 transition-colors card-hover animate-slideRight" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center">
                        <span className="flex-1">{cert.title}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" x2="21" y1="14" y2="3"/>
                        </svg>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{cert.institution}</p>
                    </CardHeader>
                  </Card>
                </a>
              ))}
              
              <Card className="bg-white/50 border-dashed border-2 shadow-none hover:bg-white/80 transition-colors animate-slideRight" style={{ animationDelay: "500ms" }}>
                <CardContent className="flex items-center justify-center p-6">
                  <p className="text-muted-foreground text-center">
                    Continuously learning and adding new skills through courses and self-study
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
