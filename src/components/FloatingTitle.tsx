import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useMemo, useEffect, useState } from "react";
import { useIsDesktop } from "../hooks/useIsDesktop";
import {
  desktopPxToVw,
  desktopVhToVw,
  mobilePxToVw,
  mobileVhToVw,
} from "../layout/scale";

export function FloatingTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const config = isDesktop
    ? {
        sectionHeight: desktopVhToVw(100),
        stickyOffsetY: desktopPxToVw(960),
        letterDelayMax: 0.3,
        titleOpacityRange: [0, 0.2] as [number, number],
        titleMoveInput: [0, 0.3, 0.8, 1],
        titleMoveOutput: [0, 0.3, 0.3, 0.4],
        scrollWarpInput: [0, 0.1, 0.6, 1],
        scrollWarpOutput: [0, 0, 0.5, 1],
        lineTimings: {
          question: { base: 0.3, step: 0.005, duration: 0.06 },
          responsibility: { base: 0.34, step: 0.004, duration: 0.05 },
          transform: { base: 0.35, step: 0.004, duration: 0.05 },
          closing: { base: 0.36, step: 0.005, duration: 0.05 },
        },
      }
    : {
        sectionHeight: mobileVhToVw(240),
        stickyOffsetY: mobilePxToVw(120),
        letterDelayMax: 0.3,
        titleOpacityRange: [0, 0.2] as [number, number],
        titleMoveInput: [0, 1],
        titleMoveOutput: [0, 0],
        scrollWarpInput: [0, 1],
        scrollWarpOutput: [0, 1],
        lineTimings: {
          question: { base: 0.3, step: 0.005, duration: 0.06 },
          responsibility: { base: 0.34, step: 0.004, duration: 0.05 },
          transform: { base: 0.35, step: 0.004, duration: 0.05 },
          closing: { base: 0.36, step: 0.005, duration: 0.05 },
        },
      };
  const lines = [
    "La responsabilità",
    "non è un peso,",
    "ma una forza",
    "(se condivisa)."
  ];
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const warpedProgress = useTransform(
    scrollYProgress,
    config.scrollWarpInput,
    config.scrollWarpOutput
  );
  const resolveLengthToPx = (value: string | number) => {
    if (typeof value === "number") {
      return value;
    }

    const match = value.match(/^(-?\d+(?:\.\d+)?)(vh|vw|px)$/);
    if (!match) {
      return 0;
    }

    const numeric = parseFloat(match[1]);
    const unit = match[2];

    if (unit === "vh") {
      return (numeric / 100) * viewportHeight;
    }

    if (unit === "vw") {
      return (numeric / 100) * viewportWidth;
    }

    return numeric;
  };

  const sectionHeightPx = resolveLengthToPx(config.sectionHeight);
  const stickyOffsetPx = resolveLengthToPx(config.stickyOffsetY);
  const titleMoveOutputPx = config.titleMoveOutput.map(
    (value) => stickyOffsetPx - value * sectionHeightPx
  );
  const titleTranslateY = useTransform(
    scrollYProgress,
    config.titleMoveInput,
    titleMoveOutputPx
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Genera delay casuali per ogni lettera
  const processedLines = useMemo(() => {
    return lines.map((line) => 
      line.split(" ").map((word) => ({
        word,
        letters: word.split("").map((char) => ({
          char,
          delay: Math.random() * config.letterDelayMax, // Delay casuale tra 0 e 0.3
        }))
      }))
    );
  }, [config.letterDelayMax]);

  const svgOpacity = useTransform(warpedProgress, [0, 0.5], [0, 1]);
  
  // Opacità del titolo che va da 0 a 1
  const titleOpacity = useTransform(warpedProgress, config.titleOpacityRange, [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative type-exempt"
      style={{ height: config.sectionHeight }}
    >
      <motion.div 
        className="sticky top-0 h-screen flex items-start justify-start overflow-hidden" 
        style={{ 
          paddingLeft: isDesktop ? desktopPxToVw(80) : mobilePxToVw(20),
          paddingRight: isDesktop ? desktopPxToVw(40) : mobilePxToVw(20),
          y: titleTranslateY,
          opacity: titleOpacity
        }}
      >
        <div className="relative z-10" style={{ textAlign: "left", width: "100%" }}>
          <div className="flex flex-col gap-y-0 leading-tight" style={{ lineHeight: '1.08' }}>
            {processedLines.map((lineWords, lineIndex) => (
              <div key={lineIndex} className="flex flex-wrap gap-x-2 leading-tight">
                {lineWords.map((wordData, wordIndex) => (
                  <span key={wordIndex} className="inline-flex">
                    {wordData.letters.map((letter, letterIndex) => {
                      const opacity = useTransform(
                        warpedProgress,
                        [letter.delay, letter.delay + 0.3],
                        [0, 1]
                      );

                      return (
                        <motion.span
                          key={letterIndex}
                          className="inline-block text-black"
                          style={{
                            opacity,
                            fontSize: "var(--type-hero)",
                            fontWeight: 900,
                            fontFamily: "'Inter', sans-serif",
                            textShadow: "0 0 6px white, 0 0 6px white, 0 0 6px white, 0 0 6px white",
                            lineHeight: "1.08"
                          }}
                        >
                          {letter.char}
                        </motion.span>
                      );
                    })}
                  </span>
                ))}
              </div>
            ))}
          </div>
          
          <div 
            className="relative"
            style={{
              marginTop: isDesktop ? desktopPxToVw(24) : mobilePxToVw(10),
              fontFamily: "'Inter', sans-serif",
              textAlign: 'left',
              maxWidth: isDesktop ? desktopPxToVw(380) : mobilePxToVw(270)
            }}
          >
            <p style={{ 
              fontWeight: 700,
              fontSize: "var(--type-hero-sub-strong)",
              lineHeight: isDesktop ? "1.2" : "1.3",
              textShadow: "0 0 6px white, 0 0 6px white, 0 0 6px white, 0 0 6px white",
              marginBottom: "-3px"
            }}>
              {"Stai bene quando lavori?".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  style={{
                    opacity: useTransform(
                      warpedProgress,
                      [
                        config.lineTimings.question.base + (index * config.lineTimings.question.step),
                        config.lineTimings.question.base + (index * config.lineTimings.question.step) + config.lineTimings.question.duration
                      ],
                      [0, 1]
                    ),
                    color: useTransform(
                      warpedProgress,
                      [
                        config.lineTimings.question.base + (index * config.lineTimings.question.step),
                        config.lineTimings.question.base + (index * config.lineTimings.question.step) + config.lineTimings.question.duration
                      ],
                      ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 1)']
                    )
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </p>
            <p style={{ 
              fontWeight: 500,
              fontSize: "var(--type-hero-sub)",
              lineHeight: isDesktop ? "1.2" : "1.3",
              textShadow: "0 0 6px white, 0 0 6px white, 0 0 6px white, 0 0 6px white",
              marginBottom: "-3px"
            }}>
              {"la responsabilità lavorativa:".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  style={{
                    opacity: useTransform(
                      warpedProgress,
                      [
                        config.lineTimings.responsibility.base + (index * config.lineTimings.responsibility.step),
                        config.lineTimings.responsibility.base + (index * config.lineTimings.responsibility.step) + config.lineTimings.responsibility.duration
                      ],
                      [0, 1]
                    ),
                    color: useTransform(
                      warpedProgress,
                      [
                        config.lineTimings.responsibility.base + (index * config.lineTimings.responsibility.step),
                        config.lineTimings.responsibility.base + (index * config.lineTimings.responsibility.step) + config.lineTimings.responsibility.duration
                      ],
                      ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 1)']
                    )
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </p>
            <p style={{ 
              fontWeight: 500,
              fontSize: "var(--type-hero-sub)",
              lineHeight: isDesktop ? "1.2" : "1.3",
              textShadow: "0 0 6px white, 0 0 6px white, 0 0 6px white, 0 0 6px white",
              marginBottom: "-3px"
            }}>
              {"Come trasformare".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  style={{
                    opacity: useTransform(
                      warpedProgress,
                      [
                        config.lineTimings.transform.base + (index * config.lineTimings.transform.step),
                        config.lineTimings.transform.base + (index * config.lineTimings.transform.step) + config.lineTimings.transform.duration
                      ],
                      [0, 1]
                    ),
                    color: useTransform(
                      warpedProgress,
                      [
                        config.lineTimings.transform.base + (index * config.lineTimings.transform.step),
                        config.lineTimings.transform.base + (index * config.lineTimings.transform.step) + config.lineTimings.transform.duration
                      ],
                      ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 1)']
                    )
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </p>
            <p style={{ 
              fontWeight: 500,
              fontSize: "var(--type-hero-sub)",
              lineHeight: isDesktop ? "1.2" : "1.3",
              textShadow: "0 0 6px white, 0 0 6px white, 0 0 6px white, 0 0 6px white"
            }}>
              {"da peso a ".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  style={{
                    opacity: useTransform(
                      warpedProgress,
                      [0.36 + (index * 0.005), 0.36 + (index * 0.005) + 0.05],
                      [0, 1]
                    ),
                    color: useTransform(
                      warpedProgress,
                      [0.36 + (index * 0.005), 0.36 + (index * 0.005) + 0.05],
                      ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 1)']
                    )
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              {"opportunità.".split("").map((char, index) => (
                <motion.span
                  key={index + 10}
                  className="inline-block"
                  style={{
                    fontWeight: 600,
                    opacity: useTransform(
                      warpedProgress,
                      [
                        config.lineTimings.closing.base + ((index + 10) * config.lineTimings.closing.step),
                        config.lineTimings.closing.base + ((index + 10) * config.lineTimings.closing.step) + config.lineTimings.closing.duration
                      ],
                      [0, 1]
                    ),
                    color: useTransform(
                      warpedProgress,
                      [
                        config.lineTimings.closing.base + ((index + 10) * config.lineTimings.closing.step),
                        config.lineTimings.closing.base + ((index + 10) * config.lineTimings.closing.step) + config.lineTimings.closing.duration
                      ],
                      ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 1)']
                    )
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
