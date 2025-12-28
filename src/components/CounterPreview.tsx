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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMeasuring, setIsMeasuring] = useState(true);
  
  const apiUrl = buildApiUrl({ mode, theme, number, length });

  useEffect(() => {
    setIsLoading(true);
    setIsMeasuring(true);
    setKey(prev => prev + 1);
    measureGifDimensions();
  }, [mode, theme, number, length]);

  const measureGifDimensions = async () => {
    try {
      // Fetch the actual full counter to measure its real dimensions
      const measureUrl = buildApiUrl({ mode, theme, number: number || "0".repeat(length), length });
      
      // The API returns HTML with img tags, so we need to parse it
      const response = await fetch(measureUrl);
      const html = await response.text();
      
      // Extract first image src from the HTML to get single character dimensions
      const imgMatch = html.match(/<img[^>]+src="([^"]+)"/);
      
      if (imgMatch && imgMatch[1]) {
        const imgUrl = imgMatch[1];
        
        // Load the image to get its natural dimensions
        const img = new Image();
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            const charWidth = img.naturalWidth;
            const charHeight = img.naturalHeight;
            
            // Add some spacing buffer between characters (about 5% per character gap)
            const totalWidth = (charWidth * length) + (length * 2);
            
            setDimensions({
              width: totalWidth,
              height: charHeight
            });
            setIsMeasuring(false);
            resolve(null);
          };
          
          img.onerror = () => {
            // Fallback dimensions
            setDimensions({
              width: length * 60,
              height: 100
            });
            setIsMeasuring(false);
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
        setIsMeasuring(false);
      }
    } catch (error) {
      console.error("Error measuring GIF dimensions:", error);
      // Fallback dimensions
      setDimensions({
        width: length * 60,
        height: 100
      });
      setIsMeasuring(false);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const displayHeight = dimensions.height || 120;
  const displayWidth = dimensions.width || length * 60;
  
  // Calculate scale for mobile responsiveness with more generous padding
  const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 64 : 500; // 64px for padding (32px each side)
  const scale = displayWidth > maxWidth ? maxWidth / displayWidth : 1;
  const scaledHeight = displayHeight * scale;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div 
        className="flex items-center justify-center w-full relative transition-all duration-300"
        style={{ height: scaledHeight + 40, minHeight: 120 }}
      >
        {(isLoading || isMeasuring) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {!isMeasuring && (
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              width: displayWidth,
              height: displayHeight
            }}
          >
            <iframe
              key={key}
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
        )}
      </div>
    </div>
  );
};

export default CounterPreview;