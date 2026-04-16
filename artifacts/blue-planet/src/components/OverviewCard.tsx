import { COLOR_STYLES } from "../styles/colors";
import { Card } from "./Card";
import type { OverviewCard as OverviewCardType } from "../models/data";

interface Props {
  card: OverviewCardType;
}

export function OverviewCard({ card }: Props) {
  const Icon = card.icon;
  const c = COLOR_STYLES[card.color] || COLOR_STYLES.slate;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{card.title}</p>
          <p className="mt-2 text-2xl font-bold text-white">{card.value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.iconBg}`}>
          <Icon className={`h-5 w-5 ${c.iconText}`} />
        </div>
      </div>
    </Card>
  );
}
