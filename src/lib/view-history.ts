import type { TabId } from "@/lib/player-state";

export interface ViewHistoryState {
  tab: TabId;
  search?: string;
  entityId?: string;
}

/**
 * Next.js menyimpan state router-nya sendiri di `window.history.state`.
 * State aplikasi kita disimpan di properti `ngeplay` dan selalu di-merge,
 * supaya history Next tidak rusak.
 */
export function readViewHistory(state: unknown): ViewHistoryState | null {
  if (!state || typeof state !== "object") return null;
  const view = (state as { ngeplay?: unknown }).ngeplay;
  if (!view || typeof view !== "object") return null;
  const v = view as Record<string, unknown>;
  if (typeof v.tab !== "string") return null;
  return {
    tab: v.tab as ViewHistoryState["tab"],
    search: typeof v.search === "string" ? v.search : undefined,
    entityId: typeof v.entityId === "string" ? v.entityId : undefined,
  };
}

export function mergeViewHistory(
  current: unknown,
  view: ViewHistoryState
): Record<string, unknown> {
  const base =
    current && typeof current === "object" ? (current as Record<string, unknown>) : {};
  return { ...base, ngeplay: view };
}

export function writeViewHistory(
  view: ViewHistoryState,
  url: string,
  mode: "push" | "replace" = "push"
): void {
  if (typeof window === "undefined") return;
  const state = mergeViewHistory(window.history.state, view);
  if (mode === "replace") window.history.replaceState(state, "", url);
  else window.history.pushState(state, "", url);
}
