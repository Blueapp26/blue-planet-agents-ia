import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Layers,
  TrendingUp,
  Zap,
  MapPin,    // Ajouté
  Loader2,   // Ajouté
  Send       // Ajouté
} from "lucide-react";
import OrganigrammeAgents from "../components/OrganigrammeAgents";
import { Card } from "../components/Card";
import { SectionHeader } from "../components/SectionHeader";
import { OverviewCard } from "../components/OverviewCard";
import { AlertItem } from "../components/AlertItem";
import { PriorityRow } from "../components/PriorityRow";
import { PoleCard } from "../components/PoleCard";
import {
  OVERVIEW_CARDS,
  BUSINESS_UNITS,
  SUPPORT_POLES,
  TOOLS as DEFAULT_TOOLS,
  type Alert,
} from "../constants/data";

interface Props {
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
}

// URL pour récupérer les stats (existante)
const WEBHOOK_URL = "https://blueplanet.app.n8n.cloud/webhook/dashboard-data";
// URL pour déclencher tes agents (À REMPLACER PAR TON URL DE WEBHOOK N8N)
const N8N_AGENT_TRIGGER_URL = "https://TON_INSTANCE.n8n.cloud/webhook/ton-id-agent";

export function DashboardTab({ selectedUnit, setSelectedUnit }: Props) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [tools, setTools] = useState<string[]>(DEFAULT_TOOLS);

  // --- NOUVEAUX ÉTATS POUR LES AGENTS IA ---
  const [locationInput, setLocationInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch(WEBHOOK_URL)
      .then((r) => r.json())
      .then((d) => {
        if (d.alerts?.length) {
          setAlerts(
            d.alerts.map((a: any) => ({
              text: String(a.text || a.message || ""),
              severity: ["high", "medium", "low"].includes(a.severity)
                ? a.severity
                : "medium",
              pole: String(a.category || a.pole || ""),
            })),
          );
        }
        if (d.tools?.length) {
          setTools(
            d.tools
              .map((t: any) =>
                typeof t === "string" ? t : String(t.name || ""),
              )
              .filter(Boolean),
          );
        }
      })
      .catch((e) => console.error("Dashboard fetch error:", e));
  }, []);

  // --- FONCTION POUR LANCER LES AGENTS ---
  const handleTriggerAgents = async () => {
    if (!locationInput) return;

    setIsGenerating(true);
    setGenerationStatus("Nova coordonne l'équipe...");

    try {
      const response = await fetch(N8N_AGENT_TRIGGER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lieu: locationInput }),
      });

      if (response.ok) {
        setGenerationStatus("Succès ! L'article est en cours de publication par Alexis.");
        setLocationInput("");
      } else {
        setGenerationStatus("Erreur lors du lancement des agents.");
      }
    } catch (error) {
      setGenerationStatus("Erreur de connexion avec n8n.");
    } finally {
      setIsGenerating(false);
      setTimeout(() => setGenerationStatus(null), 5000);
    }
  };

  const filteredUnits =
    selectedUnit === "all"
      ? BUSINESS_UNITS
      : BUSINESS_UNITS.filter((u) => u.id === selectedUnit);

  const sortedByPriority = [...BUSINESS_UNITS].sort(
    (a, b) => a.priority - b.priority,
  );

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {OVERVIEW_CARDS.map((card) => (
          <OverviewCard key={card.title} card={card} />
        ))}
      </div>

      {/* --- NOUVELLE SECTION : GÉNÉRATEUR BLUE PLANET APP --- */}
      <Card className="p-5 border-indigo-500/20 bg-indigo-500/5">
        <SectionHeader
          label="Blue Planet App"
          title="Générateur d'articles IA"
          icon={Send}
          color="indigo"
        />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Ex: Le Colisée, Rome..."
              className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500/50 transition"
              disabled={isGenerating}
            />
          </div>
          <button
            onClick={handleTriggerAgents}
            disabled={isGenerating || !locationInput}
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Production en cours...
              </>
            ) : (
              "Lancer les Agents"
            )}
          </button>
        </div>
        {generationStatus && (
          <p className="mt-2 text-xs text-indigo-300 italic">{generationStatus}</p>
        )}
      </Card>

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
              <PriorityRow key={unit.id} unit={unit} rank={i} />
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
            {BUSINESS_UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.title}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredUnits.map((unit) => (
            <PoleCard key={unit.id} pole={unit} />
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
          {SUPPORT_POLES.map((pole) => (
            <PoleCard key={pole.id} pole={pole} compact />
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
      {/* Organigramme Agents */}
      <Card className="p-5">
        <SectionHeader
          label="Architecture"
          title="Organigramme des Agents IA"
          icon={Layers}
          color="purple"
        />
        <div className="mt-4">
          <OrganigrammeAgents />
        </div>
      </Card>
    </div>
  );
}