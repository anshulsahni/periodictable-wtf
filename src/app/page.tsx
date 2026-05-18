"use client";

import { useEffect, useState } from "react";

import ElementBox from "./components/ElementBox";
import ControlPanel from "./components/ControlPanel";

// Dynamic Phase and Color Helper
const getElementPhaseAndColor = (element: any, temp: number) => {
  const melt = element.melt;
  const boil = element.boil;

  // Solid state if below melting point
  if (melt !== null && melt !== undefined && temp < melt) {
    return { phase: "solid", color: "#ff4b93" };
  }
  
  // Liquid state if above melting point but below boiling point
  if (melt !== null && melt !== undefined && (boil === null || boil === undefined || temp < boil)) {
    if (boil === null || boil === undefined) {
      return element.number > 100 
        ? { phase: "unknown", color: "repeating-linear-gradient(45deg, #d1d5db, #d1d5db 4px, #e5e7eb 4px, #e5e7eb 8px)" }
        : { phase: "liquid", color: "#31b7ea" };
    }
    return { phase: "liquid", color: "#31b7ea" };
  }

  // Gas state if above boiling point
  if (boil !== null && boil !== undefined && temp >= boil) {
    return { phase: "gas", color: "#ffe600" };
  }

  // Fallback to unknown
  return { 
    phase: "unknown", 
    color: "repeating-linear-gradient(45deg, #d1d5db, #d1d5db 4px, #e5e7eb 4px, #e5e7eb 8px)" 
  };
};

