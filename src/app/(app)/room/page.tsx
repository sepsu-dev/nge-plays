import { MainContent } from "@/app/(app)/_components/main-content";

/**
 * Deep link Listen Together (`/room?room=CODE`).
 *
 * Satu-satunya route selain `/`. Konten tetap SPA yang sama — AppShell mendeteksi
 * pathname `/room` lalu membuka modal room, sehingga pindah menu tidak pernah
 * melewati navigasi Next.
 */
export default function RoomPage() {
  return <MainContent />;
}
