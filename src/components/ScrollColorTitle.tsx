import { useEffect, useRef, useState } from "react";
import { useIsDesktop } from "../hooks/useIsDesktop";

export function ScrollColorTitle({ text }: { text: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDesktop = useIsDesktop();
  const config = isDesktop
    ? {
        startFraction: 2 / 3,
        endFraction: 1 / 3,
        letterMultiplier: 2.5,
        letterDivisor: 4,
      }
    : {
        startFraction: 2 / 3,
        endFraction: 1 / 3,
        letterMultiplier: 2.5,
        letterDivisor: 4,
      };

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return;

      const rect = titleRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // L'animazione inizia a 1/3 dal basso (2/3 dall'alto)
      const startPoint = windowHeight * config.startFraction;
      // L'animazione finisce a 2/3 dal basso (1/3 dall'alto)
      const endPoint = windowHeight * config.endFraction;
      
      if (elementTop < windowHeight && elementBottom > 0) {
        if (elementTop <= endPoint) {
          // Animazione completata
          setScrollProgress(1);
        } else if (elementTop < startPoint) {
          // Animazione in corso
          const progress = (startPoint - elementTop) / (startPoint - endPoint);
          setScrollProgress(Math.min(Math.max(progress, 0), 1));
        } else {
          // Non ancora iniziata
          setScrollProgress(0);
        }
      } else if (elementTop >= windowHeight) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
      
    };

    // Calcolo iniziale con requestAnimationFrame per assicurarsi che il layout sia completo
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        handleScroll();
      });
    });
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const letters = text.split("");
  
  return (
    <h2
      ref={titleRef}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: "var(--type-section-title)",
        lineHeight: "1.05",
        textAlign: "left",
        whiteSpace: "pre-wrap",
        display: "inline-block",
        padding: "4px 0",
      }}
    >
      {letters.map((letter, index) => {
        const letterProgress = Math.min(
          Math.max(
            (scrollProgress * letters.length * config.letterMultiplier - index) / config.letterDivisor,
            0
          ),
          1
        );
        // Colore da grigio chiaro (0.3) a nero (1) - come FloatingTitle
        const colorOpacity = letterProgress * 0.7 + 0.3;
        
        if (letter === "\n") {
          return <br key={index} />;
        }
        
        return (
          <span
            key={index}
            style={{
              color: `rgba(0, 0, 0, ${colorOpacity})`,
              transition: "color 0.3s ease-out",
            }}
          >
            {letter}
          </span>
        );
      })}
    </h2>
  );
}
