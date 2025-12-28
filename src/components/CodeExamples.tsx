import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { buildApiUrl } from "@/lib/buildApiUrl";
import LazyCounterPreview from "@/components/LazyCounterPreview";
import type { CounterMode, CounterTheme } from "@/components/Controls";

interface CodeExamplesProps {
  mode: CounterMode;
  theme: CounterTheme;
  number: string;
  length: number;
}

const CodeExamples = ({ mode, theme, number, length }: CodeExamplesProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | string | null>(null);
  const [shownPreviews, setShownPreviews] = useState<Set<string>>(new Set());
  
  const apiUrl = buildApiUrl({ mode, theme, number, length });

  // Reset shown previews when theme changes
  useEffect(() => {
    setShownPreviews(new Set());
  }, [theme]);

  const handlePreviewShown = (key: string) => {
    setShownPreviews(prev => new Set([...prev, key]));
  };

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
      code: `\n<p align="center">\n  <img src="${apiUrl}" alt="Visitor Counter" />\n</p>`,
    },
  ];

  const modeExamples = [
    {
      title: "Static (Read-Only)",
      description: "Reads counter value without incrementing. Perfect for displaying a fixed count.",
      examples: [
        { label: "Basic", mode: "static" as CounterMode, length: 4 ,number: undefined}
      ],
    },
    {
      title: "Increment (+1 Each Request)",
      description: "Increments counter by 1 on each request. Ideal for visitor counters.",
      examples: [
        { label: "Basic", mode: "increment" as CounterMode, length: 4 ,number: undefined}
      ],
    },
  ];

  const copyCode = async (code: string, index: number | string) => {
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
              <div className="space-y-4">
                {modeExample.examples.map((ex, exIndex) => {
                  const exampleUrl = buildApiUrl({ 
                    mode: ex.mode, 
                    theme, 
                    number: ex.number || "", 
                    length: ex.length 
                  });
                  const copyKey = `${modeExample.title}-${exIndex}`;
                  
                  return (
                    <div key={ex.label} className="space-y-2 p-3 rounded-lg bg-secondary/30 border border-border/50">
                      <span className="text-xs font-medium text-muted-foreground">{ex.label}:</span>
                      
                      <div className="flex justify-center overflow-hidden">
                        <LazyCounterPreview 
                          mode={ex.mode}
                          theme={theme}
                          number={ex.number || ""}
                          length={ex.length}
                          onShow={() => handlePreviewShown(copyKey)}
                        />
                      </div>
                      
                      {shownPreviews.has(copyKey) && (
                        <Button
                          variant="outline"
                          onClick={() => copyCode(exampleUrl, copyKey)}
                          className="w-full border-border hover:bg-primary hover:text-primary-foreground transition-colors text-base py-6"
                        >
                          {copiedIndex === copyKey ? (
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
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeExamples;