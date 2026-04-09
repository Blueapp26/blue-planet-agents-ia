import { useEffect, useState } from "react";
import { Calendar, MapPin, Tag } from "lucide-react";
import { Card } from "../components/Card";
import { SectionHeader } from "../components/SectionHeader";

interface HistoryEntry {
  id?: string;
  date: string;
  title: string;
  description?: string;
  category?: string;
  author?: string;
}

const WEBHOOK_URL = "https://blueplanet.app.n8n.cloud/webhook/dashboard-data";

export function HistoryTab() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(WEBHOOK_URL)
      .then((r) => r.json())
      .then((d) => {
        if (d.history?.length) {
          setHistory(d.history);
        }
      })
      .catch((e) => console.error("History fetch error:", e))
      .finally(() => setLoading(false));
  }, []);

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      commercial: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      finance: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      rh: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      tech: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      product: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    };
    return (
      colors[category?.toLowerCase() || ""] ||
      "bg-slate-500/10 text-slate-400 border-slate-500/20"
    );
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        label="Timeline"
        title="Historique des événements"
        icon={Calendar}
        color="cyan"
      />

      {loading ? (
        <p className="text-center text-slate-500">Chargement...</p>
      ) : history.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-slate-500">Aucun historique disponible</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((entry, idx) => (
            <Card
              key={entry.id || idx}
              className="p-4 hover:border-white/[0.12] transition"
            >
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-cyan-400 mt-1.5" />
                  {idx < history.length - 1 && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-cyan-400/50 to-transparent mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-medium text-white">{entry.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {entry.description}
                      </p>
                    </div>
                    {entry.category && (
                      <span
                        className={`text-xs px-2 py-1 rounded border shrink-0 ${getCategoryColor(
                          entry.category,
                        )}`}
                      >
                        {entry.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(entry.date).toLocaleDateString("fr-FR")}
                    </div>
                    {entry.author && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {entry.author}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
