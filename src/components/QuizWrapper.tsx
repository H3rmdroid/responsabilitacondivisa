import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Quiz } from "./Quiz";
import { ScrollColorTitle } from "./ScrollColorTitle";
import { useIsDesktop } from "../hooks/useIsDesktop";
import {
  desktopPxToVw,
  desktopVhToVw,
  mobilePxToVw,
  mobileVhToVw,
} from "../layout/scale";

export function QuizWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const layoutConfig = isDesktop
    ? {
        containerPaddingX: desktopPxToVw(20),
        contentTranslateY: desktopPxToVw(2200),
        titleMarginTop: desktopPxToVw(10),
        titleMarginBottom: desktopPxToVw(30),
        quizTranslateY: desktopPxToVw(600),
      }
    : {
        containerPaddingX: mobilePxToVw(25),
        contentTranslateY: mobilePxToVw(-140),
        titleMarginTop: mobilePxToVw(0),
        titleMarginBottom: mobilePxToVw(120),
        quizTranslateY: mobilePxToVw(0),
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
        height: isDesktop ? desktopVhToVw(100) : mobileVhToVw(100),
        zIndex: 10,
      }}
    >
      <motion.div
        className="top-0 h-screen flex flex-col items-center justify-center"
        style={{
          paddingLeft: layoutConfig.containerPaddingX,
          paddingRight: layoutConfig.containerPaddingX,
        }}
      >
        <div style={{ transform: `translateY(${layoutConfig.contentTranslateY})` }}>
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
              transform: `translateY(${layoutConfig.quizTranslateY})`,
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
