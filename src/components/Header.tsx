import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToUrl = () => {
    const element = document.getElementById('generated-url');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold gradient-text">MoeCounter</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
            API Demo
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToUrl}
            className="text-muted-foreground hover:text-foreground"
          >
            API
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            <a
              href="https://github.com/Gurshan07/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
