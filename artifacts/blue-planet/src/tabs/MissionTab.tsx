import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Loader2,
  Play,
  Target,
  Zap,
} from "lucide-react";
import { Card } from "../components/Card";
import { SectionHeader } from "../components/SectionHeader";
import { ALL_POLE_OPTIONS, MISSION_TEMPLATES } from "../constants/data";
import type { DirectorResponse } from "../constants/data";

interface Props {
  mission: string;
  setMission: (mission: string) => void;
  selectedPoles: string[];
  togglePole: (pole: string) => void;
  loading: boolean;
  errorMessage: string;
  directorResult: DirectorResponse | null;
  onRunAnalysis: () => void;
}

export function MissionTab({
  mission,
  setMission,
  selectedPoles,
  togglePole,
  loading,
  errorMessage,
  directorResult,
  onRunAnalysis,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT: Mission input */}
        <div className="space-y-4">
          <Card className="p-5">
            <SectionHeader label="Mission" title="Instruction au Directeur IA" icon={Bot} color="violet" />
            <div className="mt-4">
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                placeholder="Décrivez votre mission ici..."
                className="min-h-[200px] w-full resize-y rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-white/15 transition"
              />
            </div>

            {/* Pole toggles */}
            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">Pôles activés</p>
              <div className="flex flex-wrap gap-2">
                {ALL_POLE_OPTIONS.map((pole) => {
                  const active = selectedPoles.includes(pole);
                  return (
                    <button
                      key={pole}
                      onClick={() => togglePole(pole)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        active
                          ? "border-violet-500/30 bg-violet-500/15 text-violet-300"
                          : "border-white/[0.06] bg-white/[0.02] text-slate-500 hover:border-white/10 hover:text-slate-400"
                      }`}
                    >
                      {pole}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action button */}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={onRunAnalysis}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Analyse en cours...</>
                ) : (
                  <><Play className="h-3.5 w-3.5" /> Lancer l'analyse</>
                )}
              </button>
            </div>

            {errorMessage && (
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                {errorMessage}
              </div>
            )}
          </Card>

          {/* Templates */}
          <Card className="p-5">
            <SectionHeader label="Scénarios" title="Missions pré-configurées" icon={ClipboardList} color="slate" />
            <div className="mt-4 space-y-2">
              {MISSION_TEMPLATES.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setMission(t.prompt)}
                  className="flex w-full items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left text-sm text-slate-300 transition hover:border-white/10 hover:bg-white/[0.04] group"
                >
                  <span>{t.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 transition group-hover:text-slate-400 group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT: Results */}
        <div className="space-y-4">
          {/* Diagnostic */}
          <Card className="p-5">
            <SectionHeader label="Diagnostic" title="Synthèse stratégique" icon={Bot} color="fuchsia" />
            <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 min-h-[140px]">
              <p className="text-sm leading-relaxed text-slate-400">
                {directorResult?.diagnostic || "Le diagnostic apparaîtra ici après l'analyse."}
              </p>
            </div>
          </Card>

          {/* Priorities */}
          <Card className="p-5">
            <SectionHeader label="Priorités" title="Renvoyées par l'IA" icon={Target} color="violet" />
            <div className="mt-4 space-y-2">
              {(directorResult?.priorites || []).length > 0 ? (
                directorResult!.priorites!.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-500/15 text-xs font-bold text-violet-400">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-300">{p}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600 italic">En attente d'analyse...</p>
              )}
            </div>
          </Card>

          {/* Actions par pôle */}
          <Card className="p-5">
            <SectionHeader label="Actions" title="Exécution par pôle" icon={CheckCircle2} color="emerald" />
            <div className="mt-4 space-y-3">
              {directorResult?.actionsParPole && Object.keys(directorResult.actionsParPole).length > 0 ? (
                Object.entries(directorResult.actionsParPole).map(([pole, actions]) => (
                  <div key={pole} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">{pole}</p>
                    <div className="space-y-2">
                      {actions.map((action, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600 italic">En attente d'analyse...</p>
              )}
            </div>
          </Card>

          {/* Prochaine étape */}
          <Card className="border-emerald-500/10 p-5">
            <SectionHeader label="Prochaine étape" title="Décision prioritaire" icon={Zap} color="emerald" />
            <div className="mt-4 rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-4">
              <p className="text-sm leading-relaxed text-emerald-300/80">
                {directorResult?.prochaineEtape || "La prochaine étape apparaîtra ici après l'analyse."}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
