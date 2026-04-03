// ═══════════════════════════════════════════════════════
// COLOR STYLE MAPS
// Toutes les classes Tailwind sont des chaînes statiques
// complètes pour éviter la purge à la compilation.
// ═══════════════════════════════════════════════════════

export interface ColorStyle {
  iconBg: string;
  iconBorder: string;
  iconText: string;
  labelText: string;
  tagBg: string;
  tagBorder: string;
  tagText: string;
  gradient: string;
  cardBorder: string;
}

export interface StatusStyle {
  bg: string;
  text: string;
  border: string;
  dot: string;
}

export interface HealthStyle {
  bg: string;
  text: string;
  border: string;
}

// ─── Per-color map (used by poles, cards, icons) ────

export const COLOR_STYLES: Record<string, ColorStyle> = {
  emerald: {
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    iconText: "text-emerald-400",
    labelText: "text-emerald-400/80",
    tagBg: "bg-emerald-500/10",
    tagBorder: "border-emerald-500/20",
    tagText: "text-emerald-400",
    gradient: "from-emerald-400/20 to-emerald-500/5",
    cardBorder: "border-emerald-500/15",
  },
  amber: {
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/20",
    iconText: "text-amber-400",
    labelText: "text-amber-400/80",
    tagBg: "bg-amber-500/10",
    tagBorder: "border-amber-500/20",
    tagText: "text-amber-400",
    gradient: "from-amber-400/20 to-amber-500/5",
    cardBorder: "border-amber-500/15",
  },
  sky: {
    iconBg: "bg-sky-500/10",
    iconBorder: "border-sky-500/20",
    iconText: "text-sky-400",
    labelText: "text-sky-400/80",
    tagBg: "bg-sky-500/10",
    tagBorder: "border-sky-500/20",
    tagText: "text-sky-400",
    gradient: "from-sky-400/20 to-blue-500/5",
    cardBorder: "border-sky-500/15",
  },
  fuchsia: {
    iconBg: "bg-fuchsia-500/10",
    iconBorder: "border-fuchsia-500/20",
    iconText: "text-fuchsia-400",
    labelText: "text-fuchsia-400/80",
    tagBg: "bg-fuchsia-500/10",
    tagBorder: "border-fuchsia-500/20",
    tagText: "text-fuchsia-400",
    gradient: "from-fuchsia-400/20 to-fuchsia-500/5",
    cardBorder: "border-fuchsia-500/15",
  },
  cyan: {
    iconBg: "bg-cyan-500/10",
    iconBorder: "border-cyan-500/20",
    iconText: "text-cyan-400",
    labelText: "text-cyan-400/80",
    tagBg: "bg-cyan-500/10",
    tagBorder: "border-cyan-500/20",
    tagText: "text-cyan-400",
    gradient: "from-cyan-400/20 to-cyan-500/5",
    cardBorder: "border-cyan-500/15",
  },
  indigo: {
    iconBg: "bg-indigo-500/10",
    iconBorder: "border-indigo-500/20",
    iconText: "text-indigo-400",
    labelText: "text-indigo-400/80",
    tagBg: "bg-indigo-500/10",
    tagBorder: "border-indigo-500/20",
    tagText: "text-indigo-400",
    gradient: "from-indigo-400/20 to-indigo-500/5",
    cardBorder: "border-indigo-500/15",
  },
  pink: {
    iconBg: "bg-pink-500/10",
    iconBorder: "border-pink-500/20",
    iconText: "text-pink-400",
    labelText: "text-pink-400/80",
    tagBg: "bg-pink-500/10",
    tagBorder: "border-pink-500/20",
    tagText: "text-pink-400",
    gradient: "from-pink-400/20 to-rose-500/5",
    cardBorder: "border-pink-500/15",
  },
  orange: {
    iconBg: "bg-orange-500/10",
    iconBorder: "border-orange-500/20",
    iconText: "text-orange-400",
    labelText: "text-orange-400/80",
    tagBg: "bg-orange-500/10",
    tagBorder: "border-orange-500/20",
    tagText: "text-orange-400",
    gradient: "from-yellow-400/20 to-orange-500/5",
    cardBorder: "border-orange-500/15",
  },
  violet: {
    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-500/20",
    iconText: "text-violet-400",
    labelText: "text-violet-400/80",
    tagBg: "bg-violet-500/10",
    tagBorder: "border-violet-500/20",
    tagText: "text-violet-400",
    gradient: "from-violet-400/20 to-purple-500/5",
    cardBorder: "border-violet-500/15",
  },
  slate: {
    iconBg: "bg-slate-500/10",
    iconBorder: "border-slate-500/20",
    iconText: "text-slate-400",
    labelText: "text-slate-400/80",
    tagBg: "bg-slate-500/10",
    tagBorder: "border-slate-500/20",
    tagText: "text-slate-400",
    gradient: "from-slate-400/20 to-slate-500/5",
    cardBorder: "border-slate-500/15",
  },
  teal: {
    iconBg: "bg-teal-500/10",
    iconBorder: "border-teal-500/20",
    iconText: "text-teal-400",
    labelText: "text-teal-400/80",
    tagBg: "bg-teal-500/10",
    tagBorder: "border-teal-500/20",
    tagText: "text-teal-400",
    gradient: "from-teal-400/20 to-teal-500/5",
    cardBorder: "border-teal-500/15",
  },
};

// ─── Status badges ──────────────────────────────────

export const STATUS_STYLES: Record<string, StatusStyle> = {
  "Actif": { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/25", dot: "bg-emerald-400" },
  "En cours": { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/25", dot: "bg-amber-400" },
  "En attente": { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/25", dot: "bg-sky-400" },
  "Veille": { bg: "bg-slate-500/15", text: "text-slate-400", border: "border-slate-500/25", dot: "bg-slate-500" },
};

// ─── Health badges ──────────────────────────────────

export const HEALTH_STYLES: Record<string, HealthStyle> = {
  "Prioritaire": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  "Développement": { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20" },
  "Lancement": { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20" },
  "Test": { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20" },
  "Exploration": { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  "Fort potentiel": { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/20" },
};

// ─── Alert severity ─────────────────────────────────

export const SEVERITY_STYLES: Record<string, string> = {
  high: "border-l-red-500",
  medium: "border-l-amber-500",
  low: "border-l-slate-500",
};
