"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ElementData } from "../types/element";
import { getElementPhaseAndColor, getTempState, getBlockColor, getDirectWikipediaImageUrl } from "../lib/elementUtils";
import mixpanel from "../lib/mixpanel";

interface Props {
  element: ElementData;
}

export default function ElementDetailClient({ element }: Props) {
  const [temperature, setTemperature] = useState(298);

  const { phase, color } = getElementPhaseAndColor(element, temperature);
  const isDarkText = color === "#ffe600" || color.startsWith("repeating-linear-gradient");
  const textColorClass = isDarkText ? "text-black" : "text-white";

  const heatGlow =
    temperature < 1000
      ? "0 0 12px rgba(59,130,246,0.3)"
      : temperature < 2500
      ? "0 0 20px rgba(56,189,248,0.5)"
      : temperature < 4000
      ? "0 0 28px rgba(255,75,147,0.5)"
      : temperature < 5500
      ? "0 0 36px rgba(255,123,0,0.7)"
      : "0 0 44px rgba(255,230,0,0.9)";

  const handleTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTemperature(value);
    mixpanel.track("Detail Page Temperature Changed", {
      element: element.name,
      value,
    });
  };

  const handlePresetClick = (value: number) => {
    setTemperature(value);
    mixpanel.track("Detail Page Temperature Preset Clicked", {
      element: element.name,
      value,
    });
  };

  return (
    <main
      className="min-h-screen bg-[#f6f1e8] p-4 sm:p-8 font-sans text-black"
      style={{
        backgroundImage: "radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* HEADER SECTION */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-mono text-sm font-bold uppercase transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          <span>←</span> BACK TO SYSTEM GRID
        </Link>

        {/* Blueprint Coords */}
        <div className="border-2 border-black bg-black text-white font-mono px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-3">
          <span className="text-[#31b7ea]">COORD //</span>
          <span>NO. {element.number}</span>
          <span className="text-gray-500">|</span>
          <span>PERIOD {element.period}</span>
          <span className="text-gray-500">|</span>
          <span>GROUP {element.group}</span>
        </div>
      </div>

      {/* HERO CONTAINER */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-8">
        
        {/* HERO COLUMN 1: GIANT TACTILE BOX & SLIDER */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div
            className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_black] relative flex flex-col items-center justify-center min-h-[320px] transition-all duration-300 ease-out"
            style={{
              backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            {/* Dynamic GLOW behind the box */}
            <div
              className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-all duration-300"
              style={{
                background: typeof color === "string" && !color.includes("gradient") ? color : "#fff",
                filter: "blur(40px)",
              }}
            />

            {/* Giant Element Box */}
            <div
              className="relative z-10 flex flex-col justify-between w-64 h-64 border-2 border-black p-4 transition-all duration-300 shadow-[8px_8px_0px_black] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_black]"
              style={{
                background: color,
                boxShadow: heatGlow,
              }}
            >
              {/* Top Row */}
              <div className={`flex justify-between text-sm font-mono font-black ${textColorClass} leading-none`}>
                <span>{element.number}</span>
                <span>{element.atomic_mass.toFixed(4)}</span>
              </div>

              {/* Central Symbol */}
              <div className="flex flex-1 flex-col items-center justify-center">
                <span className={`text-8xl font-black tracking-tighter ${textColorClass} leading-none drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]`}>
                  {element.symbol}
                </span>
                <span className={`text-xs font-mono font-bold uppercase tracking-widest mt-1.5 ${textColorClass} opacity-80`}>
                  {element.name}
                </span>
              </div>

              {/* Bottom Row */}
              <div className={`flex justify-between text-sm font-mono font-black ${textColorClass} leading-none`}>
                <span>{element.electronegativity_pauling ? `χ = ${element.electronegativity_pauling.toFixed(2)}` : "χ = —"}</span>
                <span className="uppercase">{element.block}-block</span>
              </div>
            </div>
          </div>

          {/* TEMPERATURE REACTOR CONTROL */}
          <div
            className="border-2 border-black bg-white p-5 shadow-[6px_6px_0px_black] relative"
            style={{
              backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            <div className="absolute -top-3.5 left-4 bg-black text-white px-2.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest border border-black">
              Temperature Reactor Simulator
            </div>

            <div className="flex justify-between items-baseline mb-4 mt-2">
              <div className="flex items-baseline">
                <span className="text-4xl font-mono font-black text-black leading-none">
                  {temperature}
                </span>
                <span className="ml-1 text-lg font-bold text-gray-700 leading-none">K</span>
                <span className="ml-3 text-xs font-mono text-gray-400">
                  = {Math.round(temperature - 273.15).toLocaleString()}&deg;C
                </span>
              </div>

              <div
                className="px-2.5 py-1 text-[10px] font-mono font-black uppercase border border-black leading-none flex items-center gap-1.5 shadow-[2px_2px_0px_black]"
                style={{
                  background: phase === "solid" ? "#ff4b93" : phase === "liquid" ? "#31b7ea" : phase === "gas" ? "#ffe600" : "#d1d5db",
                  color: phase === "gas" || phase === "unknown" ? "black" : "white",
                }}
              >
                {phase === "solid" && <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-ping"></span>}
                {phase}
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="6000"
              value={temperature}
              onChange={handleTempChange}
              className="h-3 w-full cursor-pointer appearance-none border-2 border-black bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:bg-white"
              style={{
                background:
                  "linear-gradient(to right, #ff4b93 0%, #ff4b93 33%, #31b7ea 33%, #31b7ea 66%, #f5df1b 66%, #f5df1b 100%)",
              }}
            />

            <div className="mt-2 flex justify-between text-[9px] font-mono text-gray-400 font-bold">
              <span>0K</span>
              <span>1500K</span>
              <span>3000K</span>
              <span>4500K</span>
              <span>6000K</span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-black/10">
              {[
                { label: "ABS.0 0K", value: 0 },
                { label: "LIQ.N₂ 77K", value: 77 },
                { label: "ROOM 298K", value: 298 },
                { label: "BOIL.H₂O 373K", value: 373 },
                { label: "LAVA 1500K", value: 1500 },
                { label: "SUN 5778K", value: 5778 },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handlePresetClick(item.value)}
                  className={`border border-black px-2 py-1 text-[9px] font-mono font-bold uppercase transition-all duration-100 hover:bg-black hover:text-white ${
                    temperature === item.value
                      ? "bg-black text-white shadow-none"
                      : "bg-[#f2ede3] text-black shadow-[2px_2px_0px_black]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HERO COLUMN 2: IDENTITY PROFILE & DESCRIPTION */}
        <div className="md:col-span-7 flex flex-col justify-between border-2 border-black bg-white p-6 shadow-[6px_6px_0px_black]">
          <div>
            {/* Element Category Tag & Block */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-black text-white text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 border border-black">
                {element.category}
              </span>
              <span
                className="text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 border border-black"
                style={{
                  backgroundColor: getBlockColor(element.block),
                  color: element.block === "p" || element.block === "s" ? "black" : "white",
                }}
              >
                {element.block}-block
              </span>
            </div>

            {/* Large Name */}
            <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tight text-black border-b-2 border-black pb-3 mb-4 flex justify-between items-baseline">
              <span>{element.name}</span>
              <span className="text-xl font-mono text-gray-400 lowercase font-medium">/ {element.symbol}</span>
            </h1>

            {/* Metadata Tags Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="border border-black/10 bg-[#fbf9f4] p-2.5 font-mono">
                <div className="text-[9px] text-gray-400 uppercase font-black">Appearance</div>
                <div className="text-xs font-bold text-black capitalize truncate">{element.appearance ?? "Unknown"}</div>
              </div>
              <div className="border border-black/10 bg-[#fbf9f4] p-2.5 font-mono">
                <div className="text-[9px] text-gray-400 uppercase font-black">Density</div>
                <div className="text-xs font-bold text-black truncate">{element.density ? `${element.density} g/cm³` : "Unknown"}</div>
              </div>
              <div className="border border-black/10 bg-[#fbf9f4] p-2.5 font-mono">
                <div className="text-[9px] text-gray-400 uppercase font-black">Discovered By</div>
                <div className="text-xs font-bold text-black truncate">{element.discovered_by ?? "Ancient"}</div>
              </div>
              <div className="border border-black/10 bg-[#fbf9f4] p-2.5 font-mono">
                <div className="text-[9px] text-gray-400 uppercase font-black">Named By</div>
                <div className="text-xs font-bold text-black truncate">{element.named_by ?? "N/A"}</div>
              </div>
            </div>

            {/* Wikipedia Summary Section */}
            <div className="border-2 border-black bg-[#fcfbfa] p-4 font-mono relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-black/10 px-2 py-0.5 text-[8px] font-bold uppercase text-gray-600 border-l border-b border-black/20">
                SYSTEM DOCUMENTATION
              </div>
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-2">About the Element:</h3>
              <p className="text-xs sm:text-sm text-black leading-relaxed font-medium">
                {element.summary}
              </p>
              
              <div className="mt-4 pt-3 border-t border-black/10 flex justify-between items-center text-[9px] text-gray-400">
                <span>wikipedia database archive</span>
                <a
                  href={element.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-black hover:text-red-500 uppercase tracking-widest"
                >
                  Inspect Source ↗
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-[9px] text-gray-400 font-mono pt-4 border-t border-black/10">
            <span>atomic sequence index: #{element.number.toString().padStart(3, "0")}</span>
            <span className="uppercase font-bold tracking-widest text-black/40">system initialized // wtf v0.1</span>
          </div>
        </div>
      </div>

      {/* DETAILED SPECIFICATIONS GRID */}
      <h2 className="max-w-6xl mx-auto text-xl font-mono font-black uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="w-3.5 h-3.5 bg-black inline-block"></span>
        Deep Physical & Chemical Specifications
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 font-mono">
        
        {/* CARD 1: ATOMIC & COORD METRICS */}
        <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_black]">
          <div className="text-xs font-black uppercase tracking-widest text-[#ff4b93] border-b border-black/10 pb-1.5 mb-3">
            01 / ATOMIC PROFILE
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Atomic Number:</span>
              <span className="font-bold">{element.number}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Atomic Weight:</span>
              <span className="font-bold">{element.atomic_mass.toFixed(6)} u</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Period Coordinate:</span>
              <span className="font-bold">Period {element.period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Group Coordinate:</span>
              <span className="font-bold">Group {element.group}</span>
            </div>
          </div>
        </div>

        {/* CARD 2: TEMPERATURE STATES */}
        <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_black]">
          <div className="text-xs font-black uppercase tracking-widest text-[#31b7ea] border-b border-black/10 pb-1.5 mb-3">
            02 / THERMODYNAMICS
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Melting Point:</span>
              <span className="font-bold">
                {element.melt !== null ? `${element.melt} K (${Math.round(element.melt - 273.15)}°C)` : "Unknown / N/A"}
              </span>
            </div>
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Boiling Point:</span>
              <span className="font-bold">
                {element.boil !== null ? `${element.boil} K (${Math.round(element.boil - 273.15)}°C)` : "Unknown / N/A"}
              </span>
            </div>
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Molar Heat Capacity:</span>
              <span className="font-bold">{element.molar_heat ? `${element.molar_heat} J/(mol·K)` : "Unknown"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Phase (at 298K):</span>
              <span className="font-bold capitalize">{element.phase}</span>
            </div>
          </div>
        </div>

        {/* CARD 3: CHEMICAL AFFINITIES */}
        <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_black]">
          <div className="text-xs font-black uppercase tracking-widest text-[#ffe600] border-b border-black/10 pb-1.5 mb-3 text-shadow-[1px_1px_0px_rgba(0,0,0,0.15)]">
            03 / ELECTROMAGNETICS
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Electronegativity:</span>
              <span className="font-bold">{element.electronegativity_pauling ? `${element.electronegativity_pauling} (Pauling)` : "Unknown"}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Electron Affinity:</span>
              <span className="font-bold">{element.electron_affinity ? `${element.electron_affinity} kJ/mol` : "Unknown"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">1st Ionization Energy:</span>
              <span className="font-bold">
                {element.ionization_energies && element.ionization_energies.length > 0
                  ? `${element.ionization_energies[0]} kJ/mol`
                  : "Unknown"}
              </span>
            </div>
          </div>
        </div>

        {/* CARD 4: ELECTRONIC STRUCTURE */}
        <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_black]">
          <div className="text-xs font-black uppercase tracking-widest text-[#a855f7] border-b border-black/10 pb-1.5 mb-3">
            04 / QUANTUM ORBITALS
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Orbital Block:</span>
              <span className="font-bold uppercase">{element.block}-block</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Electron Configuration:</span>
              <span className="font-bold truncate max-w-[180px]">{element.electron_configuration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Configuration Semantic:</span>
              <span className="font-bold truncate max-w-[180px]">{element.electron_configuration_semantic}</span>
            </div>
          </div>
        </div>

        {/* CARD 5: SHELL LAYOUT */}
        <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_black]">
          <div className="text-xs font-black uppercase tracking-widest text-emerald-500 border-b border-black/10 pb-1.5 mb-3">
            05 / ELECTRON SHELLS
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Shell Quantities:</span>
              <span className="font-bold">{element.shells.join(" - ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Valence Shells:</span>
              <span className="font-bold">{element.shells.length} Orbitals</span>
            </div>
          </div>
        </div>

        {/* CARD 6: INDUSTRIAL INDEX */}
        <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_black]">
          <div className="text-xs font-black uppercase tracking-widest text-orange-500 border-b border-black/10 pb-1.5 mb-3">
            06 / CHEMICAL TAXONOMY
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-dashed border-black/10 pb-1">
              <span className="text-gray-400">Series Category:</span>
              <span className="font-bold capitalize">{element.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">CPK Color Index:</span>
              <span className="font-bold flex items-center gap-1.5 uppercase">
                {element["cpk-hex"] ? (
                  <>
                    <span
                      className="w-3.5 h-3.5 border border-black inline-block"
                      style={{ backgroundColor: `#${element["cpk-hex"]}` }}
                    ></span>
                    #{element["cpk-hex"]}
                  </>
                ) : (
                  "N/A"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* VISUAL BLUEPRINT GALLERY */}
      {((element.image && element.image.url) || element.bohr_model_image || element.spectral_img) && (
        <>
          <h2 className="max-w-6xl mx-auto text-xl font-mono font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-black inline-block"></span>
            Visual & Atomic Archives
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 font-mono">
            {/* NATURAL PHOTO */}
            {element.image && element.image.url && (
              <div className="border-2 border-black bg-white p-4 shadow-[6px_6px_0px_black] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-2">IMAGE DEPOSITARY // PHOTO</div>
                  <div className="border-2 border-black overflow-hidden bg-gray-100 flex items-center justify-center aspect-video relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={element.image.url}
                      alt={element.image.title ?? element.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="mt-3 bg-gray-50 border border-black/10 p-2.5">
                  <div className="text-[9px] font-bold text-black leading-tight mb-1">{element.image.title ?? `Sample of ${element.name}`}</div>
                  <div className="text-[8px] text-gray-400 leading-normal line-clamp-2 truncate hover:line-clamp-none whitespace-normal select-all">
                    Credit: {element.image.attribution}
                  </div>
                </div>
              </div>
            )}

            {/* BOHR MODEL */}
            {element.bohr_model_image && (
              <div className="border-2 border-black bg-white p-4 shadow-[6px_6px_0px_black] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-2">QUANTUM ARCHIVES // BOHR MODEL</div>
                  <div className="border-2 border-black overflow-hidden bg-[#faf8f4] flex items-center justify-center aspect-video p-2 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={element.bohr_model_image}
                      alt={`Bohr model of ${element.name}`}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                    />
                  </div>
                </div>
                <div className="mt-3 bg-gray-50 border border-black/10 p-2.5">
                  <div className="text-[9px] font-bold text-black leading-tight">Orbital Electron Configuration</div>
                  <div className="text-[8px] text-gray-400 mt-1 leading-normal">
                    Visualization showing the distribution of electrons in concentric Bohr energy levels.
                  </div>
                </div>
              </div>
            )}

            {/* SPECTRAL IMAGE */}
            {getDirectWikipediaImageUrl(element.spectral_img) && (
              <div className="border-2 border-black bg-white p-4 shadow-[6px_6px_0px_black] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-2">SPECTRUM ANALYSIS // EMISSION LINE</div>
                  <div className="border-2 border-black overflow-hidden bg-black flex items-center justify-center aspect-video relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getDirectWikipediaImageUrl(element.spectral_img) || ""}
                      alt={`Spectral signature of ${element.name}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
                <div className="mt-3 bg-gray-50 border border-black/10 p-2.5">
                  <div className="text-[9px] font-bold text-black leading-tight">Emission Spectrum Signature</div>
                  <div className="text-[8px] text-gray-400 mt-1 leading-normal">
                    Spectroscopy lines matching element atomic wavelengths when excited by high electric potential.
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
