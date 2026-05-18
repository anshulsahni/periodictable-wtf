type ElementModalProps = {
  element: any;
  onClose: () => void;
};

export default function ElementModal({
  element,
  onClose,
}: ElementModalProps) {
  if (!element) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      
      <div className="relative w-[90%] max-w-md rounded-3xl border border-cyan-400/30 bg-zinc-950 p-8 shadow-[0_0_40px_rgba(0,255,255,0.2)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-zinc-400 transition hover:text-white"
        >
          ✕
        </button>

        {/* Symbol */}
        <div className="mb-4 text-7xl font-black text-cyan-400">
          {element.symbol}
        </div>

        {/* Name */}
        <h2 className="text-3xl font-bold text-white">
          {element.name}
        </h2>

        <p className="mt-2 text-zinc-400">
          Atomic Number: {element.atomicNumber}
        </p>

        <p className="text-zinc-400">
          Atomic Weight: {element.atomicWeight}
        </p>

        <p className="text-zinc-400">
          Category: {element.category}
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
          ⚛️ Fun Fact: This element is part of the universe’s building blocks.
        </div>
      </div>
    </div>
  );
}