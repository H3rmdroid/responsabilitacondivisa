import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect } from "react";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { getBackgroundLayout } from "../layout/backgroundLayout";

export function DecorativeSvg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const { decorativeSvg: layoutConfig } = getBackgroundLayout(isDesktop);
  
  // Scroll progress - l'animazione si completa quando l'SVG è a metà viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Animazione pathLength - path1 da sinistra, path2 da destra
  // Si completa quando scrollYProgress = 1 (SVG a metà viewport)
  const path1Input = isDesktop ? [0, 1] : [0, 1];
  const path2Input = isDesktop ? [0.1, 1] : [0.1, 1];
  const path1Length = useTransform(scrollYProgress, path1Input, [0, 1]);
  const path2Length = useTransform(scrollYProgress, path2Input, [0, 1]);
  
  // Path offset per far partire path2 dalla fine (effetto bidirezionale)
  const path2Offset = useTransform(scrollYProgress, path2Input, [1, 0]);

  return (
    <div
      style={{
        position: "relative",
        top: layoutConfig.containerTop,
        left: layoutConfig.containerLeft,
        right: layoutConfig.containerRight,
        height: layoutConfig.containerHeight,
        outline: "none",
        backgroundColor: "transparent",
      }}
      ref={containerRef}
    >
      <svg
        id="decorative-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 1030 393.34 120"
        style={{
          width: layoutConfig.svgWidth,
          height: "auto",
          display: "block",
        }}
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          <style>
            {`#decorative-svg .svg-decor-line {
              fill: none;
              stroke: #232322;
              stroke-miterlimit: 10;
              stroke-width: .7px;
            }`}
          </style>
        </defs>
        <motion.path 
          className="svg-decor-line" 
          d="M.17,1142.9c64.82,2.6,122.46,4,192.02,3.98,67.47-.04,137.96-1.45,200.98-3.98"
          style={{ pathLength: path1Length }}
        />
        <motion.path 
          className="svg-decor-line" 
          d="M393.17,1083.64c-48.37-9.03-78.76-4.85-102.67,1.09,0,0-34.74,8.63-79.63,4.4-8.83-.82-17.39-4.29-21.46-7.87-.22-.2-1.36-1.13-2.89-2.51-3.02-2.74-5.31-4.96-9.25-6.98-3.4-1.76-6.43-3.36-9.01-2.02-2.42,1.25-3.51,4.56-3.16,7.16.82,5.89,9.07,7.54,9.52,7.61,2.89.53,7.76.42,8.7-1.96.71-1.76-.85-4.54-2.89-6-3.87-2.78-7.96.13-13.54-3.09-.98-.56-1.71-.98-2.4-1.87-2.62-3.42-.96-9.23,1.05-12.36.91-1.42,1.6-2.49,2.94-3.51,1.42-1.09,2.56-1.33,2.67-2.22.09-.78-.67-1.16-1.67-2.51-.09-.13-1.42-1.98-1.82-4-.11-.6-.73-3.65,1.29-5.85,1.73-1.91,4.71-2.36,6.92-1.38,2.33,1.05,3.22,3.56,3.54,4.45,1.02,2.89.07,4.85,1.36,5.83.85.62,1.89.29,3.09.11,5.18-.73,9.74,2.18,10.67,2.78,1.31.85,5.56,3.58,5.69,7.92.09,2.98-1.8,5.27-2.45,5.96-2,2.16-3.18,1.25-6.52,3.74-2.89,2.16-3.42,3.89-5.38,3.91-1.29,0-2.54-.69-3.22-1.67-1.2-1.69-.49-3.85,0-5.38.31-.98,1.31-3.51,3.98-5.34,1.07-.73,3.49-2.4,5.49-1.67,1.93.71,2.4,3.36,3.34,7.74,2.98,14.19,3.78,13.54,4.43,20.61.44,4.76.67,7.14.67,8.72,0,5-.64,7.92,1.33,9.98.85.87,1.4.8,2.98,2.36,1.27,1.25,3.09,3,2.69,4.07-.38,1-2.51.73-8.76.67-6.96-.07-8.41.2-9.72-1.09s-.62-2.36-1.56-6.43c-1.11-4.87-2.51-5.18-4.29-10.76-1.78-5.56-1.45-8.47-2.25-8.52-1.22-.09-3.4,6.72-4.03,13.72-.64,7.21.85,10.43-1.51,12.5-.98.87-3.45.96-8.38,1.11-8.61.29-9.36-.56-9.56-1.07-.47-1.18,1.11-3.02,1.91-3.96,1.33-1.56,1.85-1.33,2.54-2.27,1.4-1.96-.53-4.07-.89-9.52-.09-1.2-.2-3.31.29-5.96.58-3.18,1.51-4.18,1.65-6.87,0,0,.11-2.33-.76-5.11-3.14-9.96-38.65-8.38-38.65-8.38-35.29,0-48.61,7.56-74.19,9.5-11.36.87-27.88,1.16-49.21-2.4"
          style={{ pathLength: path2Length, strokeDashoffset: path2Offset }}
        />
      </svg>
    </div>
  );
}
