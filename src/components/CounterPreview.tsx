import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { buildApiUrl } from "@/lib/buildApiUrl";
import type { CounterMode, CounterTheme } from "@/components/Controls";

interface CounterPreviewProps {
  mode: CounterMode;
  theme: CounterTheme;
  number: string;
  length: number;
  compact?: boolean;
}

const CounterPreview = ({ mode, theme, number, length, compact = false }: CounterPreviewProps) => {
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

  // Different themes have different sizes - gelbooru is taller
  const getThemeDimensions = () => {
    if (theme === "gelbooru") {
      return { 
        width: compact ? length * 30 : length * 45, 
        height: compact ? 100 : 150,
        minHeight: compact ? 100 : 150
      };
    }
    return { 
      width: compact ? length * 30 : length * 45, 
      height: compact ? 100 : 150,
      minHeight: compact ? 100 : 150
    };
  };

  const { width, height, minHeight } = getThemeDimensions();

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div 
        className="flex items-center justify-center w-full relative overflow-hidden"
        style={{ minHeight, maxHeight: compact ? 120 : 180 }}
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
            transition: 'opacity 0.3s ease-in-out',
            transform: compact ? 'scale(0.85)' : 'scale(1)',
            transformOrigin: 'center center'
          }}
        />
      </div>
    </div>
  );
};

export default CounterPreview;