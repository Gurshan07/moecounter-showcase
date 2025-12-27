import { useState, useEffect } from "react";
import backToTopImage from "@/assets/back-to-top.png";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent > 65);
      
      // Reset to stage 1 when not animating
      if (!isAnimating) {
        setStage(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAnimating]);

  const handleClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setStage(2);
    
    // Slowed down by 2.5x: 300ms -> 750ms
    setTimeout(() => {
      setStage(3);
      
      // Slowed down by 2.5x: 1000ms -> 2500ms
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        // Slowed down by 2.5x: 500ms -> 1250ms
        setTimeout(() => {
          setIsAnimating(false);
          setStage(1);
        }, 1250);
      }, 1500);
    }, 750);
  };

  if (!isVisible) return null;

  // Image is 3 sprites stacked vertically, each roughly 1/3 of total height
  const getClipPath = () => {
    switch (stage) {
      case 1:
        return "inset(0% 0% 66.67% 0%)";
      case 2:
        return "inset(33.33% 0% 33.33% 0%)";
      case 3:
        return "inset(66.67% 0% 0% 0%)";
    }
  };

  const getTransform = () => {
    switch (stage) {
      case 1:
        return "translateY(0%)";
      case 2:
        return "translateY(-33.33%)";
      case 3:
        return "translateY(-66.67%)";
    }
  };

  return (
   <button
  onClick={handleClick}
  className={`fixed bottom-0 right-0 z-50 cursor-pointer transition-all duration-700 hover:scale-150 ${
    isVisible ? "animate-fade-in" : "opacity-0 pointer-events-none"
  }`}
  aria-label="Back to top"
>
      <div className="w-[120px] h-[120px] overflow-hidden relative">
        <img
          src={backToTopImage}
          alt="Back to top"
          className="w-full transition-transform duration-700 ease-out"
          style={{
            clipPath: getClipPath(),
            transform: getTransform(),
          }}
        />
      </div>
    </button>
  );
};

export default BackToTop;
