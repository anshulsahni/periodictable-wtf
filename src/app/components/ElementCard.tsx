type ElementProps = {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicWeight: string;
  category: string;
};

const categoryStyles: Record<string, string> = {
  nonmetal: "border-green-400 shadow-green-500/40",
  "noble-gas": "border-pink-400 shadow-pink-500/40",
  "alkali-metal": "border-yellow-400 shadow-yellow-500/40",
  "alkaline-earth": "border-orange-400 shadow-orange-500/40",
  metalloid: "border-cyan-400 shadow-cyan-500/40",
  halogen: "border-purple-400 shadow-purple-500/40",
  "post-transition": "border-red-400 shadow-red-500/40",
};

export default function ElementCard({
  atomicNumber,
  symbol,
  name,
  atomicWeight,
  category,
}: ElementProps) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        bg-zinc-900/70
        p-4
        text-white
        backdrop-blur-md
        transition-all
        duration-500
        hover:-translate-y-3
        hover:rotate-1
        hover:scale-105
        hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]
        ${categoryStyles[category]}
      `}
    >
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-all
          duration-500
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            translate-x-[-100%]
            group-hover:translate-x-[100%]
            transition-transform
            duration-1000
          "
        />
      </div>

      <p className="text-sm text-zinc-300">
        #{atomicNumber}
      </p>

      <h2 className="mt-2 text-4xl font-black tracking-wide">
        {symbol}
      </h2>

      <p className="mt-3 text-sm font-medium">
        {name}
      </p>

      <p className="mt-1 text-xs text-zinc-400">
        Atomic Weight: {atomicWeight}
      </p>

      <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-500">
        {category}
      </p>
    </div>
  );
}