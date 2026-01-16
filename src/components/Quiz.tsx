import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useIsDesktop } from "../hooks/useIsDesktop";


interface Question {
  question: string;
  answers: {
    label: string;
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    question: "Quando un compito complesso subisce un ritardo, tendi a:",
    answers: [
      {
        label: "A",
        text: "Lavorare fino a tardi in solitudine per recuperare il tempo perduto.",
        score: 1,
      },
      {
        label: "B",
        text: "Analizzare l'imprevisto e poi comunicare subito il nuovo stato al team/responsabile.",
        score: 2,
      },
      {
        label: "C",
        text: "Chiedere subito aiuto per ripartire il carico e ridefinire la scadenza.",
        score: 3,
      },
    ],
  },
  {
    question:
      'Ti senti a tuo agio a dire "No" a un nuovo incarico se sei già saturo/a di lavoro?',
    answers: [
      {
        label: "A",
        text: "Assolutamente no, temo di deludere le aspettative o perdere opportunità.",
        score: 1,
      },
      {
        label: "B",
        text: "Dipende dalla persona che me lo chiede e dall'urgenza percepita.",
        score: 2,
      },
      {
        label: "C",
        text: "Sì, con professionalità, spiegando cosa posso fare in un secondo momento.",
        score: 3,
      },
    ],
  },
  {
    question: "Dopo aver commesso un errore, come reagisci?",
    answers: [
      {
        label: "A",
        text: "Ti auto-critichi aspramente e cerchi di nasconderlo finché non puoi risolverlo da solo/a.",
        score: 1,
      },
      {
        label: "B",
        text: "Lo ammetti e lo correggi, ma passi giorni a ripensarci con ansia.",
        score: 2,
      },
      {
        label: "C",
        text: "Lo porti in discussione col team per capire la radice del problema e prevenirlo in futuro.",
        score: 3,
      },
    ],
  },
  {
    question:
      "Quando il tuo collega ha bisogno di aiuto per un suo compito, la tua reazione è:",
    answers: [
      {
        label: "A",
        text: "Ti offri subito, anche se questo significa sacrificare il tempo per le tue attività.",
        score: 1,
      },
      {
        label: "B",
        text: "Offri supporto, ma solo se i tuoi compiti urgenti sono già stati completati.",
        score: 2,
      },
      {
        label: "C",
        text: "Ascolti la sua difficoltà e lo aiuti a trovare una risorsa o una soluzione (che non sempre sei tu).",
        score: 3,
      },
    ],
  },
  {
    question: "La tua pausa pranzo è solitamente:",
    answers: [
      {
        label: "A",
        text: "Consumata di fretta davanti al computer per non interrompere il flusso di lavoro.",
        score: 1,
      },
      {
        label: "B",
        text: "Regolare, ma controlli spesso le email e le notifiche.",
        score: 2,
      },
      {
        label: "C",
        text: "Un momento di stacco completo (lontano dalla postazione) per ricaricare le energie.",
        score: 3,
      },
    ],
  },
  {
    question:
      "Sei sicuro/a di conoscere i limiti precisi delle tue responsabilità e quelle dei tuoi colleghi?",
    answers: [
      {
        label: "A",
        text: "Non del tutto, ci sono molte aree grigie che causano confusione.",
        score: 1,
      },
      {
        label: "B",
        text: "Abbastanza, ma i confini si sfumano spesso sotto pressione.",
        score: 2,
      },
      {
        label: "C",
        text: "Sì, i ruoli e i compiti sono definiti e documentati chiaramente.",
        score: 3,
      },
    ],
  },
  {
    question: "Se ricevi feedback negativo sul tuo lavoro, tendi a:",
    answers: [
      {
        label: "A",
        text: "Prenderlo come un attacco personale e sentirti subito demotivato/a.",
        score: 1,
      },
      {
        label: "B",
        text: "Ascoltare, ma concentrarti sulla giustificazione del tuo operato.",
        score: 2,
      },
      {
        label: "C",
        text: "Vederlo come un dato utile per calibrare meglio i tuoi sforzi futuri e migliorare.",
        score: 3,
      },
    ],
  },
];

