import { useState, useEffect } from "react";
import { Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildApiUrl } from "@/lib/buildApiUrl";
import type { CounterMode, CounterTheme } from "@/components/Controls";

interface LazyCounterPreviewProps {
  mode: CounterMode;
  theme: CounterTheme;
  number: string;
  length: number;
  onShow?: () => void;
}

const LazyCounterPreview = ({ mode, theme, number, length, onShow }: LazyCounterPreviewProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const apiUrl = buildApiUrl({ mode, theme, number, length });

  // Reset preview when theme changes to recalculate dimensions
  useEffect(() => {
    setIsVisible(false);
    setDimensions({ width: 0, height: 0 });
  }, [theme]);

  const handleShow = async () => {
    setIsVisible(true);
    setIsLoading(true);
    if (onShow) {
      onShow();
    }
    await measureGifDimensions();
  };

  const measureGifDimensions = async () => {
    try {
      // Fetch a single digit to measure its dimensions
      const measureUrl = buildApiUrl({ mode, theme, number: "0", length: 1 });
      
      // The API returns HTML with img tags, so we need to parse it
      const response = await fetch(measureUrl);
      const html = await response.text();
      
      // Extract image src from the HTML
      const imgMatch = html.match(/<img[^>]+src="([^"]+)"/);
      
      if (imgMatch && imgMatch[1]) {
        const imgUrl = imgMatch[1];
        
        // Load the image to get its natural dimensions
        const img = new Image();
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            // Calculate total dimensions based on single character
            const charWidth = img.naturalWidth;
            const charHeight = img.naturalHeight;
            
            setDimensions({
              width: charWidth * length,
              height: charHeight
            });
            resolve(null);
          };
          
          img.onerror = () => {
            // Fallback dimensions
            setDimensions({
              width: length * 60,
              height: 100
            });
            reject();
          };
          
          img.src = imgUrl;
        }).catch(() => {
          // Error handled in onerror
        });
      } else {
        // Couldn't parse image URL, use fallback
        setDimensions({
          width: length * 60,
          height: 100
        });
      }
    } catch (error) {
      console.error("Error measuring GIF dimensions:", error);
      // Fallback dimensions
      setDimensions({
        width: length * 60,
        height: 100
      });
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const displayHeight = dimensions.height || 120;
  const displayWidth = dimensions.width || length * 60;
  
  // Calculate scale for mobile responsiveness
  const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 48 : 500; // 48px for padding
  const scale = displayWidth > maxWidth ? maxWidth / displayWidth : 1;
  const scaledHeight = displayHeight * scale;

  if (!isVisible) {
    return (
      <div 
        className="flex items-center justify-center w-full bg-secondary/50 rounded-lg border border-border/50 backdrop-blur-sm"
        style={{ height: 120 }}
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
      className="flex items-center justify-center w-full relative transition-all duration-300"
      style={{ height: scaledHeight + 40, minHeight: 120 }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          width: displayWidth,
          height: displayHeight
        }}
      >
        <iframe
          src={apiUrl}
          title="MoeCounter Preview"
          width={displayWidth}
          height={displayHeight}
          className="border-0"
          scrolling="no"
          onLoad={handleIframeLoad}
          style={{ 
            background: 'transparent',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </div>
    </div>
  );
};

export default LazyCounterPreview;