import { BackgroundSvg } from "./components/BackgroundSvg";
import { DecorativeSvg } from "./components/DecorativeSvg";
import { BackgroundThreadsSvg } from "./components/BackgroundThreadsSvg";
import { BackgroundThreadsSvg2 } from "./components/BackgroundThreadsSvg2";
import { QuizWrapper } from "./components/QuizWrapper";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FloatingTitle } from "./components/FloatingTitle";
import { ScrollColorTitle } from "./components/ScrollColorTitle";
import { AccordionItem } from "./components/AccordionItem";
import { Quiz } from "./components/Quiz";
import { AnimatedNumber } from "./components/AnimatedNumber";
import { useIsDesktop } from "./hooks/useIsDesktop";
import { getBackgroundLayout } from "./layout/backgroundLayout";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { Menu, X } from "lucide-react";
import {
  DESKTOP_REFERENCE_HEIGHT,
  DESKTOP_REFERENCE_WIDTH,
  MOBILE_REFERENCE_HEIGHT,
  MOBILE_REFERENCE_WIDTH,
} from "./layout/scale";

const desktopVhToPx = (vh: number) =>
  (vh / 100) * DESKTOP_REFERENCE_HEIGHT;
const mobileVhToPx = (vh: number) =>
  (vh / 100) * MOBILE_REFERENCE_HEIGHT;

