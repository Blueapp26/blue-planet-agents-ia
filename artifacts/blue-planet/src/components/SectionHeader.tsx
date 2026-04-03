import type { LucideIcon } from "lucide-react";
import { COLOR_STYLES } from "../styles/colors";

interface Props {
  label?: string;
  title: string;
  icon?: LucideIcon;
  color?: string;
}

export function SectionHeader({ label, title, icon: Icon, color = "slate" }: Props) {
  const c = COLOR_STYLES[color] || COLOR_STYLES.slate;
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.iconBg}`}>
            <Icon className={`h-4 w-4 ${c.iconText}`} />
          </div>
        )}
        <div>
          {label && <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${c.labelText}`}>{label}</p>}
          <h2 className="text-base font-semibold text-white">{title}</h2>
        </div>
      </div>
    </div>
  );
}
