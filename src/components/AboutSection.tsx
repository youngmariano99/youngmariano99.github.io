
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="chip mb-2">About Me</div>
          <h2 className="mb-6">My Journey</h2>
          <p className="text-lg text-foreground/80">
            I'm just starting my journey in the world of programming and technology. 
            Currently studying a Programming Technician degree at UTN, I'm eager to 
            explore new opportunities in backend development and continue learning.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white shadow-card overflow-hidden card-hover animate-scaleIn">
            <CardContent className="p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Backend Development</h3>
              <p className="text-foreground/80">
                Focused on building robust and efficient server-side applications using 
                Python and MySQL. I enjoy creating systems that solve real-world problems.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-card overflow-hidden card-hover animate-scaleIn animate-delay-200">
            <CardContent className="p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Data Analysis</h3>
              <p className="text-foreground/80">
                Learning to work with data using Python and SQL. Interested in extracting 
                insights from data that can drive decision-making.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-card overflow-hidden card-hover animate-scaleIn animate-delay-400">
            <CardContent className="p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/></svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Continuous Learning</h3>
              <p className="text-foreground/80">
                Always looking to expand my knowledge and skills through formal education, 
                online courses, and hands-on projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
