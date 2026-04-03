import { useMemo } from "react";
import { AlertTriangle, BarChart3, Layers, TrendingUp, Zap } from "lucide-react";
import { Card } from "../components/Card";
import { SectionHeader } from "../components/SectionHeader";
import { OverviewCard } from "../components/OverviewCard";
import { AlertItem } from "../components/AlertItem";
import { PriorityRow } from "../components/PriorityRow";
import { PoleCard } from "../components/PoleCard";
import { OVERVIEW_CARDS, BUSINESS_UNITS, SUPPORT_POLES, ALERTS, TOOLS } from "../constants/data";

interface Props {
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
}

export function DashboardTab({ selectedUnit, setSelectedUnit }: Props) {
  const filteredUnits = useMemo(() => {
    if (selectedUnit === "all") return BUSINESS_UNITS;
    return BUSINESS_UNITS.filter((u) => u.id === selectedUnit);
  }, [selectedUnit]);

  const sortedByPriority = useMemo(() => {
    return [...BUSINESS_UNITS].sort((a, b) => a.priority - b.priority);
  }, []);

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {OVERVIEW_CARDS.map((card) => (
          <OverviewCard key={card.title} card={card} />
        ))}
      </div>

      {/* Alerts + Priorities */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="p-5">
          <SectionHeader label="Alertes" title="Blocages à traiter" icon={AlertTriangle} color="amber" />
          <div className="mt-4 space-y-2">
            {ALERTS.length > 0 ? (
              ALERTS.map((alert, i) => <AlertItem key={i} alert={alert} />)
            ) : (
              <p className="text-sm text-slate-600 italic py-4 text-center">Aucune alerte en cours</p>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeader label="Classement" title="Priorités par rentabilité" icon={TrendingUp} color="emerald" />
          <div className="mt-4 space-y-2">
            {sortedByPriority.map((unit, i) => (
              <PriorityRow key={unit.id} unit={unit} rank={i} />
            ))}
          </div>
        </Card>
      </div>

      {/* Business Units */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <SectionHeader label="Niveau 2" title="Branches business" icon={Layers} color="indigo" />
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-slate-300 outline-none focus:border-white/20 transition"
          >
            <option value="all">Toutes les activités</option>
            {BUSINESS_UNITS.map((u) => (
              <option key={u.id} value={u.id}>{u.title}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredUnits.map((unit) => (
            <PoleCard key={unit.id} pole={unit} />
          ))}
        </div>
      </div>

      {/* Support Poles */}
      <div>
        <SectionHeader label="Niveau 1" title="Pôles transverses" icon={BarChart3} color="sky" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {SUPPORT_POLES.map((pole) => (
            <PoleCard key={pole.id} pole={pole} compact />
          ))}
        </div>
      </div>

      {/* Tools */}
      <Card className="p-5">
        <SectionHeader label="Stack" title="Outils connectés" icon={Zap} color="emerald" />
        <div className="mt-4 flex flex-wrap gap-2">
          {TOOLS.map((tool) => (
            <span key={tool} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400 transition hover:border-white/10 hover:text-slate-300">
              {tool}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
