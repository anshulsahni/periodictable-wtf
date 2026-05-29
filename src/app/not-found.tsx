import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen bg-[#f6f1e8] flex items-center justify-center p-6 text-black font-mono"
      style={{
        backgroundImage: "radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-md w-full border-4 border-black bg-white p-8 shadow-[8px_8px_0px_black] text-center relative">
        <div className="absolute -top-4 left-6 bg-black text-white px-3 py-0.5 text-xs font-black uppercase tracking-widest border border-black">
          System Error 404
        </div>
        
        <h1 className="text-6xl font-black text-red-500 mb-2 tracking-tighter">
          [!NOT_FOUND]
        </h1>
        
        <div className="border-t-2 border-black/10 my-4"></div>
        
        <h2 className="text-xl font-black uppercase text-black mb-3">
          Element System Error
        </h2>
        
        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          The requested path or chemical element does not exist in the periodic table index. Please check your spelling coordinates or return to the main terminal system.
        </p>

        <Link
          href="/"
          className="inline-block border-2 border-black bg-[#ffe600] text-black px-6 py-2.5 font-bold uppercase transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          ← Return to System Grid
        </Link>
      </div>
    </main>
  );
}
