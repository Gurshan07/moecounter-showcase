import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CounterPreview from "@/components/CounterPreview";
import Controls from "@/components/Controls";
import UrlDisplay from "@/components/UrlDisplay";
import CodeExamples from "@/components/CodeExamples";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [number, setNumber] = useState("1234567890");
  const [length, setLength] = useState(10);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
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
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Preview Side */}
                <div className="order-1 md:order-1">
                  <div className="sticky top-24">
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">
                      Live Preview
                    </h2>
                    <CounterPreview number={number} length={length} />
                  </div>
                </div>

                {/* Controls Side */}
                <div className="order-2 md:order-2 space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">
                      Customize
                    </h2>
                    <div className="p-6 rounded-xl card-gradient border border-border">
                      <Controls
                        number={number}
                        setNumber={setNumber}
                        length={length}
                        setLength={setLength}
                      />
                    </div>
                  </div>

                  <div className="p-6 rounded-xl card-gradient border border-border">
                    <UrlDisplay number={number} length={length} />
                  </div>
                </div>
              </div>

              {/* Code Examples */}
              <div className="mt-12 p-6 rounded-xl card-gradient border border-border">
                <CodeExamples number={number} length={length} />
              </div>
            </div>
          </div>
        </section>

        {/* API Info Section */}
        <section className="py-12 md:py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">API Reference</h2>
              <div className="p-6 rounded-xl card-gradient border border-border space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-primary mb-2">Base URL</h3>
                  <code className="block p-3 rounded-lg bg-secondary text-sm font-mono text-foreground">
                    https://moecounter.jawandha-moecounter.workers.dev/api/v2/moecounter
                  </code>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-2">Parameters</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><code className="text-foreground">number</code> - The number to display</li>
                      <li><code className="text-foreground">length</code> - Number of digits (pads with zeros)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-2">Response</h3>
                    <p className="text-sm text-muted-foreground">
                      Returns an SVG/GIF image of cute anime characters representing each digit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
