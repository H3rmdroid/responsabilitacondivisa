import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { NetworkSvg } from "./NetworkSvg";

export function AnimatedSvg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const layoutConfig = isDesktop
    ? { minHeight: "400px" }
    : { minHeight: "400px" };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const svgOpacity = 1;

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{ minHeight: layoutConfig.minHeight }}
    >
      <NetworkSvg
        opacity={svgOpacity}
        className="w-full h-full"
      />
    </div>
  );
}
