import { STATUS_STYLES } from "../styles/colors";

interface Props {
  status: string;
}

export function StatusBadge({ status }: Props) {
  const s = STATUS_STYLES[status] || STATUS_STYLES["Veille"];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide ${s.bg} ${s.text} ${s.border}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}
