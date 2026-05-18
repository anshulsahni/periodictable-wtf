type Props = {
  active: string;
  setActive: (value: string) => void;
};

const filters = ["all", "s", "p", "d", "f"];

export default function FilterBar({
  active,
  setActive,
}: Props) {
  return (
    <div className="flex gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`border-2 border-black px-4 py-2 font-bold uppercase transition-all
            ${
              active === filter
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}