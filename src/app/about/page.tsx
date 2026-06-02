import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About the Builder - Manan Sahni | Periodic Table WTF",
  description: "Meet Manan Sahni, student by degree and builder by habit. Exploring Next.js, TypeScript, product analytics, and AI workflows.",
  keywords: ["Manan Sahni", "developer", "student", "builder", "periodic table", "Next.js", "TypeScript"],
};

export default function AboutPage() {
  return (
    <main
      className="min-h-screen bg-[#f6f1e8] p-5 sm:p-8 font-sans text-black"
      style={{
        backgroundImage: "radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* TOP HEADER */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b-2 border-black pb-5">
          <div className="flex flex-col items-start gap-1">
            <h1 className="flex items-center font-bold uppercase tracking-tight text-black text-4xl sm:text-5xl">
              <span>ABOUT THE</span>
              <span className="ml-2 inline-block -rotate-1 bg-black px-2.5 py-1 text-2xl sm:text-3xl font-black text-white tracking-tight shadow-md">BUILDER</span>
            </h1>
            <div className="mt-1 text-xs font-mono font-bold uppercase tracking-widest text-black/60">
              BEHIND THE SYSTEM COORDINATES
            </div>
          </div>
          
          <Link
            href="/"
            className="text-black self-start sm:self-center inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-mono text-sm font-bold uppercase transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            ← BACK TO SYSTEM GRID
          </Link>
        </header>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: IDENTITY & SIGNALS */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Identity Card */}
            <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_black] relative">
              <div className="absolute -top-3 left-4 bg-black text-white px-2.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest border border-black">
                Identity Profile //
              </div>
              
              <h2 className="text-4xl font-black uppercase tracking-tight text-black mt-2">
                Manan Sahni
              </h2>
              
              {/* Highlight Tagline */}
              <div className="mt-3 inline-block -rotate-1 bg-[#ff4b93] text-black px-3 py-1 text-sm font-mono font-black uppercase border border-black shadow-[2px_2px_0px_black]">
                Building things that didn't exist yesterday.
              </div>
              
              <p className="mt-6 text-sm font-mono font-medium text-zinc-800 leading-relaxed border-t border-black/10 pt-4">
                I enjoy turning random ideas into working products and learning new technologies along the way. Most of my projects start as experiments and somehow turn into full applications.
              </p>
            </div>

            {/* Social Signal Card */}
            <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_black] relative">
              <div className="absolute -top-3 left-4 bg-black text-white px-2.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest border border-black">
                Signal Frequency //
              </div>
              
              <h3 className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest mb-4 mt-2">
                External Integrations:
              </h3>
              
              <div className="flex flex-col gap-3 font-mono text-black">
                <a
                  href="https://github.com/codermanan69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black flex items-center justify-between border-2 border-black bg-white px-4 py-3 font-bold uppercase transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0 active:shadow-none"
                >
                  <span>GITHUB // @codermanan69</span>
                  <span>↗</span>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/manan-sahni-533744338"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black flex items-center justify-between border-2 border-black bg-white px-4 py-3 font-bold uppercase transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0 active:shadow-none"
                >
                  <span>LINKEDIN // MANAN SAHNI</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STATES, INTERESTS & METRICS */}
          <div className="md:col-span-7 flex flex-col gap-6">
            
            {/* Currently Card */}
            <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_black] relative">
              <div className="absolute -top-3 left-4 bg-black text-white px-2.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest border border-black">
                Currently Active //
              </div>
              
              <h3 className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest mb-4 mt-2">
                System Processes in Execution:
              </h3>
              
              <ul className="flex flex-col gap-3.5 font-mono text-sm font-bold">
                {[
                  { text: "Building side projects", status: "completed" },
                  { text: "Learning analytics", status: "completed" },
                  { text: "Exploring AI workflows", status: "completed" },
                  { text: "Trying not to start another project", status: "in-progress" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 border border-black/10 bg-[#fbf9f4] p-3 shadow-[2px_2px_0px_rgba(0,0,0,0.05)]">
                    <span className={`w-5 h-5 flex items-center justify-center border-2 border-black font-black text-xs ${item.status === "completed" ? "bg-[#31b7ea] text-black" : "bg-[#ffe600] text-black animate-pulse"}`}>
                      {item.status === "completed" ? "✓" : "⚡"}
                    </span>
                    <span className="text-zinc-800">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack / Interests Card */}
            <div className="border-2 border-black bg-white p-6 shadow-[6px_6px_0px_black] relative">
              <div className="absolute -top-3 left-4 bg-black text-white px-2.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest border border-black">
                System Interfaces //
              </div>
              
              <h3 className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest mb-4 mt-2">
                Core Technologies & Fields in Active Rotation:
              </h3>
              
              <div className="flex flex-wrap gap-2.5">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Product Analytics",
                  "AI-assisted Development",
                ].map((interest) => (
                  <span
                    key={interest}
                    className="border-2 border-black bg-white px-3.5 py-1.5 font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_black] transition-all hover:bg-black hover:text-white hover:shadow-none"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

           

          </div>
          
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t border-black/10 pt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
          <span>SYSTEM ARCHIVE BUILD: #WTF-0.2.0</span>
          <span>MANAN SAHNI &copy; 2026</span>
        </footer>

      </div>
    </main>
  );
}
