import { motion } from "motion/react";

export function StoriaContent() {
  return (
    <div className="bg-white w-full flex flex-col" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
      {/* Testo della storia */}
      <motion.p
        className="text-black"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "var(--type-body-lg)",
          lineHeight: "1.4",
          marginBottom: "20px",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        "L'ho pensato qualche giorno fa mentre, il mio team ed io, affrontavamo un imprevisto. Nulla di irreparabile, ma quanto basta per farti capire l'importanza di avere una squadra in grado di reagire, non solo agire. Nel mondo delle startup si parla spesso e volentieri delle performance, ma troppo poco di resilienza operativa. Quella capacità di rimanere lucidi quando il piano A salta, e il piano B non è ancora chiaro. Come si allena? Con l'esperienza, certo. Ma soprattutto costruendo una cultura dove l'errore è parte del gioco, e la soluzione è una responsabilità condivisa."
      </motion.p>

      {/* Fonte */}
      <motion.p
        className="text-black"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 200,
          fontSize: "var(--type-caption-sm)",
          lineHeight: "1.3",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        - Dario Ferretti, Co Founder dell'app Pick-Roll, on LinkedIn
      </motion.p>
    </div>
  );
}