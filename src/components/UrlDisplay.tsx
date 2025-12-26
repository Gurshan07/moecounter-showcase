import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UrlDisplayProps {
  number: string;
  length: number;
}

const UrlDisplay = ({ number, length }: UrlDisplayProps) => {
  const [copied, setCopied] = useState(false);
  
  const apiUrl = `https://moecounter.jawandha-moecounter.workers.dev/api/v2/moecounter?number=${number}&length=${length}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(apiUrl);
    setCopied(true);
    toast.success("URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3" id="generated-url">
      <h3 className="text-sm font-medium text-foreground">Generated API URL</h3>
      <div className="flex items-center gap-2">
        <code className="flex-1 p-3 rounded-lg bg-secondary border border-border text-primary text-xs font-mono break-all">
          {apiUrl}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="shrink-0 border-border hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default UrlDisplay;
