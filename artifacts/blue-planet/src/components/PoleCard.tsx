import { COLOR_STYLES } from "../styles/colors";
import { StatusBadge } from "./StatusBadge";
import { HealthBadge } from "./HealthBadge";
import type { SupportPole, BusinessUnit } from "../constants/data";

interface Props {
  pole: SupportPole | BusinessUnit;
  compact?: boolean;
}

function isBusinessUnit(pole: SupportPole | BusinessUnit): pole is BusinessUnit {
  return "health" in pole;
}

export function PoleCard({ pole, compact = false }: Props) {
  const Icon = pole.icon;
  const c = COLOR_STYLES[pole.color] || COLOR_STYLES.slate;

  return (
    <div className={`rounded-xl border bg-gradient-to-b ${c.gradient} backdrop-blur-sm transition-all duration-200 hover:border-white/[0.12] p-4 ${c.cardBorder}`}>
      <div className="flex items-start gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.iconBg} border ${c.iconBorder}`}>
          <Icon className={`h-4 w-4 ${c.iconText}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-white truncate">{pole.title}</h3>
            <StatusBadge status={pole.status} />
            {isBusinessUnit(pole) && <HealthBadge health={pole.health} />}
          </div>
          <p className="mt-1 text-xs text-slate-500">{pole.subtitle}</p>
          {!compact && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {pole.children.map((child) => (
                <span key={child} className="rounded-md border border-white/[0.06] bg-black/20 px-2 py-1 text-[11px] text-slate-400">
                  {child}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