export default function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [bannerContent, setBannerContent] = useState({
    title: "",
    text: "",
  });
  const isDesktop = useIsDesktop();
  const { pageMinHeight } = getBackgroundLayout(isDesktop);
  const textReferenceWidth = isDesktop
    ? DESKTOP_REFERENCE_WIDTH
    : MOBILE_REFERENCE_WIDTH;
  const [textScale, setTextScale] = useState(() => {
    if (typeof window === "undefined") {
      return 1;
    }

    return window.innerWidth / textReferenceWidth;
  });

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth || textReferenceWidth;
      setTextScale(width / textReferenceWidth);
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, [textReferenceWidth]);
  const textLayout = isDesktop
    ? {
        about: {
          paddingX: 65,
          paddingTop: 0,
          paddingBottom: 20,
          marginTop: desktopVhToPx(285),
        },
        impact: {
          paddingX: 65,
          paddingTop: 0,
          marginTop: desktopVhToPx(550),
        },
        quiz: {
          paddingX: 0,
          paddingTop: 0,
          marginTop: 7300,
        },
        consigli: {
          paddingX: 20,
          paddingTop: 0,
          marginTop: 8625,
        },
        consigliDots: {
          height: 500,
          marginTop: 415,
          offsetX: 0,
          offsetY: 0,
        },
      }
    : {
        about: {
          paddingX: 20,
          paddingTop: 0,
          paddingBottom: 20,
          marginTop: 800,
        },
        impact: {
          paddingX: 20,
          paddingTop: 0,
          marginTop: 1500,
        },
        quiz: {
          paddingX: 0,
          paddingTop: 0,
          marginTop: 2290,
        },
        consigli: {
          paddingX: 20,
          paddingTop: 0,
          marginTop: 2950,
        },
        consigliDots: {
          height: 500,
          marginTop: 60,
          offsetX: 0,
          offsetY: 0,
        },
      };
  const lineBreak = isDesktop ? " " : <br />;
  const textMaxWidthNarrow = isDesktop
    ? 820
    : 280;
  const textMaxWidthInner = isDesktop
    ? 820
    : 300;
  const textMaxWidthWide = isDesktop
    ? 820
    : 350;
  const footerLayout = isDesktop
    ? {
        paddingX: 50,
        paddingY: 150,
        minHeight: 360,
        offsetTop: 1500,
      }
    : {
        paddingX: 10,
        paddingY: 20,
        minHeight: 220,
        offsetTop: 200,
      };
  const footerTop =
    textLayout.consigli.marginTop +
    textLayout.consigliDots.height +
    footerLayout.offsetTop;
  const textCanvasHeight =
    footerTop + footerLayout.minHeight;
  const textScaledHeight = textCanvasHeight * textScale;
  const textScaledWidth = textReferenceWidth * textScale;
  const contentCanvasHeight = `${Math.round(textScaledHeight)}px`;
  
  // Ref per la sezione "Storie di cambiamento"
  const storieCambiamentoRef = useRef<HTMLDivElement>(null);
  
  // Stati per gli accordion
  const [openAccordions, setOpenAccordions] = useState<{
    dati: number | null;
    esperienze: number | null;
    storie: number | null;
  }>({
    dati: null,
    esperienze: null,
    storie: null,
  });
  const isAccordionOpen =
    openAccordions.dati !== null ||
    openAccordions.esperienze !== null ||
    openAccordions.storie !== null;
  
  // Stato per il consiglio aperto
  const [openConsiglio, setOpenConsiglio] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const navRef = useRef(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 100) {
      setIsVisible(true);
    } else if (latest > lastScrollY) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition =
        element.getBoundingClientRect().top +
        window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500;
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
      setIsMenuOpen(false);
    }
  };

  const openBanner = (title: string, text: string) => {
    setBannerContent({ title, text });
    setIsBannerOpen(true);
  };

  const toggleAccordion = (section: string, index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [section]: prev[section] === index ? null : index,
    }));
  };

  const datiItems = [
    {
      title: "Engagement e impatto economico",
      content: "",
      customContent: (
        <div className="py-4">
          {/* Numero grande a sinistra */}
          <div
            className="text-black"
            style={{
              fontFamily: "'Inter Black', 'Inter', sans-serif",
              fontWeight: 900,
              textAlign: "left",
              marginBottom: "20px",
            }}
          >
            <AnimatedNumber
              value={438}
              duration={1.8}
              style={{ margin: 0, fontSize: isDesktop ? "120px" : "70px", lineHeight: "0.9", fontFamily: "'Inter Black', 'Inter', sans-serif", fontWeight: 900, marginTop: "15px" }}
            />
            <p style={{ margin: 0, fontSize: isDesktop ? "44px" : "26px", lineHeight: "1.05", marginTop: "-5px", fontFamily: "'Inter Black', 'Inter', sans-serif", fontWeight: 900 }}>
              miliardi di dollari
            </p>
          </div>

          {/* Titolo bold */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "var(--type-section-subtitle)",
              lineHeight: "1.05",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            Sono andati persi nel 2024 a causa della diminuzione dell'engagement globale
          </p>

          {/* Testo descrittivo */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "var(--type-section-body)",
              lineHeight: "1.3",
              marginBottom: "20px",
            }}
          >
            La causa principale? Il crollo dell'ingaggio tra i manager, sceso dal 30% al 27%. 
            Ancora più marcato tra i manager under 35 e le donne manager. Gli individual 
            contributor, invece, restano fermi a un preoccupante 18%.
          </p>

          {/* Fonte */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 200,
              fontSize: "var(--type-section-meta)",
              lineHeight: "1.1",
              color: "#666",
              marginTop: "20px",
            }}
          >
            Gallup State of the Global Workplace – Report 2025
          </p>
        </div>
      ),
    },
    {
      title: "Il moltiplicatore di performance",
      content: "",
      customContent: (
        <div className="py-4">
          {/* Numero grande a sinistra */}
          <div
            className="text-black"
            style={{
              fontFamily: "'Inter Black', 'Inter', sans-serif",
              fontWeight: 900,
              textAlign: "left",
              marginBottom: "20px",
            }}
          >
            <AnimatedNumber
              value={240}
              duration={1.8}
              suffix="%"
              style={{ margin: 0, fontSize: isDesktop ? "120px" : "70px", lineHeight: "0.9", fontFamily: "'Inter Black', 'Inter', sans-serif", fontWeight: 900, marginTop: "15px" }}
            />
          </div>

          {/* Titolo bold */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "var(--type-section-subtitle)",
              lineHeight: "1.05",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            È l'aumento dei risultati legati alla performance registrato tra il 2011 e il 2012
          </p>

          {/* Testo descrittivo */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "var(--type-section-body)",
              lineHeight: "1.3",
              marginBottom: "20px",
            }}
          >
            Questo significativo incremento nei risultati di business legati alla performance è stato rilevato analizzando l'effetto combinato dell'impegno dei dipendenti e del coinvolgimento dei clienti, secondo l'approccio HumanSigma di Gallup. Questo dato fa parte di un rapporto basato sulle scoperte emerse da uno studio condotto nei luoghi di lavoro tra il 2011 e il 2012. Tale metodologia combina la misurazione del coinvolgimento dei dipendenti e quello dei clienti per ottimizzare i risultati aziendali.
          </p>

          {/* Fonte */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 200,
              fontSize: "var(--type-section-meta)",
              lineHeight: "1.1",
              color: "#666",
              marginTop: "20px",
            }}
          >
            Gallup State of the Global Workplace - Report 2012
          </p>
        </div>
      ),
    },
    {
      title: "Engagement: il fattore determinante",
      content: "",
      customContent: (
        <div className="py-4">
          {/* Numero grande a sinistra */}
          <div
            className="text-black"
            style={{
              fontFamily: "'Inter Black', 'Inter', sans-serif",
              fontWeight: 900,
              textAlign: "left",
              marginBottom: "20px",
            }}
          >
            <AnimatedNumber
              value={70}
              duration={1.8}
              suffix="%"
              style={{ margin: 0, fontSize: isDesktop ? "120px" : "70px", lineHeight: "0.9", fontFamily: "'Inter Black', 'Inter', sans-serif", fontWeight: 900, marginTop: "15px" }}
            />
          </div>

          {/* Titolo bold */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "var(--type-section-subtitle)",
              lineHeight: "1.05",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            È l'impatto del capo diretto sull'opinione e il livello di engagement dei dipendenti.
          </p>

          {/* Testo descrittivo */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "var(--type-section-body)",
              lineHeight: "1.3",
              marginBottom: "20px",
            }}
          >
            I manager svolgono un ruolo critico nel guidare il coinvolgimento in qualsiasi organizzazione. Le percezioni dei dipendenti riguardo al loro supervisore diretto influenzano in modo determinante il loro livello di engagement, superando l'impatto degli atteggiamenti dei colleghi e di altri fattori. I supervisori diretti sono i principali responsabili dei livelli di coinvolgimento dei loro sottoposti.
          </p>

          {/* Fonte */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 200,
              fontSize: "var(--type-section-meta)",
              lineHeight: "1.1",
              color: "#666",
              marginTop: "20px",
            }}
          >
            Gallup State of the Global Worplace- Report 2012
          </p>
        </div>
      ),
    },
  ];

  const esperienzeItems = [
    {
      title: "Il capo autoritario",
      content: "",
      customContent: (
        <div className="py-4">
          {/* Testo principale */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "var(--type-section-body)",
              lineHeight: "1.3",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            "Non si mette mai in discussione, trattando i suoi dipendenti come oggetti di proprietà. Lo stipendio non costituisce il giusto compenso per il lavoro svolto e il valore portato in azienda, piuttosto la moneta di scambio che l'autorizza ad appropriarsi della tua vita a 360°. Ciò che lei chiama "flessibilità" è in realtà invasione del tuo spazio personale: la sera, nei weekend, durante le ferie o in malattia. Devi esserci sempre e comunque. E per quanto tu possa fare, non vieni mai valorizzato o premiato, anche solo con un complimento, per il buon lavoro svolto. Però se fai un errore…beh, in quel caso puoi sentire le urla a Km di distanza perché non è in grado di avere reazioni proporzionate agli eventi, basta una sciocchezza per farla scattare."
          </p>

          {/* Fonte */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 200,
              fontSize: "var(--type-section-meta)",
              lineHeight: "1.1",
              color: "#666",
              marginTop: "20px",
            }}
          >
            - Mario, 40 anni, impiegato amministrativo
          </p>
        </div>
      ),
    },
    {
      title: "Il leader saggio",
      content: "",
      customContent: (
        <div className="py-4">
          {/* Testo principale */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "var(--type-section-body)",
              lineHeight: "1.3",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            "Gli episodi che potrei raccontare sono quotidiani, sin dall'approccio comunicativo che ha con me quando mi deve spiegare un compito da svolgere, quindi giornaliero. Quello che mi è rimasto nel cuore è stato quando ho iniziato a soffrire di problemi alla schiena. Da quel momento non mi permette più di svolgere lavori impegnativi, come pacchi pesanti o scarichi di merce, occupandosene personalmente."
          </p>

          {/* Fonte */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 200,
              fontSize: "var(--type-section-meta)",
              lineHeight: "1.1",
              color: "#666",
              marginTop: "20px",
            }}
          >
            - Sandro, 41 anni, spedizioni e servizio clienti di un'azienda di bonsai
          </p>
        </div>
      ),
    },
    {
      title: "L'importanza di essere uniti",
      content: "",
      customContent: (
        <div className="py-4">
          {/* Testo principale */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "var(--type-section-body)",
              lineHeight: "1.3",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <span style={{ fontStyle: "italic" }}>
              "Sembra tutto sotto controllo, finché non lo è più.
            </span>
            <br /><br />
            L'ho pensato qualche giorno fa mentre, il mio team ed io, affrontavamo un imprevisto. Nulla di irreparabile, ma quanto basta per farti capire l'importanza di avere una squadra in grado di reagire, non solo agire.
            <br /><br />
            Nel mondo delle startup si parla spesso e volentieri delle performance, ma troppo poco di resilienza operativa. Quella capacità di rimanere lucidi quando il piano A salta, e il piano B non è ancora chiaro.
            <br /><br />
            Come si allena? Con l'esperienza, certo. Ma soprattutto costruendo una cultura dove l'errore è parte del gioco, e la soluzione è una responsabilità condivisa."
          </p>

          {/* Fonte */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 200,
              fontSize: "var(--type-section-meta)",
              lineHeight: "1.1",
              color: "#666",
              marginTop: "20px",
            }}
          >
            - Dario Ferretti, CEO e Co-founder dell'app Pick-Roll
          </p>
        </div>
      ),
    },
  ];

  const storieItems = [
    {
      title: "Ascolto e benessere organizzativo",
      content: "",
      customContent: (
        <div className="py-4">
          {/* Testo principale */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "var(--type-section-body)",
              lineHeight: "1.3",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            "Prendersi cura delle persone significa ascoltarle davvero.
            <br /><br />
            Negli anni abbiamo rafforzato le nostre politiche di benessere organizzativo, introducendo incontri settimanali one-to-one tra management e team, rivedendo gli spazi di lavoro per renderli più funzionali e inclusivi, e avviando un processo strutturato di feedback annuale.
            <br /><br />
            Con l'ingresso di nuove figure manageriali, abbiamo reso l'ascolto interno una pratica costante e non episodica. Questo ha permesso di dare voce alle esigenze individuali, migliorare il clima interno e costruire relazioni di fiducia.
            <br /><br />
            Crediamo che un ambiente di lavoro sano e dinamico sia la base per ogni percorso sostenibile: è da lì che nascono il senso di appartenenza, la motivazione e la responsabilità condivisa."
          </p>

          {/* Fonte */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 200,
              fontSize: "var(--type-section-meta)",
              lineHeight: "1.1",
              color: "#666",
              marginTop: "20px",
            }}
          >
            - Venticento Eventi, agenzia creativa
          </p>
        </div>
      ),
    },
    {
      title: "La trasformazione di un team",
      content: "",
      customContent: (
        <div className="py-4">
          {/* Testo principale */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "var(--type-section-body)",
              lineHeight: "1.3",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            "Ricordo un momento, qualche tempo fa, in cui il nostro team sembrava un gruppo di solisti di talento che suonavano spartiti diversi. C'era impegno, ma c'era anche confusione. Sentivamo di star correndo velocissimi, ma rimanevamo sempre nello stesso posto.
            <br /><br />
            Abbiamo deciso di fermarci e riflettere.
            <br /><br />
            Abbiamo definito una visione così chiara, stabilito ruoli e aspettative precisi ed accettato la responsabilità individuale.
            <br /><br />
            Il risultato? Quando sai dove vai e sai che il tuo compagno di squadra farà la sua parte esattamente come tu farai la tua, accade qualcosa di magico: nasce la fiducia e un gruppo di lavoro dove il successo di uno è la vittoria di tutti."
          </p>

          {/* Fonte */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 200,
              fontSize: "var(--type-section-meta)",
              lineHeight: "1.1",
              color: "#666",
              marginTop: "20px",
            }}
          >
            - Adolfo, 56 anni, dirigente di una multinazionale
          </p>
        </div>
      ),
    },
  ];

  const consigliItems = [
    {
      title: "Riconosci i tuoi limiti: impara il \"Sì, ma...\"",
      text: "La forza è sapere quando fermarsi. Impara a riconoscere in anticipo i segnali di sovraccarico. Quando ricevi un nuovo compito, invece di accettare passivamente, usa la formula \"Sì, lo gestirò ma ho bisogno di ridefinire la priorità di X o di delegare Y\". Questo definisce confini chiari e protegge il tuo benessere.",
    },
    {
      title: "Condividi il carico: dall'io al noi",
      text: "Non devi essere l'unico eroe. La <strong>responsabilità condivisa</strong> è un pilastro del successo di team. Se ti senti sommerso/a, <strong>non aspettare di essere in crisi</strong>. Avvicinati a un collega o al tuo responsabile e <strong>chiedi</strong>: \"Potresti aiutarmi a sbloccare questa sezione? O a esaminare insieme il piano d'azione?\". <strong>Dividere</strong> riduce il rischio e aumenta la velocità.",
    },
    {
      title: "Celebra i piccoli successi: nutri la motivazione",
      text: "Non aspettare il traguardo finale. Il benessere fiorisce quando <strong>riconosciamo il progresso</strong>. Hai chiuso una mail particolarmente complessa? Hai terminato la prima fase del progetto? <strong>Prenditi un momento</strong> (anche solo un minuto!) per riconoscere quel piccolo risultato. <strong>Celebrare i \"mini-goal\"</strong> mantiene alta l'energia e la responsabilità positiva.",
    },
    {
      title: "Focalizzati sull'impatto, non sulla perfezione",
      text: "La vera responsabilità è fornire il massimo valore possibile nei limiti di tempo e risorse disponibili. Chiediti: \"Qual è l'obiettivo essenziale di questo lavoro?\" Evita il perfezionismo paralizzante (che consuma tempo e benessere) e concentrati sulla qualità che genera il miglior impatto per l'azienda.",
    },
    {
      title: "Comunica apertamente: la trasparenza paga",
      text: "L'incertezza è la vera fonte di stress. Se hai un problema, se la scadenza è a rischio, o se hai bisogno di risorse, comunica immediatamente e con chiarezza. La responsabilità non è garantire la perfezione, ma garantire la trasparenza sul progresso. Il team può aiutarti solo se sa esattamente dove sei.",
    },
  ];

  const consigliPositionsDesktop = [
    { top: "calc(22% + 11px)", left: "calc(28% - 7px)" },
    { top: "calc(38% + 470px)", left: "calc(72% - 50px)" },
    { top: "calc(58% + 357px)", left: "calc(18% + 119px)" },
    { top: "calc(12% + 80px)", left: "calc(85% - 225px)" },
    { top: "calc(75% + 30px)", left: "calc(55% - 90px)" },
  ];

  const consigliPositionsMobile = [
    { top: "calc(22% + 12px)", left: "calc(28% - 18px)" },
    { top: "calc(38% + 198px)", left: "calc(72% - 8px)" },
    { top: "calc(58% + 6px)", left: "calc(18% + 18px)" },
    { top: "calc(12% + 68px)", left: "calc(85% - 55px)" },
    { top: "calc(75% - 160px)", left: "calc(55% - 29px)" },
  ];

  const consigliPositions = isDesktop ? consigliPositionsDesktop : consigliPositionsMobile;
  const consigliDots = consigliItems.map((item, index) => ({
    ...item,
    position: consigliPositions[index] ?? { top: "0px", left: "0px" },
  }));
  const textScaleOuterStyles: CSSProperties = {
    position: "relative",
    width: textScaledWidth,
    height: textScaledHeight,
  };
  const textScaleInnerStyles: CSSProperties & Record<string, string | number> = {
    position: "relative",
    width: textReferenceWidth,
    height: textCanvasHeight,
    transform: `scale(${textScale})`,
    transformOrigin: "top left",
    willChange: "transform",
    "--type-scale": 1,
    "--type-hero": isDesktop ? "64px" : "40px",
    "--type-hero-sub-strong": isDesktop ? "28px" : "16px",
    "--type-hero-sub": isDesktop ? "26px" : "16px",
    "--type-section-title": isDesktop ? "42px" : "24px",
    "--type-section-subtitle": isDesktop ? "28px" : "18px",
    "--type-section-body": isDesktop ? "20px" : "15px",
    "--type-section-body-sm": isDesktop ? "18px" : "15px",
    "--type-section-meta": isDesktop ? "16px" : "12px",
    "--type-quiz-title": "var(--type-section-body)",
    "--type-quiz-subtitle": "var(--type-section-body)",
    "--type-quiz-body": "var(--type-section-body)",
    "--type-quiz-meta": isDesktop ? "16px" : "12px",
  };

  return (
      <div
        className="bg-white min-h-screen"
        style={{
          position: "relative",
          margin: 0,
          padding: 0,
        }}
      >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: pageMinHeight,
          pointerEvents: "none",
          zIndex: 0,
          opacity: isAccordionOpen ? 0 : 1,
          transition: "opacity 200ms ease",
        }}
      >
        <BackgroundSvg storieCambiamentoRef={storieCambiamentoRef} />
        <DecorativeSvg />
        <BackgroundThreadsSvg />
        <BackgroundThreadsSvg2 />
      </div>
      
      {/* Content wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: `max(${pageMinHeight}, ${contentCanvasHeight})`,
          display: "grid",
          gridTemplateRows: "1fr auto",
        }}
      >
      <div style={{ position: "relative", minHeight: pageMinHeight }}>
      <motion.nav
        className="fixed top-0 left-0 right-0 h-[40px] bg-transparent z-50 flex items-center justify-between"
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "30px",
        }}
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isVisible ? 0 : -70,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          y: {
            duration: isVisible ? 0.3 : 0.8,
            ease: "easeInOut",
          },
          opacity: {
            duration: isVisible ? 0.4 : 1.2,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
      >
        <motion.div
          className="text-black"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: "var(--type-section-body)",
          }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{
            duration: isVisible ? 0.4 : 1.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          Responsabilità condivisa
        </motion.div>
        <motion.button
          className="text-black cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{
            duration: isVisible ? 0.4 : 1.2,
            ease: [0.4, 0, 0.2, 1],
          }}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </motion.button>
      </motion.nav>

      {/* Side Menu Overlay */}
      <motion.div
        className="fixed inset-0 bg-black z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Side Menu */}
      <motion.div
        className="fixed top-0 right-0 h-full bg-white z-50 flex flex-col"
        style={{
          width: "400px",
          paddingTop: "30px",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex justify-end mb-12">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-black cursor-pointer"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-8">
          {[
            { label: "Il progetto", sectionId: "about" },
            {
              label: "L'impatto reale",
              sectionId: "impatto-reale",
            },
            { label: "Mettiti alla prova", sectionId: "test" },
            { label: "Consigli utili", sectionId: "consigli" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.sectionId)}
              className="text-left text-black relative group"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "var(--type-section-title)",
              }}
            >
              {item.label}
              <span className="absolute left-0 right-0 bottom-[-2px] h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Banner Overlay */}
      <motion.div
        className="fixed inset-0 bg-black z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isBannerOpen ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          pointerEvents: isBannerOpen ? "auto" : "none",
        }}
        onClick={() => setIsBannerOpen(false)}
      />

      {/* Side Banner */}
      <motion.div
        className="fixed top-0 right-0 h-full bg-white z-50 flex flex-col overflow-y-auto"
        style={{
          width: "90vw",
          maxWidth: "500px",
          paddingTop: "30px",
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingBottom: "60px",
        }}
        initial={{ x: "100%" }}
        animate={{ x: isBannerOpen ? 0 : "100%" }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsBannerOpen(false)}
            className="text-black cursor-pointer"
            aria-label="Close banner"
          >
            <X size={24} />
          </button>
        </div>

        {/* Illustration space */}
        <div
          className="w-full h-[300px] bg-gray-100 flex items-center justify-center flex-shrink-0"
          style={{ marginBottom: "30px" }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "var(--type-section-meta)",
              color: "#666",
            }}
          >
            Illustrazione
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-black"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "var(--type-section-title)",
            marginBottom: "16px",
          }}
        >
          {bannerContent.title}
        </h2>

        {/* Content */}
        <div
          className="text-black"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "var(--type-section-body-sm)",
            lineHeight: "1.3",
          }}
        >
          {bannerContent.text}
        </div>
      </motion.div>

      <div style={textScaleOuterStyles}>
        <div style={textScaleInnerStyles}>
        <FloatingTitle />

        <section
          id="about"
          style={{
            position: "absolute",
            top: textLayout.about.marginTop,
            left: 0,
            right: 0,
            paddingLeft: textLayout.about.paddingX,
            paddingRight: textLayout.about.paddingX,
            paddingTop: textLayout.about.paddingTop,
            paddingBottom: textLayout.about.paddingBottom,
            marginTop: 0,
            maxWidth: isDesktop ? textMaxWidthWide : "100%",
          }}
        >
          <div className="flex flex-col gap-[37px]">
            <div>
              <ScrollColorTitle
                text={`Oltre il "Ce la devo \nfare da solo". `}
              />
            </div>
            <div
              className="text-black flex flex-col"
              style={{
                maxWidth: textMaxWidthNarrow,
                gap: isDesktop ? "42px" : "30px"
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--type-section-body)",
                  lineHeight: "1.3",
                  textAlign: "left",
                }}
              >
                Spesso, la parola "responsabilità" evoca{" "}
                <strong>stress</strong>, sovraccarico{lineBreak}e
                solitudine. Ci sentiamo l'unico punto di
                fallimento o successo.{lineBreak}Ma cosa succederebbe se
                la vedessimo come un'
                <strong>opportunità</strong> di crescita
                collettiva?
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--type-section-body)",
                  lineHeight: "1.3",
                  textAlign: "left",
                }}
              >
                Il benessere sul lavoro{" "}
                <strong>non è un benefit</strong>, ma il
                risultato{lineBreak}di un ambiente dove la responsabilità{lineBreak}è condivisa, chiara e sostenibile. Significa
                passare dal "Ce la devo fare da solo" al "{" "}
                <strong>Ci riusciamo insieme</strong>".
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--type-section-body)",
                  lineHeight: "1.3",
                  textAlign: "left",
                }}
              >
                Questo è il punto di partenza{lineBreak}per comprendere e{" "}
                <strong>trasformare</strong>{lineBreak}il nostro rapporto
                con la responsabilità lavorativa, rendendola un
                motore{lineBreak}di <strong>benessere</strong>, non un
                freno.
              </p>
            </div>
          </div>
        </section>

      <section
        id="impatto-reale"
        className="relative w-full pb-20"
        style={{
          position: "absolute",
          top: textLayout.impact.marginTop,
          left: 0,
          right: 0,
          paddingLeft: textLayout.impact.paddingX,
          paddingRight: textLayout.impact.paddingX,
          paddingTop: textLayout.impact.paddingTop,
          marginTop: 0,
        }}
      >
        <div className="mb-[30px]" style={{ marginBottom: isDesktop ? "60px" : "0px" }}>
          <ScrollColorTitle
            text={`La responsabilità condivisa \nfunziona: risultati ed \nesperienze reali`}
          />
        </div>

        {/* Introduzione - allineata a sinistra */}
        <div
          className="flex flex-col"
          style={{
            maxWidth: textMaxWidthWide,
            marginBottom: isDesktop ? "96px" : "0px",
            gap: isDesktop ? "42px" : "18px",
          }}
        >
          <div className="text-black flex flex-col gap-[42px]">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "var(--type-section-body)",
                lineHeight: isDesktop ? "1.4" : "1.3",
                textAlign: "left",
                maxWidth: textMaxWidthNarrow,
                marginTop: "20px",
              }}
            >
              La responsabilità condivisa<br />non è solo teoria.
              Aziende di ogni settore stanno scoprendo che{" "}
              <strong>distribuire equamente</strong> i compiti<br />e promuovere la{" "}
              <strong>collaborazione</strong> porta a <strong>risultati concreti</strong>: team<br />più motivati, meno burnout<br />e una <strong>cultura del
              lavoro più sana</strong>.
            </p>
          </div>
        </div>

        {/* Dati - allineata a destra */}
        <div
          style={{
            marginBottom: isDesktop ? "80px" : "40px",
            marginTop: isDesktop ? "60px" : "20px",
            maxWidth: textMaxWidthWide,
          }}
        >
          <div style={{ maxWidth: textMaxWidthInner, width: "100%" }}>
            <h3
              className="text-black"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "var(--type-section-subtitle)",
                lineHeight: "1.05",
                marginBottom: "10px",
              }}
            >
              Dati
            </h3>
            <ul
              className="list-disc pl-5 space-y-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "var(--type-section-body-sm)",
                lineHeight: "1.3",
              }}
            >
              {datiItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  content={item.content}
                  customContent={item.customContent}
                  isOpen={openAccordions.dati === index}
                  onToggle={() => toggleAccordion("dati", index)}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Esperienze - allineata a sinistra */}
        <div
          style={{
            marginBottom: isDesktop ? "80px" : "40px",
            maxWidth: textMaxWidthWide,
          }}
        >
          <div style={{ maxWidth: textMaxWidthInner, width: "100%" }}>
            <h3
              className="text-black"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "var(--type-section-subtitle)",
                lineHeight: "1.05",
                marginBottom: "10px",
              }}
            >
              Esperienze
            </h3>
            <ul
              className="list-disc pl-5 space-y-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "var(--type-section-body-sm)",
                lineHeight: "1.6",
              }}
            >
              {esperienzeItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  content={item.content}
                  customContent={item.customContent}
                  isOpen={openAccordions.esperienze === index}
                  onToggle={() => toggleAccordion("esperienze", index)}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Storie di cambiamento - allineata a destra */}
        <div
          ref={storieCambiamentoRef}
          style={{
            marginBottom: isDesktop ? "80px" : "40px",
            maxWidth: textMaxWidthWide,
          }}
        >
          <div style={{ maxWidth: textMaxWidthInner, width: "100%" }}>
            <h3
              className="text-black"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "var(--type-section-subtitle)",
                lineHeight: "1.05",
                marginBottom: "10px",
              }}
            >
              Storie di cambiamento
            </h3>
            <ul
              className="list-disc pl-5 space-y-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "var(--type-section-body-sm)",
                lineHeight: "1.6",
              }}
            >
              {storieItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  content={item.content}
                  customContent={item.customContent}
                  isOpen={openAccordions.storie === index}
                  onToggle={() => toggleAccordion("storie", index)}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sezione Quiz */}
      <section
        id="test"
        className="relative w-full"
        style={{
          position: "absolute",
          top: textLayout.quiz.marginTop,
          left: 0,
          right: 0,
          paddingLeft: textLayout.quiz.paddingX,
          paddingRight: textLayout.quiz.paddingX,
          paddingTop: textLayout.quiz.paddingTop,
          marginTop: 0,
          opacity: isAccordionOpen ? 0 : 1,
          pointerEvents: isAccordionOpen ? "none" : "auto",
          transition: "opacity 200ms ease",
        }}
      >
        {/* Quiz con animazione sticky sincronizzata */}
        <QuizWrapper />
      </section>

      {/* Sezione Cinque Passi */}
        <section
          id="consigli"
          className="relative w-full pb-20"
          style={{
            position: "absolute",
            top: textLayout.consigli.marginTop,
            left: 0,
            right: 0,
            paddingLeft: textLayout.consigli.paddingX,
            paddingRight: textLayout.consigli.paddingX,
            paddingTop: textLayout.consigli.paddingTop,
            marginTop: 0,
            opacity: isAccordionOpen ? 0 : 1,
            pointerEvents: isAccordionOpen ? "none" : "auto",
            transition: "opacity 200ms ease",
          }}
        >
          <div className="mb-[30px]">
            <ScrollColorTitle
              text={`Cinque passi quotidiani per trasformare la pressione in progresso`}
            />
          </div>
          
          {/* Area con pallini interattivi */}
          <div
            className="relative w-full"
            style={{
              height: textLayout.consigliDots.height,
              marginTop: textLayout.consigliDots.marginTop,
              transform: `translate(${textLayout.consigliDots.offsetX}px, ${textLayout.consigliDots.offsetY}px)`,
            }}
          >
            {consigliDots.map((consiglio, index) => (
              <motion.button
                key={index}
                className="absolute cursor-pointer"
                style={{
                  top: consiglio.position.top,
                  left: consiglio.position.left,
                  width: isDesktop ? "25px" : "7.5px",
                  height: isDesktop ? "25px" : "7.5px", 
                  borderRadius: "50%",
                  backgroundColor: "black",
                  border: "none",
                }}
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(0, 0, 0, 0.6), 0 0 0 3px rgba(0, 0, 0, 0.4), 0 0 0 6px rgba(0, 0, 0, 0.2)",
                    "0 0 0 3px rgba(0, 0, 0, 0.6), 0 0 0 6px rgba(0, 0, 0, 0.4), 0 0 0 9px rgba(0, 0, 0, 0.2)",
                    "0 0 0 0px rgba(0, 0, 0, 0.6), 0 0 0 3px rgba(0, 0, 0, 0.4), 0 0 0 6px rgba(0, 0, 0, 0.2)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 2,
                  boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.7), 0 0 0 6px rgba(0, 0, 0, 0.5), 0 0 0 9px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 1.5 }}
                onClick={() => setOpenConsiglio(openConsiglio === index ? null : index)}
                aria-label={`Consiglio ${index + 1}: ${consiglio.title}`}
              />
            ))}
          </div>
        </section>

        {/* Footer nero */}
        <div
          className="type-exempt"
          style={{ 
          backgroundColor: "black", 
          position: "absolute",
          top: footerTop,
          left: 0,
          right: 0,
          minHeight: footerLayout.minHeight,
          marginTop: 0,
          zIndex: 1,
          padding: `${footerLayout.paddingY}px ${footerLayout.paddingX}px`,
          opacity: 1,
        }}
        >
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 200,
            lineHeight: "0.3",
            color: "white"
          }}>
            <p style={{ marginBottom: "15px", fontSize: isDesktop ? "38px" : "var(--type-micro)" }}>Pausa Caffè</p>
            <p style={{ marginBottom: "15px", fontSize: isDesktop ? "28px" : "var(--type-micro)" }}>Un progetto della Rete dei Comitati Unici di Garanzia e degli Organismi di Parità Città di Milano</p>
            <p style={{ marginBottom: "15px", fontSize: isDesktop ? "28px" : "var(--type-micro)" }}>Design della comunicazione e benessere nei luoghi di lavoro//Laboratorio di Sintesi Finale//Corso di Laurea in Design della Comunicazione//Scuola del Design, Politecnico di Milano//A.A. 2025–2026</p>
            <p style={{ marginBottom: "0px", fontSize: isDesktop ? "28px" : "var(--type-micro)" }}>Progetto di Lia Feng, Meng Xin Wang, Ermida Teresa Norì, Ece Gorpelioglu</p>
          </div>
        </div>
        </div>
      </div>
      </div>

      {openConsiglio !== null && (
        <>
          {/* Overlay scuro */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpenConsiglio(null)}
          />
          
          {/* Container di posizionamento */}
          <div
            className="fixed z-50"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90vw",
              maxWidth: "500px",
            }}
          >
            {/* Accordion animato */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div
                style={{
                  padding: "30px",
                  backgroundColor: "white",
                  border: "1px solid black",
                  maxHeight: "80vh",
                  overflowY: "auto",
                }}
              >
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setOpenConsiglio(null)}
                    className="text-black cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </div>
                <h4
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "var(--type-section-title)",
                    lineHeight: "1.05",
                    marginBottom: "12px",
                  }}
                >
                  {openConsiglio === 0 ? (
                    <>
                      Riconosci i tuoi limiti: impara il "Sì, ma..."
                    </>
                  ) : openConsiglio === 1 ? (
                    <>
                      Condividi il carico: dall'io al noi
                    </>
                  ) : openConsiglio === 2 ? (
                    <>
                      Celebra i piccoli successi: nutri{" "}
                      <br />
                      la motivazione
                    </>
                  ) : openConsiglio === 3 ? (
                    <>
                      Focalizzati sull'impatto, non sulla perfezione
                    </>
                  ) : openConsiglio === 4 ? (
                    <>
                      Comunica apertamente: la trasparenza paga
                    </>
                  ) : null}
                </h4>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "var(--type-section-body)",
                    lineHeight: "1.3",
                    fontWeight: 400,
                  }}
                >
                  {openConsiglio === 0 ? (
                    <>
                      La forza è sapere <strong>quando fermarsi</strong>. Impara a riconoscere in anticipo{" "}
                      <br />
                      i segnali di <strong>sovraccarico</strong>. Quando ricevi un nuovo compito, invece{" "}
                      <br />
                      di accettare passivamente, usa{" "}
                      <br />
                      la formula "Sì, lo gestirò ma ho bisogno di <strong>ridefinire la priorità</strong> di X o di delegare Y". Questo definisce <strong>confini chiari</strong> e protegge
                      <br />
                      il tuo benessere.
                    </>
                  ) : openConsiglio === 1 ? (
                    <>
                      Non devi essere l'unico eroe.{" "}
                      <br />
                      La <strong>responsabilità condivisa</strong>{" "}
                      <br />
                      è un pilastro del successo di team.{" "}
                      <br />
                      Se ti senti sommerso/a, <strong>non aspettare di essere in crisi</strong>. Avvicinati a un collega o al tuo responsabile e <strong>chiedi</strong>: "Potresti aiutarmi a sbloccare questa sezione? O a esaminare insieme{" "}
                      <br />
                      il piano d'azione?". <strong>Dividere</strong> riduce il rischio e aumenta la velocità.
                    </>
                  ) : openConsiglio === 4 ? (
                    <>
                      L'<strong>incertezza</strong> è la vera fonte{" "}
                      <br />
                      di stress. Se hai un problema,{" "}
                      <br />
                      se la scadenza è a rischio,{" "}
                      <br />
                      o se hai bisogno di risorse, <strong>comunica immediatamente</strong>{" "}
                      <br />
                      e con chiarezza. La responsabilità non è garantire la perfezione,{" "}
                      <br />
                      ma garantire la <strong>trasparenza</strong>{" "}
                      <br />
                      sul progresso. Il team può aiutarti solo se sa esattamente dove sei.
                    </>
                  ) : openConsiglio === 2 ? (
                    <>
                      Non aspettare il traguardo finale.{" "}
                      <br />
                      Il benessere fiorisce quando <strong>riconosciamo il progresso</strong>.{" "}
                      <br />
                      Hai chiuso una mail particolarmente complessa? Hai terminato la prima fase del progetto? <strong>Prenditi un momento</strong> (anche solo un minuto!) per riconoscere quel piccolo risultato. <strong>Celebrare i "mini-goal"</strong> mantiene alta l'energia{" "}
                      <br />
                      e la responsabilità positiva.
                    </>
                  ) : openConsiglio === 3 ? (
                    <>
                      La vera responsabilità è fornire{" "}
                      <br />
                      il <strong>massimo valore possibile</strong>{" "}
                      <strong>nei limiti</strong> di tempo e risorse disponibili. Chiediti: "Qual è l'obiettivo essenziale di questo lavoro?" Evita il perfezionismo paralizzante (che consuma tempo e benessere) e concentrati sulla qualità che genera il miglior impatto per l'azienda.
                    </>
                  ) : null}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
