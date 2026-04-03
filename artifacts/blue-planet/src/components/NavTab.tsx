interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function NavTab({ label, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
        active ? "text-white" : "text-slate-500 hover:text-slate-300"
      }`}
    >
      {label}
      {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />}
    </button>
  );
}
