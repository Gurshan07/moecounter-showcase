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

  const width = length * 45;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center justify-center w-full min-h-[180px] overflow-x-auto">
        <iframe
          key={key}
          src={apiUrl}
          title="MoeCounter Preview"
          width={width}
          height={150}
          className="border-0 block"
          scrolling="no"
          style={{ 
            background: 'transparent',
            overflow: 'hidden'
          }}
        />
      </div>
    </div>
  );
};

export default CounterPreview;