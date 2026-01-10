import { motion } from "framer-motion";

export function EsperienzaContent() {
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
        "Il mio capo non si mette mai in discussione, trattando i suoi dipendenti come oggetti di proprietà. Lo stipendio non costituisce il giusto compenso per il lavoro svolto e il valore portato in azienda, piuttosto la moneta di scambio che l'autorizza ad appropriarsi della tua vita a 360°. Ciò che lei chiama "flessibilità" è in realtà invasione del tuo spazio personale: la sera, nei weekend, durante le ferie o in malattia. Devi esserci sempre e comunque. E per quanto tu possa fare, non vieni mai valorizzato o premiato, anche solo con un complimento, per il buon lavoro svolto. Però se fai un errore…beh, in quel caso puoi sentire le urla a Km di distanza perché non è in grado di avere reazioni proporzionate agli eventi, basta una sciocchezza per farla scattare."
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
        - Mario, 40 anni, impiegato amministrativo
      </motion.p>
    </div>
  );
}