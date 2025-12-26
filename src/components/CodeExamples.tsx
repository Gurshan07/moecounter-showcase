import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CodeExamplesProps {
  number: string;
  length: number;
}

const CodeExamples = ({ number, length }: CodeExamplesProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const apiUrl = `https://moecounter.jawandha-moecounter.workers.dev/api/v2/moecounter?number=${number}&length=${length}`;

  const examples = [
    {
      title: "HTML",
      code: `<img src="${apiUrl}" alt="MoeCounter" />`,
    },
    {
      title: "Markdown",
      code: `![MoeCounter](${apiUrl})`,
    },
    {
      title: "GitHub README",
      code: `<!-- Add to your README.md -->\n<p align="center">\n  <img src="${apiUrl}" alt="Visitor Counter" />\n</p>`,
    },
  ];

  const copyCode = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    toast.success("Code copied!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Embed Code</h3>
      <div className="grid gap-4">
        {examples.map((example, index) => (
          <div key={example.title} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">{example.title}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyCode(example.code, index)}
                className="h-7 px-2 text-muted-foreground hover:text-foreground"
              >
                {copiedIndex === index ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
            <pre className="p-3 rounded-lg bg-secondary border border-border overflow-x-auto">
              <code className="text-sm font-mono text-foreground">{example.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeExamples;
