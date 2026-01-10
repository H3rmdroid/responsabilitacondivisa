import { motion, AnimatePresence } from "motion/react";

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  customContent?: React.ReactNode;
}

export function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
  customContent,
}: AccordionItemProps) {
  return (
    <li className="list-none -ml-5 type-exempt">
      <button
        onClick={onToggle}
        className="text-left w-full flex items-start gap-2 mb-2"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: "var(--type-section-body-sm)",
          lineHeight: "1.3",
        }}
      >
        <span>{title}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            {customContent ? (
              <div className="pb-4">
                {customContent}
              </div>
            ) : (
              <div
                className="pb-4 text-black"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--type-section-body-sm)",
                  lineHeight: "1.3",
                  paddingLeft: "0px",
                }}
              >
                {content}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Linea sottile nera */}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "black",
          opacity: 0.2,
          marginTop: "4px",
          marginBottom: "4px",
        }}
      />
    </li>
  );
}
