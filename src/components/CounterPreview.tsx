import { useState, useEffect } from "react";

interface CounterPreviewProps {
  number: string;
  length: number;
}

const CounterPreview = ({ number, length }: CounterPreviewProps) => {
  const [imageKey, setImageKey] = useState(0);
  
  const apiUrl = `https://moecounter.jawandha-moecounter.workers.dev/api/v2/moecounter?number=${number}&length=${length}`;

  useEffect(() => {
    setImageKey(prev => prev + 1);
  }, [number, length]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="p-8 rounded-xl card-gradient border border-border animate-pulse-glow">
        <img 
          key={imageKey}
          src={apiUrl} 
          alt="MoeCounter Preview"
          className="h-24 object-contain"
        />
      </div>
      <p className="text-sm text-muted-foreground">Live preview updates as you change values</p>
    </div>
  );
};

export default CounterPreview;
