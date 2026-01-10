function App() {
  return <div className="absolute h-[31.195px] left-[40px] top-[383.98px] w-[274.374px]" data-name="App" />;
}

function App1() {
  return (
    <div className="absolute h-[25.59px] left-[40px] not-italic text-black top-[564px] w-[274.374px]" data-name="App">
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[151px] leading-[25.6px] left-0 text-[16px] top-[13px] w-[322px]">
        <p className="mb-0 whitespace-pre-wrap">{`La causa principale? Il crollo dell’ingaggio tra i manager, sceso dal 30% al 27%. Ancora più marcato tra i manager under 35  e le donne manager. Gli individual contributor, invece, restano fermi a un preoccupante 18%.`}</p>
        <p className="mb-0">&nbsp;</p>
        <p>&nbsp;</p>
      </div>
      <p className="absolute font-['Inter:Extra_Light',sans-serif] font-extralight h-[55px] leading-[17px] left-0 text-[13px] top-[178px] w-[220px]">Gallup State of the Global Workplace – Report 2025</p>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white relative size-full" data-name="Container">
      <App />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[31.2px] left-[40px] not-italic text-[24px] text-black top-[459px] w-[326px]">Sono andati persi nel 2024 a causa della diminuzione dell’engagement globale</p>
      <div className="absolute font-['Inter:Black',sans-serif] font-black h-[170px] leading-[0] left-[calc(50%-152px)] not-italic text-[0px] text-black top-[214px] w-[305px]">
        <p className="mb-0">
          <span className="leading-[53px] text-[128px]">438</span>
          <span className="leading-[53px] text-[64px]"> </span>
          <span className="leading-[43px] text-[40px]">{`miliardi `}</span>
        </p>
        <p className="leading-[43px] text-[40px]">di dollari</p>
      </div>
      <App1 />
    </div>
  );
}