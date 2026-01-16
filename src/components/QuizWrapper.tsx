import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Quiz } from "./Quiz";
import { ScrollColorTitle } from "./ScrollColorTitle";
import { useIsDesktop } from "../hooks/useIsDesktop";
import {
  DESKTOP_REFERENCE_HEIGHT,
  MOBILE_REFERENCE_HEIGHT,
} from "../layout/scale";

export function QuizWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const layoutConfig = isDesktop
    ? {
        containerPaddingX: 0,
        contentTranslateY: 0,
        titleMarginTop: 0,
        titleMarginBottom: 500,
        quizTranslateY: 0,
      }
    : {
        containerPaddingX: 25,
        contentTranslateY: -85,
        titleMarginTop: -40,
        titleMarginBottom: 145,
        quizTranslateY: -51,
      };
  const quizTitle = isDesktop
    ? "Mappa la tua percezione di \nresponsabilità: fai il punto con \nun quiz"
    : "Mappa la tua percezione di responsabilità:\nFai il punto con un quiz";
  
  // Scroll progress per il quiz sticky - sincronizzato con BackgroundThreadsSvg
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Il quiz rimane fisso fino al 18% dello scroll - sincronizzato con animazione BackgroundThreadsSvg
  // L'animazione inizia quando la sezione entra nel viewport dal basso
  // Poi scorre naturalmente insieme al background
  const quizY = useTransform(scrollYProgress, [0.1, 0.18], [0, 0]);
  const quizContentOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: "relative",
        height: isDesktop ? DESKTOP_REFERENCE_HEIGHT : MOBILE_REFERENCE_HEIGHT,
        zIndex: 10,
      }}
    >
      <motion.div
        className="top-0 h-full flex flex-col items-center justify-center"
        style={{
          paddingLeft: layoutConfig.containerPaddingX,
          paddingRight: layoutConfig.containerPaddingX,
        }}
      >
        <div style={{ transform: `translateY(${layoutConfig.contentTranslateY}px)` }}>
          <div
            style={{
              marginBottom: layoutConfig.titleMarginBottom,
              marginTop: layoutConfig.titleMarginTop,
            }}
          >
            <ScrollColorTitle text={quizTitle} />
          </div>
          <motion.div 
            style={{ 
              transform: `translateY(${layoutConfig.quizTranslateY}px)`,
              opacity: quizContentOpacity
            }}
          >
            <Quiz />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
