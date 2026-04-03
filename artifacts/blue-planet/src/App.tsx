import { useState, useCallback } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { NavTab } from "./components/NavTab";
import { DashboardTab } from "./tabs/DashboardTab";
import { MissionTab } from "./tabs/MissionTab";
import { OrgTab } from "./tabs/OrgTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { runDirectorAnalysis } from "./services/api";
import { DEFAULT_MISSION } from "./constants/data";
import type { DirectorResponse } from "./constants/data";

type TabId = "dashboard" | "mission" | "org" | "history";
type ApiStatus = "idle" | "success" | "error";

const TABS: { id: TabId; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "mission", label: "Mission IA" },
  { id: "org", label: "Organigramme" },
  { id: "history", label: "Historique" },
];

export default function App() {
  // ─── Navigation ───────────────────────────────
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  // ─── Mission state ────────────────────────────
  const [mission, setMission] = useState(DEFAULT_MISSION);
  const [selectedPoles, setSelectedPoles] = useState([
    "Commercial", "Finance & Admin", "Conciergerie", "Agents IA B2B",
  ]);
  const [selectedUnit, setSelectedUnit] = useState("all");

  // ─── API state ────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [directorResult, setDirectorResult] = useState<DirectorResponse | null>(null);

  // ─── Handlers ─────────────────────────────────
  const togglePole = useCallback((pole: string) => {
    setSelectedPoles((prev) =>
      prev.includes(pole) ? prev.filter((p) => p !== pole) : [...prev, pole]
    );
  }, []);

  const handleRunAnalysis = useCallback(async () => {
    setLoading(true);
    setApiStatus("idle");
    setErrorMessage("");
    try {
      const data = await runDirectorAnalysis(mission, selectedPoles);
      setApiStatus("success");
      setDirectorResult(data);
    } catch (error) {
      setApiStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Connexion impossible au workflow n8n."
      );
    } finally {
      setLoading(false);
    }
  }, [mission, selectedPoles]);

  // ─── Render ───────────────────────────────────
  return (
    <div className="min-h-screen bg-[#08090e] text-white antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08090e]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold">
                BP
              </div>
              <div>
                <span className="text-sm font-semibold text-white">Blue Planet</span>
                <span className="ml-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Command Center
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {apiStatus === "success" && (
                <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3" /> Connecté
                </span>
              )}
              {apiStatus === "error" && (
                <span className="flex items-center gap-1.5 rounded-md bg-red-500/10 px-2.5 py-1 text-[11px] text-red-400 border border-red-500/20">
                  <XCircle className="h-3 w-3" /> Erreur
                </span>
              )}
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-[11px] font-semibold">
                AW
              </div>
            </div>
          </div>
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {TABS.map((tab) => (
              <NavTab
                key={tab.id}
                label={tab.label}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1440px] px-4 py-6 md:px-6">
        {activeTab === "dashboard" && (
          <DashboardTab selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} />
        )}
        {activeTab === "mission" && (
          <MissionTab
            mission={mission}
            setMission={setMission}
            selectedPoles={selectedPoles}
            togglePole={togglePole}
            loading={loading}
            errorMessage={errorMessage}
            directorResult={directorResult}
            onRunAnalysis={handleRunAnalysis}
          />
        )}
        {activeTab === "org" && <OrgTab />}
        {activeTab === "history" && <HistoryTab />}
      </main>
    </div>
  );
}
