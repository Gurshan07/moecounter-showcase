import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { buildApiUrl } from "@/lib/buildApiUrl";
import type { CounterMode, CounterTheme } from "@/components/Controls";

interface UrlDisplayProps {
  mode: CounterMode;
  theme: CounterTheme;
  number: string;
  length: number;
}

const UrlDisplay = ({ mode, theme, number, length }: UrlDisplayProps) => {
  const [copied, setCopied] = useState(false);
  
  const apiUrl = buildApiUrl({ mode, theme, number, length });

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(apiUrl);
    setCopied(true);
    toast.success("URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4" >
      <h2 className="text-lg font-semibold text-foreground">Generated API URL</h2>
      <code className="block p-4 rounded-lg bg-secondary border border-border text-primary text-sm font-mono break-all leading-relaxed">
        {apiUrl}
      </code>
      <Button
        variant="outline"
        onClick={copyToClipboard}
        className="w-full border-border hover:bg-primary hover:text-primary-foreground transition-colors text-base py-6"
      >
        {copied ? (
          <>
            <Check className="h-5 w-5 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-5 w-5 mr-2" />
            Copy URL
          </>
        )}
      </Button>
    </div>
  );
};

export default UrlDisplay;