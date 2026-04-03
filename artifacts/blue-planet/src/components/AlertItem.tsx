import { SEVERITY_STYLES } from "../styles/colors";
import type { Alert } from "../constants/data";

interface Props {
  alert: Alert;
}

export function AlertItem({ alert }: Props) {
  return (
    <div className={`rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 border-l-2 ${SEVERITY_STYLES[alert.severity]}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-slate-300">{alert.text}</p>
        <span className="shrink-0 rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-500">{alert.pole}</span>
      </div>
    </div>
  );
}
