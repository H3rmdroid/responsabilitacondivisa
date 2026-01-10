import svgPaths from "../imports/svg-hxp6ocpt0k";
import { useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

function CloseIcon() {
  return (
    <div className="h-[24px] w-[24px] relative shrink-0" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p3ccdbfe0} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99985" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p2b721100} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99985" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AnimatedNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 1500; // 1.5 seconds for the animation

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * target);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>{count}</span>
  );
}

export function EngagementContent() {
  return (
    <div className="bg-white w-full flex flex-col" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
      {/* Main number - aligned left */}
      <div className="flex flex-col" style={{ marginTop: "40px", marginBottom: "20px" }}>
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "var(--type-display)", lineHeight: "1", marginBottom: "0" }}>
            <AnimatedNumber target={438} />
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "var(--type-display-sm)", lineHeight: "1.1", marginTop: "6px" }}>
            miliardi di dollari
          </div>
        </div>
      </div>

      {/* Title */}
      <h2
        className="text-black"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: "var(--type-h3)",
          lineHeight: "1.1",
          maxWidth: "326px",
          marginBottom: "20px",
        }}
      >
        Sono andati persi nel 2024 a causa della diminuzione dell'engagement globale
      </h2>

      {/* Description text */}
      <div className="mb-8">
        <p
          className="text-black"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "var(--type-body)",
            lineHeight: "1.3",
            maxWidth: "322px",
            marginBottom: "10px",
          }}
        >
          La causa principale? Il crollo dell'ingaggio tra i manager, sceso <strong>dal 30% al 27%</strong>. Ancora più marcato tra i manager under 35 e le donne manager. Gli individual contributor, invece, restano fermi a un preoccupante <strong>18%</strong>.
        </p>

        {/* Source citation */}
        <p
          className="text-black"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 200,
            fontSize: "var(--type-caption-sm)",
            lineHeight: "1.3",
            maxWidth: "220px",
          }}
        >
          Gallup State of the Global Workplace – Report 2025
        </p>
      </div>
    </div>
  );
}