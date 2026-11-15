import { isPlaylistId } from "@/lib/player-state";

/**
 * URL aplikasi.
 *
 * Menu (Home, Songs, Albums, Artists, Library, Queue, detail album/artist/
 * playlist) sengaja TIDAK punya route sendiri: semuanya hidup di `/` sebagai
 * SPA. Pindah menu hanya mengubah state, jadi tidak ada fetch RSC, tidak ada
 * remount halaman, dan player tidak pernah terputus.
 *
 * `/room` tetap jadi route nyata satu-satunya karena dipakai sebagai link share
 * "Listen Together" (`/room?room=CODE`) yang bisa dibuka langsung/refresh.
 */
export const ROUTES = {
  home: "/",
  room: "/room",
} as const;

/** Link share room. `origin` opsional supaya hasilnya URL absolut saat dipakai di browser. */
export function roomLink(code: string, origin = ""): string {
  return `${origin}${ROUTES.room}?room=${encodeURIComponent(code)}`;
}

/** Samakan id playlist dari URL/state. UUID selalu huruf kecil; id lama dibiarkan
 *  apa adanya agar tetap cocok dengan data tersimpan (lookup case-insensitive). */
export function normalizePlaylistId(id: string): string {
  const trimmed = id.trim();
  return isPlaylistId(trimmed) ? trimmed.toLowerCase() : trimmed;
}
