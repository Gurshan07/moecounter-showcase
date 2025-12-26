import { useState, useEffect } from "react";

interface CounterPreviewProps {
  number: string;
  length: number;
}

const CounterPreview = ({ number, length }: CounterPreviewProps) => {
  const [key, setKey] = useState(0);
  
  const apiUrl = `https://moecounter.jawandha-moecounter.workers.dev/api/v2/moecounter?number=${number}&length=${length}`;

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [number, length]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="p-6 rounded-xl card-gradient border border-border animate-pulse-glow overflow-hidden">
        <div className="bg-background/50 rounded-lg p-4 flex items-center justify-center min-h-[100px]">
          <iframe
            key={key}
            src={apiUrl}
            title="MoeCounter Preview"
            className="border-0 h-20 w-full max-w-md"
            style={{ background: 'transparent' }}
          />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Live preview updates as you change values</p>
    </div>
  );
};

export default CounterPreview;
