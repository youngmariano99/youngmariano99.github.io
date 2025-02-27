
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-medium mb-2">Mariano Young</h3>
            <p className="text-sm text-muted-foreground">
              Backend Developer & Data Scientist
            </p>
          </div>
          
          <div className="flex space-x-4 mb-6 md:mb-0">
            <a 
              href="mailto:youngmariano99@gmail.com" 
              className="p-2 rounded-full bg-background hover:bg-primary hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://github.com/youngmariano99" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background hover:bg-primary hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mariano-young-016a0b23b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background hover:bg-primary hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Mariano Young. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
