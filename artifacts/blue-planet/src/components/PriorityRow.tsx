import { COLOR_STYLES } from "../styles/colors";
import { StatusBadge } from "./StatusBadge";
import type { BusinessUnit } from "../models/data";

interface Props {
  unit: BusinessUnit;
  rank: number;
}

export function PriorityRow({ unit, rank }: Props) {
  const Icon = unit.icon;
  const c = COLOR_STYLES[unit.color] || COLOR_STYLES.slate;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${rank < 3 ? "bg-emerald-500/15 text-emerald-400" : "bg-white/5 text-slate-500"}`}>
        {rank + 1}
      </span>
      <Icon className={`h-4 w-4 shrink-0 ${c.iconText}`} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white truncate">{unit.title}</p>
      </div>
      <span className="text-[11px] text-slate-500">{unit.revenue}</span>
      <StatusBadge status={unit.status} />
    </div>
  );
}
