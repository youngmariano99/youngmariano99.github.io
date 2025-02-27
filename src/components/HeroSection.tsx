
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 animate-slideRight">
            <div className="chip mb-3 animate-delay-100">Backend Developer & Data Scientist</div>
            <h1 className="mb-4 animate-delay-200">
              <span className="block mb-1">Hello, I'm</span> Mariano Young
            </h1>
            <p className="mb-6 text-lg md:text-xl text-foreground/80 animate-delay-300">
              Aspiring backend developer with a passion for programming and technology. 
              Currently studying Programming at UTN and looking for new work opportunities.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 animate-delay-400">
              <Button asChild className="rounded-full">
                <a href="#contact">Get in touch</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href="#projects">View projects</a>
              </Button>
            </div>
            
            <div className="flex gap-4 animate-delay-500">
              <a 
                href="mailto:youngmariano99@gmail.com" 
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://github.com/youngmariano99" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/mariano-young-016a0b23b/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 animate-fadeIn">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-elevated mx-auto">
                <img 
                  src="/placeholder.svg" 
                  alt="Mariano Young" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/10 -z-10"></div>
              <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 w-24 h-24 md:w-32 md:h-32 rounded-full bg-secondary -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