interface Profile {
  title: string;
  range: string;
  description: string;
  steps: string[];
}

const profiles: Profile[] = [
  {
    title: "L'Eroe Solitario (Alto rischio di stress)",
    range: "7-13 punti",
    description:
      "Tendi a prendere tutto sulle tue spalle, trasformando la responsabilità in isolamento e burnout potenziale. Credi che l'unico modo per far bene sia fare da soli. Hai bisogno di imparare a delegare per prosperare, non solo sopravvivere.",
    steps: [
      "Identifica 3 task semplici che qualcun altro può fare. Affidali e resisti all'impulso di ricontrollare ossessivamente. Questo è il primo passo per la fiducia condivisa.",
      'Dichiara il "Tutto Esaurito": Quando ti assegnano un nuovo compito, di\' (anche se non è vero) di aver bisogno di 24 ore per valutare la fattibilità e le risorse. Non rispondere subito "Sì".',
    ],
  },
  {
    title: "L'Equilibrista Consapevole (Ottimo punto di partenza)",
    range: "14-17 punti",
    description:
      "Hai capito il valore del benessere, ma a volte la linea di confine tra il tuo carico e quello del team è ancora sfocata. Sai chiedere aiuto, ma spesso solo quando la pressione è alta. Sei in una posizione ideale per affinare le tue strategie e diventare un modello di gestione della responsabilità sana.",
    steps: [
      "Prima di iniziare un progetto, scrivi 3 punti chiave su cosa non è tua responsabilità. Condividili col team. Ridurre le aree grigie riduce l'ansia.",
      'Inserisci una mezz\'ora "libera" nel tuo calendario ogni giorno (senza task) per attività impreviste o pausa.',
    ],
  },
  {
    title: "Il Leader di Successo (Stile sano)",
    range: "18-21 punti",
    description:
      "Bravo/a! Hai un approccio proattivo, trasparente e resiliente. La responsabilità è per te un modo per eccellere e far crescere gli altri. Non temi l'errore, lo usi come dato di apprendimento. Sei il tipo di collega che trasforma i problemi in soluzioni collettive.",
    steps: [
      "Offriti di guidare un collega meno esperto sulle tue tecniche di time management o delega. Condividere il tuo successo rafforza il sistema.",
      "Proponi una sessione di feedback collettiva al tuo team (sui processi e le modalità di lavoro) per migliorare ulteriormente l'ambiente di lavoro.",
    ],
  },
];

