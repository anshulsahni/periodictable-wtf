import Link from "next/link";

interface Props {
  className?: string;
  theme?: "light" | "dark";
}

export default function NavbarLogo({ className = "", theme = "light" }: Props) {
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-3.5 group select-none transition-transform duration-200 active:scale-98 ${className}`}
    >
      {/* Icon block */}
      <div className="relative w-12 h-12 flex-shrink-0">
        {/* Shadow */}
        <div className="absolute top-1 left-1 w-10 h-10 bg-black rounded transition-all duration-200 group-hover:top-1.5 group-hover:left-1.5" />
        {/* Main pink element card */}
        <div className="absolute top-0 left-0 w-10 h-10 bg-[#ff4b93] border-2 border-black rounded flex flex-col justify-between p-1.5 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
          <div className="flex justify-between text-[7px] font-black font-mono text-black leading-none tracking-tight">
            <span>?!</span>
            <span>119</span>
          </div>
          <div className="text-center font-black text-[15px] text-black leading-none mb-0.5 font-sans">
            Wt
          </div>
        </div>
      </div>

      {/* Brand logotype */}
      <span className={`text-2xl font-black tracking-tight ${textColor} font-sans uppercase leading-none`}>
        periodic<span className="text-[#ff4b93]">.</span>table
        <span className="ml-1 inline-block -rotate-1 bg-black px-1.5 py-0.5 text-sm font-black text-white tracking-tight shadow-[2px_2px_0px_rgba(0,0,0,0.15)] group-hover:rotate-1 transition-all duration-200">
          WTF
        </span>
      </span>
    </Link>
  );
}
