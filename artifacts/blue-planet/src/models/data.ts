import {
  BarChart3,
  Bot,
  Briefcase,
  Gamepad2,
  Gift,
  KeyRound,
  Layers,
  Megaphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Types ──────────────────────────────────────────

export interface SupportPole {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  icon: LucideIcon;
  color: string;
  children: string[];
}

export interface BusinessUnit extends SupportPole {
  health: string;
  revenue: string;
  priority: number;
}

export interface Alert {
  text: string;
  severity: "high" | "medium" | "low";
  pole: string;
}

export interface MissionTemplate {
  label: string;
  prompt: string;
}

export interface HistoryEntry {
  date: string;
  title: string;
  tag: string;
  color: string;
}

export interface OverviewCard {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export interface DirectorResponse {
  diagnostic?: string;
  priorites?: string[];
  actionsParPole?: Record<string, string[]>;
  prochaineEtape?: string;
  error?: boolean;
  message?: string;
}

// ─── Support Poles ──────────────────────────────────

export const SUPPORT_POLES: SupportPole[] = [
  { id: "commercial", title: "Commercial", subtitle: "Prospection \u2022 Offres \u2022 Relances", status: "Actif", icon: Briefcase, color: "emerald", children: ["Leads", "RDV", "Closing"] },
  { id: "finance", title: "Finance & Admin", subtitle: "Cash \u2022 Facturation \u2022 Arbitrages", status: "En cours", icon: Wallet, color: "amber", children: ["Tr\u00e9sorerie", "Factures", "Pr\u00e9visions"] },
  { id: "rh", title: "RH & Coordination", subtitle: "Recrutement \u2022 \u00c9quipe \u2022 Suivi", status: "Veille", icon: Users, color: "sky", children: ["Recrutement", "Formation", "Planning"] },
  { id: "marketing", title: "Marketing & Com", subtitle: "Image \u2022 Campagnes \u2022 R\u00e9seaux", status: "En attente", icon: Megaphone, color: "fuchsia", children: ["Contenus", "Campagnes", "Visuels"] },
  { id: "qualite", title: "Qualit\u00e9 & Support", subtitle: "Contr\u00f4le \u2022 Suivi \u2022 Am\u00e9lioration", status: "En attente", icon: ShieldCheck, color: "cyan", children: ["Qualit\u00e9", "SAV", "Optimisation"] },
];

// ─── Business Units ─────────────────────────────────

export const BUSINESS_UNITS: BusinessUnit[] = [
  { id: "conciergerie", title: "Conciergerie", subtitle: "Logements \u2022 Planning \u2022 Incidents", status: "Actif", health: "Prioritaire", icon: KeyRound, color: "indigo", children: ["Check-in / check-out", "M\u00e9nage", "Maintenance", "Optimisation annonces"], revenue: "CA r\u00e9current", priority: 2 },
  { id: "app", title: "Blue Planet App", subtitle: "Articles \u2022 App \u2022 Publication", status: "En attente", health: "D\u00e9veloppement", icon: Smartphone, color: "sky", children: ["Articles", "Publication", "Offres partenaires", "Produit"], revenue: "Pr\u00e9-lancement", priority: 5 },
  { id: "beauty", title: "BLN Beauty", subtitle: "Onglerie \u2022 Cils \u2022 Recrutement", status: "En cours", health: "Lancement", icon: Sparkles, color: "pink", children: ["Prestataires", "Stand / lieux", "Mat\u00e9riel", "R\u00e9servations"], revenue: "\u00c0 valider", priority: 3 },
  { id: "pochettes", title: "Pochettes Surprises", subtitle: "Sourcing \u2022 Packaging \u2022 Vente", status: "Veille", health: "Test", icon: Gift, color: "orange", children: ["Produits", "Packaging", "Points de vente", "R\u00e9assort"], revenue: "Test", priority: 4 },
  { id: "peluches", title: "Machine \u00e0 Peluches", subtitle: "Emplacements \u2022 Rentabilit\u00e9", status: "Veille", health: "Exploration", icon: Gamepad2, color: "violet", children: ["Rep\u00e9rage", "N\u00e9gociation", "Maintenance", "Revenus"], revenue: "Exploration", priority: 6 },
  { id: "ia", title: "Agents IA B2B", subtitle: "Agents \u2022 Automatisation \u2022 Vente B2B", status: "Actif", health: "Fort potentiel", icon: Bot, color: "teal", children: ["Prospection IA", "Cadrage client", "Build n8n / API", "Maintenance"], revenue: "Forte marge", priority: 1 },
];

// ─── Tools ──────────────────────────────────────────

export const TOOLS: string[] = [
  "Claude", "OpenAI", "n8n", "Google Drive", "Gmail",
  "WhatsApp", "Google Sheets", "CRM", "Calendar", "Base clients",
];

// ─── Alerts (vide par d\u00e9faut \u2014 aliment\u00e9 par les donn\u00e9es r\u00e9elles) ───

export const ALERTS: Alert[] = [];

// ─── Mission Templates ──────────────────────────────

export const MISSION_TEMPLATES: MissionTemplate[] = [
  { label: "Plan de relance commerciale", prompt: "Pr\u00e9pare un plan de relance commerciale sur 7 jours avec les actions prioritaires, les prospects \u00e0 contacter et les messages \u00e0 envoyer." },
  { label: "Analyse cash 30 jours", prompt: "Analyse le cash disponible sur 30 jours, identifie les entr\u00e9es et sorties pr\u00e9vues, et propose des arbitrages financiers." },
  { label: "Urgences conciergerie", prompt: "Liste les urgences conciergerie de la semaine : incidents ouverts, logements \u00e0 pr\u00e9parer, annonces \u00e0 optimiser, probl\u00e8mes \u00e0 r\u00e9soudre." },
  { label: "D\u00e9veloppement BLN Beauty", prompt: "Propose un plan de lancement BLN Beauty : recrutement prestataires, choix du lieu test, premi\u00e8res actions commerciales." },
  { label: "Offre Agents IA B2B", prompt: "Structure une offre agent IA B2B claire et vendable : cas d\u2019usage, tarif, pitch, et s\u00e9quence de prospection." },
];

// ─── History (vide par d\u00e9faut \u2014 aliment\u00e9 par les sessions r\u00e9elles) ───

export const HISTORY: HistoryEntry[] = [];

// ─── Overview Cards ─────────────────────────────────

export const OVERVIEW_CARDS: OverviewCard[] = [
  { title: "Branches business", value: "6", icon: Layers, color: "indigo" },
  { title: "P\u00f4les transverses", value: "5", icon: Users, color: "sky" },
  { title: "Stack technique", value: "n8n + IA", icon: Zap, color: "emerald" },
  { title: "Pilotage", value: "Strat\u00e9gique", icon: Target, color: "violet" },
];

// ─── Pole Options (for mission toggles) ─────────────

export const ALL_POLE_OPTIONS: string[] = [
  "Commercial", "Finance & Admin", "RH & Coordination", "Marketing & Communication",
  "Qualit\u00e9 & Support", "Conciergerie", "App & Contenu", "BLN Beauty",
  "Pochettes Surprises", "Machines \u00e0 Peluches", "Agents IA B2B",
];

// ─── Default Mission ────────────────────────────────

export const DEFAULT_MISSION = "Analyse les urgences conciergerie, les priorit\u00e9s commerciales, le cash disponible, le d\u00e9veloppement BLN Beauty, les tests d\u2019offres sur les pochettes surprises, les opportunit\u00e9s de machines \u00e0 peluches et les prochains agents IA \u00e0 vendre aux entreprises.";
