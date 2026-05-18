const getTempState = (temp: number) => {
  if (temp <= 0) return "ABS. ZERO";
  if (temp <= 77) return "CRYOGENIC";
  if (temp < 273) return "FROZEN";
  if (temp < 373) return "TEMPERATE";
  if (temp <= 373) return "BOILING";
  if (temp <= 1000) return "SCORCHING";
  if (temp <= 3000) return "MOLTEN";
  return "PLASMA";
};

type Props = {
  temperature: number;
  setTemperature: (value: number) => void;

  activeBlocks: string[];
  setActiveBlocks: (value: string[]) => void;
};

export default function ControlPanel({
  temperature,
  setTemperature,
  activeBlocks,
  setActiveBlocks,
}: Props) {
  return (
    <div className="flex gap-4 items-stretch">

      {/* LEFT PANEL */}
      <div 
        className="w-[80%] border-2 border-black bg-white p-4 pt-6 shadow-[6px_6px_0px_black] relative flex flex-col justify-between"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      >
        
        {/* TEMPERATURE BADGE */}
        <div className="absolute -top-3 left-4 bg-black text-white px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest border border-black">
          Temperature
        </div>

        {/* Temperature */}
        <div className="mb-4">

          <div className="flex justify-between items-baseline mb-3">
            <div className="flex items-baseline">
              <span className="text-5xl font-black text-black leading-none">
                {temperature}
              </span>
              <span className="ml-1 text-xl font-bold text-gray-700 leading-none">
                K
              </span>
              <span className="ml-3 text-sm font-mono text-gray-400">
                = {Math.round(temperature - 273.15).toLocaleString()}&deg;C
              </span>
            </div>
            
            {/* STATE BADGE */}
            <div className="bg-black text-white px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest border border-black leading-none">
              {getTempState(temperature)}
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="0"
            max="6000"
            value={temperature}
            onChange={(e) =>
              setTemperature(Number(e.target.value))
            }
            className="h-3 w-full cursor-pointer appearance-none border border-black bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:bg-white"
            style={{
              background:
                "linear-gradient(to right, #ff4b93 0%, #ff4b93 33%, #31b7ea 33%, #31b7ea 66%, #f5df1b 66%, #f5df1b 100%)",
            }}
          />

          {/* Temperature Labels */}
          <div className="mt-2 flex justify-between text-[9px] font-mono text-gray-400">
            <span>0K</span>
            <span>1500K</span>
            <span>3000K</span>
            <span>4500K</span>
            <span>6000K</span>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2.5">

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
              onClick={() => setTemperature(item.value)}
              className={`border border-black px-2.5 py-1 text-[10px] font-bold uppercase transition-all hover:bg-black hover:text-white ${
                temperature === item.value
                  ? "bg-black text-white"
                  : "bg-[#f2ede3] text-black"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT FILTER PANEL */}
      <div 
        className="w-[20%] min-w-[180px] border-2 border-black bg-white p-3 pt-6 shadow-[6px_6px_0px_black] relative flex flex-col justify-between"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      >
        
        {/* BLOCKS BADGE */}
        <div className="absolute -top-3 left-4 bg-black text-white px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest border border-black">
          Blocks
        </div>

        <div>
          <div className="grid grid-cols-5 gap-1.5 mt-1">
            {[
              { name: "all", label: "ALL", count: 118 },
              { name: "s", label: "s", count: 14 },
              { name: "p", label: "p", count: 36 },
              { name: "d", label: "d", count: 38 },
              { name: "f", label: "f", count: 30 },
            ].map((block) => {
              const isActive = activeBlocks.includes(block.name);
              const handleBlockClick = () => {
                if (block.name === "all") {
                  setActiveBlocks(["all"]);
                } else {
                  let newBlocks = activeBlocks.filter((b) => b !== "all");
                  if (newBlocks.includes(block.name)) {
                    newBlocks = newBlocks.filter((b) => b !== block.name);
                  } else {
                    newBlocks.push(block.name);
                  }
                  if (newBlocks.length === 0) {
                    newBlocks = ["all"];
                  }
                  setActiveBlocks(newBlocks);
                }
              };

              return (
                <button
                  key={block.name}
                  onClick={handleBlockClick}
                  className={`flex flex-col items-center justify-center border border-black py-2.5 transition-all duration-200 aspect-square group
                    ${
                      isActive
                        ? "bg-[#0f1115] text-white"
                        : "bg-white text-black hover:bg-[#0f1115] hover:text-white"
                    }
                  `}
                >
                  <span
                    className={`text-lg font-bold leading-none ${
                      block.name === "all" ? "uppercase" : "lowercase"
                    }`}
                  >
                    {block.label}
                  </span>
                  <span
                    className={`text-[9px] font-mono mt-1 leading-none ${
                      isActive
                        ? "text-gray-400"
                        : "text-gray-500 group-hover:text-gray-400"
                    }`}
                  >
                    {block.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-[9px] uppercase tracking-wider text-gray-400 font-mono text-center leading-relaxed">
          Tap blocks to highlight &middot; Combine freely
        </p>
      </div>
    </div>
  );
}