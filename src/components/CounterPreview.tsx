import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { buildApiUrl } from "@/lib/buildApiUrl";
import type { CounterMode, CounterTheme } from "@/components/Controls";

interface CounterPreviewProps {
  mode: CounterMode;
  theme: CounterTheme;
  number: string;
  length: number;
}

const CounterPreview = ({ mode, theme, number, length }: CounterPreviewProps) => {
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const apiUrl = buildApiUrl({ mode, theme, number, length });

  useEffect(() => {
    setIsLoading(true);
    setKey(prev => prev + 1);
  }, [mode, theme, number, length]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const width = Math.min(length * 45, 400);
  const height = 120;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div 
        className="flex items-center justify-center w-full relative overflow-hidden"
        style={{ minHeight: height }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <iframe
          key={key}
          src={apiUrl}
          title="MoeCounter Preview"
          width={width}
          height={height}
          className="border-0 block max-w-full"
          scrolling="no"
          onLoad={handleIframeLoad}
          style={{ 
            background: 'transparent',
            overflow: 'hidden',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </div>
    </div>
  );
};

export default CounterPreview;