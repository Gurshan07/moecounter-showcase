import { Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-primary fill-primary" /> by{" "}
            <a
              href="https://github.com/Gurshan07/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Gurshan07
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Gurshan07/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
