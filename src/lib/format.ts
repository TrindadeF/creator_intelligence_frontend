/** Format big numbers: 2400000 → 2.4M, 48200 → 48.2K */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

/** Format seconds to human duration: 90 → 1m 30s, 30 → 30s */
export function formatDuration(seconds: number): string {
  const s = Math.round(seconds);
  if (s >= 60) return `${Math.floor(s / 60)}m ${s % 60}s`;
  return `${s}s`;
}

/** Format ISO date string to readable: "2024-06-15T..." → "Jun 15" */
export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
