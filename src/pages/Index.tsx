import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import CounterPreview from "@/components/CounterPreview";
import Controls, { CounterMode, CounterTheme } from "@/components/Controls";
import UrlDisplay from "@/components/UrlDisplay";
import CodeExamples from "@/components/CodeExamples";

const Index = () => {
  const [mode, setMode] = useState<CounterMode>("custom");
  const [theme, setTheme] = useState<CounterTheme>("default");
  const [number, setNumber] = useState("1234567890");
  const [length, setLength] = useState(10);
  const [baseUrlCopied, setBaseUrlCopied] = useState(false);

  const baseUrl = "https://moecounter.jawandha-moecounter.workers.dev/api/v2/moecounter";

  const copyBaseUrl = async () => {
    await navigator.clipboard.writeText(baseUrl);
    setBaseUrlCopied(true);
    toast.success("Base URL copied!");
    setTimeout(() => setBaseUrlCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col select-none" >
      <Header />
      <BackToTop />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 text-center relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Cute Anime Counter API</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <span className="gradient-text">MoeCounter</span> API
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Enhance your projects with adorable anime-style counters.
              Perfect for visitor counters, stats displays, and more.
            </p>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-10">
              {/* Live Preview - Full Width Row */}
              <div className="text-center">
                <CounterPreview mode={mode} theme={theme} number={number} length={length} />
              </div>

             {/* Controls Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl card-gradient border border-border flex flex-col justify-center">
                  <h2 className="text-lg font-semibold mb-4 text-foreground">
                    Customize
                  </h2>
                  <Controls
                    mode={mode}
                    setMode={setMode}
                    theme={theme}
                    setTheme={setTheme}
                    number={number}
                    setNumber={setNumber}
                    length={length}
                    setLength={setLength}
                  />
                </div>

                <div className="p-6 rounded-xl card-gradient border border-border flex flex-col justify-center">
                  <UrlDisplay mode={mode} theme={theme} number={number} length={length} />
                </div>
              </div>

              {/* Code Examples */}
              <div className="p-6 rounded-xl card-gradient border border-border">
                <CodeExamples mode={mode} theme={theme} number={number} length={length} />
              </div>
            </div>
          </div>
        </section>

        {/* API Info Section */}
        <section className="py-12 md:py-16 bg-card/30" id="generated-url">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">API Reference</h2>
              <div className="p-6 rounded-xl card-gradient border border-border space-y-4">
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-primary mb-2">Base URL</h3>
                  <div className="relative">
                    <code className="block p-3 pr-10 rounded-lg bg-secondary text-sm font-mono text-foreground break-all overflow-x-auto">
                      {baseUrl}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyBaseUrl}
                      className="absolute top-1 right-1 h-7 px-2 text-muted-foreground hover:text-foreground"
                    >
                      {baseUrlCopied ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-primary mb-2">Endpoints</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="break-words"><code className="text-foreground break-all">/</code> - Static read or custom number</li>
                      <li className="break-words"><code className="text-foreground break-all">/increment</code> - Increment counter by 1</li>
                    </ul>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-primary mb-2">Parameters</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><code className="text-foreground break-all">theme</code> - default, uma, gelbooru, asoul, booru-jaypee, booru-lisu, booru-lewd, booru-qualityhentais, booru-smtg</li>
                      <li><code className="text-foreground">length</code> - Number of digits</li>
                      <li><code className="text-foreground">number</code> - Custom number (optional)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Index;