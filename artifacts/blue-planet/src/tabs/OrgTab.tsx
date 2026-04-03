import { Bot } from "lucide-react";
import { Card } from "../components/Card";
import { PoleCard } from "../components/PoleCard";
import { SUPPORT_POLES, BUSINESS_UNITS } from "../constants/data";

export function OrgTab() {
  return (
    <div className="space-y-8">
      {/* Director node */}
      <div className="flex flex-col items-center">
        <Card className="w-full max-w-sm border-violet-500/15 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/15 border border-violet-500/20">
            <Bot className="h-6 w-6 text-violet-400" />
          </div>
          <h2 className="mt-3 text-lg font-bold text-white">Directeur IA</h2>
          <p className="mt-1 text-xs text-slate-500">Arbitre les priorités, distribue les tâches, consolide la synthèse</p>
          <div className="mt-3 inline-flex rounded-md bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
            Claude orchestrateur
          </div>
        </Card>
        <div className="h-8 w-px bg-gradient-to-b from-violet-500/40 to-transparent" />
      </div>

      {/* Level 1 */}
      <div>
        <div className="text-center mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-400/70">Niveau 1</span>
          <h3 className="text-lg font-semibold text-white">Pôles transverses</h3>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-500/20 to-transparent mb-4" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SUPPORT_POLES.map((pole) => (
            <PoleCard key={pole.id} pole={pole} />
          ))}
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center">
        <div className="h-8 w-px bg-gradient-to-b from-sky-500/30 to-transparent" />
      </div>

      {/* Level 2 */}
      <div>
        <div className="text-center mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-indigo-400/70">Niveau 2</span>
          <h3 className="text-lg font-semibold text-white">Branches business</h3>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mb-4" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {BUSINESS_UNITS.map((unit) => (
            <PoleCard key={unit.id} pole={unit} />
          ))}
        </div>
      </div>
    </div>
  );
}
