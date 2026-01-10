import { motion, useMotionValue, animate } from "motion/react";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  style?: React.CSSProperties;
  suffix?: string;
}

export function AnimatedNumber({ value, duration = 1.2, style, suffix = "" }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const controls = animate(0, value, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
    });
    
    return () => controls.stop();
  }, [value, duration]);

  return (
    <p style={style}>
      {displayValue}{suffix}
    </p>
  );
}