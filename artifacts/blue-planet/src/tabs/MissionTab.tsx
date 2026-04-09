import { useEffect, useState } from "react";
import { Rocket, Lightbulb, CheckCircle2, Clock } from "lucide-react";
import { Card } from "../components/Card";
import { SectionHeader } from "../components/SectionHeader";

interface Mission {
  id?: string;
  title: string;
  description: string;
  status?: "active" | "pending" | "completed";
  priority?: "high" | "medium" | "low";
  deadline?: string;
}

interface AIAnalysis {
  mission: string;
  analysis: string;
  recommendations: string[];
  timestamp?: string;
}

const WEBHOOK_URL = "https://blueplanet.app.n8n.cloud/webhook/dashboard-data";

export function MissionTab() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [aiAnalysis, setAIAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(WEBHOOK_URL)
      .then((r) => r.json())
      .then((d: any) => {
        if (d.missionTemplates?.length) {
          setMissions(d.missionTemplates);
        }
        if (d.aiAnalysis) {
          setAIAnalysis(d.aiAnalysis);
        }
      })
      .catch((e) => console.error("Mission fetch error:", e))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-amber-400";
      case "low":
        return "text-emerald-400";
      default:
        return "text-slate-400";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />;
      case "active":
        return <Rocket className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <SectionHeader
          label="Missions"
          title="Missions et directives IA"
          icon={Rocket}
          color="emerald"
        />
        <p className="text-center text-slate-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        label="Missions"
        title="Missions et directives IA"
        icon={Rocket}
        color="emerald"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Missions List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">
              Missions actives
            </h2>
          </div>

          {missions.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">Aucune mission disponible</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {missions.map((mission, idx) => (
                <Card
                  key={mission.id || idx}
                  className="p-4 hover:border-white/[0.12] transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-white flex items-center gap-2">
                          <span className={getPriorityColor(mission.priority)}>
                            {getStatusIcon(mission.status)}
                          </span>
                          {mission.title}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">
                          {mission.description}
                        </p>
                      </div>
                      {mission.status && (
                        <span
                          className={`text-xs px-2 py-1 rounded border shrink-0 ${getStatusColor(
                            mission.status,
                          )}`}
                        >
                          {mission.status}
                        </span>
                      )}
                    </div>

                    {mission.deadline && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                        <Clock className="h-3 w-3" />
                        Échéance:{" "}
                        {new Date(mission.deadline).toLocaleDateString("fr-FR")}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* AI Analysis */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">Analyse IA</h2>
          </div>

          {aiAnalysis ? (
            <Card className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-violet-400 mb-2">
                  {aiAnalysis.mission}
                </h3>
                <p className="text-sm text-slate-300">{aiAnalysis.analysis}</p>
              </div>

              {aiAnalysis.recommendations?.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-slate-700">
                  <h4 className="text-xs font-medium text-slate-400 uppercase">
                    Recommandations
                  </h4>
                  <ul className="space-y-1">
                    {aiAnalysis.recommendations.map((rec, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-300 flex gap-2"
                      >
                        <span className="text-emerald-400 shrink-0">→</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {aiAnalysis.timestamp && (
                <p className="text-xs text-slate-500 pt-2">
                  Mis à jour:{" "}
                  {new Date(aiAnalysis.timestamp).toLocaleString("fr-FR")}
                </p>
              )}
            </Card>
          ) : (
            <Card className="p-4 text-center">
              <p className="text-xs text-slate-500">
                Aucune analyse IA disponible
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
