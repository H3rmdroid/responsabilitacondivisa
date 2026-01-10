import { motion } from "motion/react";

export function StoriaVenticentoContent() {
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
        "Prendersi cura delle persone significa ascoltarle davvero. Negli anni abbiamo rafforzato le nostre politiche di benessere organizzativo, introducendo incontri settimanali one-to-one tra management e team, rivedendo gli spazi di lavoro per renderli più funzionali e inclusivi, e avviando un processo strutturato di feedback annuale. Con l'ingresso di nuove figure manageriali, abbiamo reso l'ascolto interno una pratica costante e non episodica. Questo ha permesso di dare voce alle esigenze individuali, migliorare il clima interno e costruire relazioni di fiducia. Crediamo che un ambiente di lavoro sano e dinamico sia la base per ogni percorso sostenibile: è da lì che nascono il senso di appartenenza, la motivazione e la responsabilità condivisa."
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
        - Venticento Eventi, agenzia creativa, LinkedIn novembre 2025
      </motion.p>
    </div>
  );
}