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

  // Calculate width based on length - each character is roughly 45px wide
  const iframeWidth = Math.min(length * 45, 600);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="p-4 rounded-xl card-gradient border border-border animate-pulse-glow">
        <iframe
          key={key}
          src={apiUrl}
          title="MoeCounter Preview"
          width={iframeWidth}
          height={50}
          className="border-0 block"
          scrolling="no"
          style={{ 
            background: 'transparent',
            overflow: 'hidden',
            transform: 'scale(0.9)',
            transformOrigin: 'center'
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground">Live preview updates as you change values</p>
    </div>
  );
};

export default CounterPreview;
