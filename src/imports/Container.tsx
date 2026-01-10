import svgPaths from "./svg-hxp6ocpt0k";

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

interface ContainerProps {
  onClose: () => void;
}

export default function Container({ onClose }: ContainerProps) {
  return (
    <div className="bg-white relative w-full min-h-screen flex flex-col" data-name="Container" style={{ paddingTop: "30px", paddingLeft: "40px", paddingRight: "40px", paddingBottom: "60px" }}>
      {/* Close button */}
      <div className="flex justify-end mb-8">
        <button
          onClick={onClose}
          className="text-black cursor-pointer"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Main number - centered */}
      <div className="flex flex-col items-center justify-center mb-12" style={{ marginTop: "80px" }}>
        <div className="text-center">
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "128px", lineHeight: "1", marginBottom: "0" }}>
            438
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: "40px", lineHeight: "1.1", marginTop: "10px" }}>
            miliardi di dollari
          </div>
        </div>
      </div>

      {/* Title */}
      <h2
        className="text-black mb-6"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "var(--type-h2)",
          lineHeight: "1.3",
          maxWidth: "326px",
        }}
      >
        Sono andati persi nel 2024 a causa della diminuzione dell'engagement globale
      </h2>

      {/* Description text */}
      <div className="mb-8">
        <p
          className="text-black mb-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "var(--type-body-sm)",
            lineHeight: "1.6",
            maxWidth: "322px",
          }}
        >
          La causa principale? Il crollo dell'ingaggio tra i manager, sceso dal 30% al 27%. Ancora più marcato tra i manager under 35 e le donne manager. Gli individual contributor, invece, restano fermi a un preoccupante 18%.
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