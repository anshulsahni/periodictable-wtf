type Props = {
  symbol: string;
  number: number;
  color: string;
  faded: boolean;
  electronegativity: number | null;
  block?: string;
  topRight?: string | number;
};

export default function ElementBox({
  symbol,
  number,
  color,
  faded,
  electronegativity,
  block,
  topRight,
}: Props) {
  const isDarkText = color === "#ffe600" || color.startsWith("repeating-linear-gradient");
  const textColorClass = isDarkText ? "text-black" : "text-white";

  return (
    <div
      className="relative flex h-[88px] w-full min-w-[72px] flex-col justify-between p-1.5 border border-black cursor-pointer transition-all duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_black] hover:z-10"
      style={{
        background: color,
        opacity: faded ? 0.15 : 1,
      }}
    >
      {/* Top Row */}
      <div className={`flex justify-between text-[11px] font-bold ${textColorClass} leading-none`}>
        <span>{number}</span>
        <span>{topRight ?? number}</span>
      </div>

      {/* Symbol */}
      <div className="flex flex-1 items-center justify-center">
        <span className={`text-4xl font-black tracking-tight ${textColorClass} leading-none`}>
          {symbol}
        </span>
      </div>

      {/* Bottom Row */}
      <div className={`flex justify-between text-[11px] font-bold ${textColorClass} leading-none`}>
        <span>{electronegativity ? electronegativity.toFixed(2) : ""}</span>
        <span>{block ?? ""}</span>
      </div>
    </div>
  );
}