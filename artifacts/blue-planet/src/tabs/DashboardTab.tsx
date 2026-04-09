import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Layers,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Card } from "../components/Card";
import { SectionHeader } from "../components/SectionHeader";
import { OverviewCard } from "../components/OverviewCard";
import { AlertItem } from "../components/AlertItem";
import { PriorityRow } from "../components/PriorityRow";
import { PoleCard } from "../components/PoleCard";
import {
  OVERVIEW_CARDS as DEFAULT_OVERVIEW,
  BUSINESS_UNITS as DEFAULT_UNITS,
  SUPPORT_POLES as DEFAULT_POLES,
  ALERTS as DEFAULT_ALERTS,
  TOOLS as DEFAULT_TOOLS,
} from "../constants/data";

interface Props {
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
}

const WEBHOOK_URL = "https://blueplanet.app.n8n.cloud/webhook/dashboard-data";

export function DashboardTab({ selectedUnit, setSelectedUnit }: Props) {
  const [businessUnits, setBusinessUnits] = useState<any[]>(DEFAULT_UNITS);
  const [supportPoles, setSupportPoles] = useState<any[]>(DEFAULT_POLES);
  const [overviewCards, setOverviewCards] = useState<any[]>(DEFAULT_OVERVIEW);
  const [alerts, setAlerts] = useState<any[]>(DEFAULT_ALERTS);
  const [tools, setTools] = useState<string[]>(DEFAULT_TOOLS);

  useEffect(() => {
    fetch(WEBHOOK_URL)
      .then((r) => r.json())
      .then((d) => {
        if (d.businessUnits?.length) setBusinessUnits(d.businessUnits);
        if (d.supportPoles?.length) setSupportPoles(d.supportPoles);
        if (d.overviewCards?.length) setOverviewCards(d.overviewCards);
        if (d.alerts?.length) setAlerts(d.alerts);
        if (d.tools?.length) {
          setTools(
            d.tools.map((t: any) => (typeof t === "string" ? t : t.name || "")),
          );
        }
      })
      .catch((e) => console.error("Dashboard fetch error:", e));
  }, []);

  const filteredUnits =
    selectedUnit === "all"
      ? businessUnits
      : businessUnits.filter((u) => u.id === selectedUnit);

  const sortedByPriority = [...businessUnits].sort(
    (a, b) => (a.priority || 0) - (b.priority || 0),
  );

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {overviewCards.map((card, i) => (
          <OverviewCard key={card.title ?? i} card={card} />
        ))}
      </div>

      {/* Alertes + Priorités */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="p-5">
          <SectionHeader
            label="Alertes"
            title="Blocages à traiter"
            icon={AlertTriangle}
            color="amber"
          />
          <div className="mt-4 space-y-2">
            {alerts.length > 0 ? (
              alerts.map((alert, i) => <AlertItem key={i} alert={alert} />)
            ) : (
              <p className="text-sm text-slate-600 italic py-4 text-center">
                Aucune alerte en cours
              </p>
            )}
          </div>
        </Card>
        <Card className="p-5">
          <SectionHeader
            label="Classement"
            title="Priorités par rentabilité"
            icon={TrendingUp}
            color="emerald"
          />
          <div className="mt-4 space-y-2">
            {sortedByPriority.map((unit, i) => (
              <PriorityRow key={unit.id ?? i} unit={unit} rank={i} />
            ))}
          </div>
        </Card>
      </div>

      {/* Branches business */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <SectionHeader
            label="Niveau 2"
            title="Branches business"
            icon={Layers}
            color="indigo"
          />
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-slate-300 outline-none focus:border-white/20 transition"
          >
            <option value="all">Toutes les activités</option>
            {businessUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name || u.title}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredUnits.map((unit, i) => (
            <PoleCard key={unit.id ?? i} pole={unit} />
          ))}
        </div>
      </div>

      {/* Pôles transverses */}
      <div>
        <SectionHeader
          label="Niveau 1"
          title="Pôles transverses"
          icon={BarChart3}
          color="sky"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {supportPoles.map((pole, i) => (
            <PoleCard key={pole.id ?? i} pole={pole} compact />
          ))}
        </div>
      </div>

      {/* Outils */}
      <Card className="p-5">
        <SectionHeader
          label="Stack"
          title="Outils connectés"
          icon={Zap}
          color="emerald"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {tools.map((tool, i) => (
            <span
              key={i}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400 transition hover:border-white/10 hover:text-slate-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
