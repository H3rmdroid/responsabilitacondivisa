import { motion } from "motion/react";

export function EsperienzaContent2() {
  return (
    <div className="bg-white w-full flex flex-col" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
      {/* Testo dell'esperienza */}
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
        "Gli episodi che potrei raccontare sono quotidiani, sin dall'approccio comunicativo che ha con me quando mi deve spiegare un compito da svolgere, quindi giornaliero. Quello che mi è rimasto nel cuore è stato quando ho iniziato a soffrire di problemi alla schiena. Da quel momento non mi permette più di svolgere lavori impegnativi, come pacchi pesanti o scarichi di merce, occupandosene personalmente."
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
        - Sandro, 41 anni, spedizioni e servizio clienti di un'azienda di Bonsai
      </motion.p>
    </div>
  );
}
