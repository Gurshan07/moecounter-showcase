import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { buildApiUrl } from "@/lib/buildApiUrl";
import type { CounterMode, CounterTheme } from "@/components/Controls";

interface CodeExamplesProps {
  mode: CounterMode;
  theme: CounterTheme;
  number: string;
  length: number;
}

const CodeExamples = ({ mode, theme, number, length }: CodeExamplesProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const apiUrl = buildApiUrl({ mode, theme, number, length });

  const baseUrl = "https://moecounter.jawandha-moecounter.workers.dev/api/v2/moecounter";

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

  const modeExamples = [
    {
      title: "Static (Read-Only)",
      description: "Reads counter value without incrementing. Perfect for displaying a fixed count.",
      examples: [
        { label: "Basic", url: `${baseUrl}?theme=${theme}` },
        { label: "With Length", url: `${baseUrl}?theme=${theme}&length=6` },
      ],
    },
    {
      title: "Increment (+1 Each Request)",
      description: "Increments counter by 1 on each request. Ideal for visitor counters.",
      examples: [
        { label: "Basic", url: `${baseUrl}/increment?theme=${theme}` },
        { label: "With Length", url: `${baseUrl}/increment?theme=${theme}&length=6` },
      ],
    },
    {
      title: "Custom Number (Manual)",
      description: "Display any number without touching the counter. Great for custom displays.",
      examples: [
        { label: "Example", url: `${baseUrl}?theme=${theme}&number=1234567890&length=10` },
      ],
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
              <code className="text-xs font-mono text-foreground whitespace-pre-wrap break-all">{example.code}</code>
            </pre>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">API Usage Examples</h3>
        <div className="space-y-6">
          {modeExamples.map((modeExample) => (
            <div key={modeExample.title} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary">{modeExample.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{modeExample.description}</p>
              <div className="space-y-3">
                {modeExample.examples.map((ex) => (
                  <div key={ex.label} className="space-y-2">
                    <span className="text-xs text-muted-foreground">{ex.label}:</span>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 border border-border">
                      <img 
                        src={ex.url} 
                        alt={`${modeExample.title} counter preview`}
                        className="h-8"
                      />
                    </div>
                    <pre className="p-2 rounded-lg bg-secondary border border-border overflow-x-auto">
                      <code className="text-xs font-mono text-foreground whitespace-pre-wrap break-all">{ex.url}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeExamples;
