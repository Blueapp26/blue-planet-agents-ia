import { COLOR_STYLES } from "../styles/colors";
import { Card } from "./Card";
import type { HistoryEntry } from "../models/data";

interface Props {
  item: HistoryEntry;
}

export function HistoryItem({ item }: Props) {
  const c = COLOR_STYLES[item.color] || COLOR_STYLES.slate;

  return (
    <Card hover className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-white">{item.title}</p>
          <p className="mt-1 text-xs text-slate-500">{item.date}</p>
        </div>
        <span className={`shrink-0 rounded-md ${c.tagBg} border ${c.tagBorder} px-2 py-0.5 text-[10px] font-medium ${c.tagText}`}>
          {item.tag}
        </span>
      </div>
    </Card>
  );
}
