"use client";

import { useState } from "react";
import ElementCard from "./components/ElementCard";
import ElementModal from "./components/ElementModal";
import Particles from "./components/Particles";
import { elements } from "./Data/elements";

export default function Home() {
  const [selectedElement, setSelectedElement] = useState(null);
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-12">

      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#00ffff22,_transparent_40%),radial-gradient(circle_at_bottom_right,_#ff00ff22,_transparent_40%)]" />

      {/* Floating particles */}
      <Particles />

      {/* Glow blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-cyan-500 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-pink-500 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading Section */}
        <div className="mb-14 text-center">


          <h1 className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500 bg-clip-text text-6xl font-black tracking-tight text-transparent">
            PERIODIC TABLE WTF
          </h1>

          <p className="mt-4 text-lg text-zinc-300">
            Stuff your chemistry teacher never showed like this.
          </p>

        
        </div>

        {/* Table Container */}
        <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl">

          {/* Elements Grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {elements.map((element) => (
              <div
                onClick={() => setSelectedElement(element)}
                className="cursor-pointer"
              >
                <ElementCard
                  key={element.atomicNumber}
                  atomicNumber={element.atomicNumber}
                  symbol={element.symbol}
                  name={element.name}
                  atomicWeight={element.atomicWeight}
                  category={element.category}
                />
              </div>
            ))}
          </div>
          {selectedElement && (
  <ElementModal
    element={selectedElement}
    onClose={() => setSelectedElement(null)}
  />
)}

        </div>
      </div>
    </main>
  );
}