export default function Home() {
  const [elements, setElements] = useState<any[]>([]);
  const [activeBlocks, setActiveBlocks] = useState<string[]>(["all"]);
  const [temperature, setTemperature] = useState(298);

  useEffect(() => {
    fetch("/elements.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setElements(data);
      });
  }, []);

  // Compute Phase Counts
  let solidCount = 0;
  let liquidCount = 0;
  let gasCount = 0;
  let unknownCount = 0;

  elements.forEach((element) => {
    const { phase } = getElementPhaseAndColor(element, temperature);
    if (phase === "solid") solidCount++;
    else if (phase === "liquid") liquidCount++;
    else if (phase === "gas") gasCount++;
    else unknownCount++;
  });

  return (
    <main 
      className="min-h-screen bg-[#f6f1e8] p-5"
      style={{
        backgroundImage: "radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px"
      }}
    >

      {/* TOP HEADER */}
      <div className="mb-5 flex flex-col items-start gap-1">
        <div className="flex items-center gap-3">
          <h1 className="flex items-center font-bold uppercase tracking-tight text-black text-5xl sm:text-6xl">
            <span>
              PERIODIC<span className="text-[#ff4b93]">.</span>TABLE
            </span>
            <span className="ml-2 inline-block -rotate-2 bg-black px-2 py-1 text-3xl font-black text-white tracking-tight shadow-lg" style={{letterSpacing: '-0.05em'}}>WTF</span>
          </h1>
        </div>
        <div className="mt-1 text-xs font-medium uppercase tracking-widest text-black/60">
          A TACTILE PERIODIC TABLE &middot; 118 ELEMENTS &middot; PHASE BY TEMPERATURE
        </div>
      </div>

      {/* CONTROL PANEL */}
      <ControlPanel
        temperature={temperature}
        setTemperature={setTemperature}
        activeBlocks={activeBlocks}
        setActiveBlocks={setActiveBlocks}
      />

      {/* PERIODIC TABLE */}
      <div 
        className="mt-5 w-full overflow-x-auto border-2 border-black bg-white p-3 shadow-[6px_6px_0px_black]"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      >

        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
            gap: "3px",
          }}
        >
          {elements.map((element) => {
            const faded =
              !activeBlocks.includes("all") &&
              !activeBlocks.includes(element.block);

            const { phase, color } = getElementPhaseAndColor(element, temperature);

            const heatGlow =
              temperature < 1000
                ? "0 0 8px rgba(59,130,246,0.4)"
                : temperature < 2500
                ? "0 0 12px rgba(56,189,248,0.5)"
                : temperature < 4000
                ? "0 0 18px rgba(255,75,147,0.5)"
                : temperature < 5500
                ? "0 0 24px rgba(255,123,0,0.7)"
                : "0 0 32px rgba(255,230,0,0.9)";

            return (
              <div
                key={element.number}
                style={{
                  gridColumn: element.xpos,
                  gridRow: element.ypos,
                  boxShadow: heatGlow,
                  transition: "all 0.4s ease",
                }}
              >
                <ElementBox
                  symbol={element.symbol}
                  number={element.number}
                  electronegativity={element.electronegativity_pauling}
                  block={element.block}
                  topRight={Math.round(element.atomic_mass)}
                  color={color}
                  faded={faded}
                />
              </div>
            );
          })}
        </div>

        {/* LEGEND ROW */}
        <div className="mt-4 pt-3 border-t border-black/10 flex justify-between items-center text-[10px] font-mono text-gray-400">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 border border-black bg-[#ff4b93] inline-block"></span>
              <span className="text-[9px] uppercase tracking-wider">SOLID</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 border border-black bg-[#31b7ea] inline-block"></span>
              <span className="text-[9px] uppercase tracking-wider">LIQUID</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 border border-black bg-[#ffe600] inline-block"></span>
              <span className="text-[9px] uppercase tracking-wider">GAS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span 
                className="w-2.5 h-2.5 border border-black inline-block"
                style={{
                  background: "repeating-linear-gradient(45deg, #d1d5db, #d1d5db 2px, #e5e7eb 2px, #e5e7eb 4px)"
                }}
              ></span>
              <span className="text-[9px] uppercase tracking-wider">UNKNOWN</span>
            </div>
          </div>

          <div className="flex gap-4 text-[9px] tracking-wider">
            <div className="flex items-center gap-1">
              <span>⬉</span>
              <span className="lowercase text-gray-500/80">atomic #</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⬈</span>
              <span className="lowercase text-gray-500/80">atomic mass</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⬋</span>
              <span className="lowercase text-gray-500/80">electronegativity</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⬊</span>
              <span className="lowercase text-gray-500/80">block</span>
            </div>
          </div>
        </div>

      </div>

      {/* DYNAMIC SUMMARY BAR */}
      <div className="mt-4 flex items-center gap-4 text-xs font-mono text-black">
        <span className="uppercase tracking-widest text-[11px] font-bold">
          AT {temperature} K ({Math.round(temperature - 273.15).toLocaleString()}&deg;C):
        </span>
        
        <div className="flex gap-2">
          <div className="border border-black bg-white px-2.5 py-1 text-[10px] font-bold uppercase flex items-center gap-2 shadow-[2px_2px_0px_black]">
            <span className="w-2.5 h-2.5 border border-black bg-[#ff4b93] inline-block"></span>
            <span>{solidCount} SOLID</span>
          </div>
          <div className="border border-black bg-white px-2.5 py-1 text-[10px] font-bold uppercase flex items-center gap-2 shadow-[2px_2px_0px_black]">
            <span className="w-2.5 h-2.5 border border-black bg-[#31b7ea] inline-block"></span>
            <span>{liquidCount} LIQUID</span>
          </div>
          <div className="border border-black bg-white px-2.5 py-1 text-[10px] font-bold uppercase flex items-center gap-2 shadow-[2px_2px_0px_black]">
            <span className="w-2.5 h-2.5 border border-black bg-[#ffe600] inline-block"></span>
            <span>{gasCount} GAS</span>
          </div>
          <div className="border border-black bg-white px-2.5 py-1 text-[10px] font-bold uppercase flex items-center gap-2 shadow-[2px_2px_0px_black]">
            <span 
              className="w-2.5 h-2.5 border border-black inline-block"
              style={{
                background: "repeating-linear-gradient(45deg, #d1d5db, #d1d5db 2px, #e5e7eb 2px, #e5e7eb 4px)"
              }}
            ></span>
            <span>{unknownCount} ?</span>
          </div>
        </div>
      </div>

    </main>
  );
}