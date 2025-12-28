import { useState } from "react";
import { Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildApiUrl } from "@/lib/buildApiUrl";
import type { CounterMode, CounterTheme } from "@/components/Controls";

interface LazyCounterPreviewProps {
  mode: CounterMode;
  theme: CounterTheme;
  number: string;
  length: number;
}

const LazyCounterPreview = ({ mode, theme, number, length }: LazyCounterPreviewProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const apiUrl = buildApiUrl({ mode, theme, number, length });

  const handleShow = () => {
    setIsVisible(true);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const width = Math.min(length * 45, 320);
  const height = 100;

  if (!isVisible) {
    return (
      <div 
        className="flex items-center justify-center w-full bg-secondary/50 rounded-lg border border-border/50 backdrop-blur-sm"
        style={{ minHeight: height }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={handleShow}
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          Show Preview
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center justify-center w-full relative overflow-hidden"
      style={{ minHeight: height }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      <iframe
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
  );
};

export default LazyCounterPreview;
