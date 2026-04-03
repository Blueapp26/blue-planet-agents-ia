import { Clock } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { HistoryItem } from "../components/HistoryItem";
import { HISTORY } from "../constants/data";

export function HistoryTab() {
  return (
    <div className="max-w-2xl space-y-4">
      <SectionHeader label="Journal" title="Historique des missions" icon={Clock} color="sky" />
      <div className="mt-4 space-y-2">
        {HISTORY.length > 0 ? (
          HISTORY.map((item, i) => <HistoryItem key={i} item={item} />)
        ) : (
          <p className="text-sm text-slate-600 italic py-8 text-center">
            L'historique des missions apparaîtra ici après vos premières analyses.
          </p>
        )}
      </div>
    </div>
  );
}
