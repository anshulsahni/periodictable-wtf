import { ElementData } from "../types/element";

export interface PhaseInfo {
  phase: "solid" | "liquid" | "gas" | "unknown";
  color: string;
}

export const getElementPhaseAndColor = (element: ElementData, temp: number): PhaseInfo => {
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

export const getTempState = (temp: number): string => {
  if (temp <= 0) return "ABS. ZERO";
  if (temp <= 77) return "CRYOGENIC";
  if (temp < 273) return "FROZEN";
  if (temp < 373) return "TEMPERATE";
  if (temp <= 373) return "BOILING";
  if (temp <= 1000) return "SCORCHING";
  if (temp <= 3000) return "MOLTEN";
  return "PLASMA";
};
export const getBlockColor = (block: string): string => {
  switch (block) {
    case "s":
      return "#ff4b93";
    case "p":
      return "#ffe600";
    case "d":
      return "#31b7ea";
    case "f":
      return "#a855f7";
    default:
      return "#d1d5db";
  }
};