export function Quiz() {
  const isDesktop = useIsDesktop();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  // Scroll animation for quiz container
  const { scrollYProgress } = useScroll({
    target: quizRef,
    offset: ["start end", "end end"],
  });

  const quizOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const quizY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const resultsY = useTransform(scrollYProgress, [0, 0.3], [0, -30]); // 30px più in alto rispetto alle domande
  const resultsXOffset = isDesktop ? 0 : 40;
  const resultsYOffset = isDesktop ? 0 : 20;
  const resultsYWithOffset = useTransform(resultsY, (value) => value + resultsYOffset);

  // Debug
  useEffect(() => {
    console.log('🧪 Quiz Component Mounted - Delay: 1.5s');
  }, []);

  const handleAnswerChange = (questionIndex: number, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: score,
    }));
    
    // Passa automaticamente alla domanda successiva dopo una breve pausa
    setIsTransitioning(true);
    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setCurrentQuestion(questionIndex + 1);
      } else {
        // Mostra i risultati
        setShowResults(true);
      }
      setIsTransitioning(false);
    }, 400);
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const getProfile = (score: number): Profile => {
    if (score >= 7 && score <= 13) return profiles[0];
    if (score >= 14 && score <= 17) return profiles[1];
    return profiles[2];
  };

  if (showResults) {
    const totalScore = calculateScore();
    const profile = getProfile(totalScore);
    const resultWidth = isDesktop ? 460 : 205;
    const resultHeight = isDesktop ? 520 : 270;

    return (
        <motion.div
          ref={quizRef}
          className="p-12 type-exempt"
          style={{
            backgroundColor: "white",
            border: "none",
            width: `${resultWidth}px`,
            height: `${resultHeight}px`,
            margin: "0 auto",
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            opacity: quizOpacity,
            x: resultsXOffset,
            y: resultsYWithOffset,
          }}
        >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="space-y-6">
            <div>
              <p
                className="text-black"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--type-quiz-meta)",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                Il tuo profilo
              </p>
              <p
                className="text-black"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--type-quiz-title)",
                  fontWeight: 700,
                  lineHeight: "1.05",
                  marginBottom: "12px",
                }}
              >
                {profile.title.split(" (")[0]}
                <br />
                {profile.title.includes("(Alto rischio di stress)") && (
                  <>
                    (Alto rischio
                    <br />
                    di stress)
                  </>
                )}
                {profile.title.includes("(Ottimo punto di partenza)") && (
                  <>
                    (Ottimo punto
                    <br />
                    di partenza)
                  </>
                )}
                {profile.title.includes("(Stile sano)") && "(Stile sano)"}
              </p>
              <p
                className="text-black"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--type-quiz-body)",
                  lineHeight: "1.3",
                  fontWeight: 400,
                }}
              >
                {profile.description}
              </p>
            </div>

            <div style={{ marginTop: "15px" }}>
              <p
                className="text-black"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--type-quiz-subtitle)",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                I tuoi prossimi due passi
              </p>
              <div className="space-y-4">
                {profile.steps.map((step, index) => (
                  <p
                    key={index}
                    className="text-black"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "var(--type-quiz-body)",
                      lineHeight: "1.3",
                      fontWeight: 400,
                    }}
                  >
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];

  return (
      <motion.div
        ref={quizRef}
        className="p-12 type-exempt"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
        style={{
          backgroundColor: "transparent",
          border: "none",
          width: isDesktop ? "560px" : "200px",
          height: isDesktop ? "720px" : "400px",
          margin: "0 auto",
          position: "relative",
        }}
      >
      <div className="flex flex-col" style={{ backgroundColor: "transparent", height: "100%" }}>
        {/* Question */}
        <div style={{ backgroundColor: "transparent", paddingBottom: "60px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ backgroundColor: "transparent" }}
            >
              <p
                className="text-black"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--type-quiz-title)",
                  lineHeight: "1.0",
                  fontWeight: 600,
                  marginBottom: "20px",
                  transform: "translateX(24px)",
                }}
              >
                {question.question}
              </p>
              <div className="space-y-[30px] pl-4">
                {question.answers.map((answer, answerIndex) => (
                  <motion.label
                    key={answerIndex}
                    className="flex items-start gap-3 cursor-pointer group"
                    style={{
                      paddingBottom: "20px",
                    }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: answerIndex * 0.1,
                      ease: "easeOut" 
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={answer.label}
                      checked={answers[currentQuestion] === answer.score}
                      onChange={() =>
                        handleAnswerChange(currentQuestion, answer.score)
                      }
                      className="mt-1 cursor-pointer"
                      style={{
                        width: "16px",
                        height: "16px",
                        accentColor: "black",
                      }}
                    />
                    <span
                      className="text-black group-hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "var(--type-quiz-body)",
                        lineHeight: "1.3",
                        fontWeight: 400,
                      }}
                    >
                      {answer.text}
                    </span>
                  </motion.label>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar - positioned absolutely at bottom */}
        <div style={{ 
          position: "absolute", 
          bottom: isDesktop ? "100px" : "30px", 
          left: "48px",
          right: "48px",
        }}>
          <div
            style={{
              width: "calc(100% - 10px)",
              height: "2px",
              backgroundColor: "rgba(0, 0, 0, 0.15)",
              borderRadius: "1px",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                backgroundColor: "black",
                borderRadius: "1px",
              }}
              initial={{ width: "0%" }}
              animate={{ 
                width: `${((currentQuestion + 1) / questions.length) * 100}%` 
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "var(--type-quiz-meta)",
              fontWeight: 400,
              color: "rgba(0, 0, 0, 0.5)",
              marginTop: "6px",
              textAlign: "center",
            }}
          >
            {currentQuestion + 1} / {questions.length}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
