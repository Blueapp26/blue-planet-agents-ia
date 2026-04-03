import type { DirectorResponse } from "../constants/data";

// ─── Configuration ──────────────────────────────────
// En production, utiliser import.meta.env.VITE_N8N_WEBHOOK_URL
// Fallback sur la valeur par défaut si la variable n'est pas définie.

const WEBHOOK_URL: string =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_N8N_WEBHOOK_URL) ||
  "https://blueplanet.app.n8n.cloud/webhook/directeur-ia-analyse";

const REQUEST_TIMEOUT_MS = 30_000;

// ─── API Service ────────────────────────────────────

export async function runDirectorAnalysis(
  mission: string,
  selectedPoles: string[],
): Promise<DirectorResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mission, selectedPoles }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data: DirectorResponse = await response.json();

    if (data.error) {
      throw new Error(data.message || "Erreur côté workflow.");
    }

    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(`Timeout : pas de réponse après ${REQUEST_TIMEOUT_MS / 1000}s.`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
