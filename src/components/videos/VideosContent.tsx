"use client";

import { useState } from "react";
import Image from "next/image";
import { useVideos } from "@/hooks/useVideos";
import { useVideoAnalytics } from "@/hooks/useAnalytics";
import { Video } from "@/types";
import { formatNumber, formatDuration, formatDateShort } from "@/lib/format";

// ── Video Row ──────────────────────────────────────────────────────────────

function VideoRow({ video, onSelect }: { video: Video; onSelect: (v: Video) => void }) {
  return (
    <tr
      className="border-b border-border hover:bg-bg-overlay/40 cursor-pointer transition-colors"
      onClick={() => onSelect(video)}
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {video.thumbnail_url ? (
            <div className="relative w-12 h-[68px] rounded overflow-hidden flex-shrink-0 bg-bg-overlay">
              <Image
                src={video.thumbnail_url}
                alt={video.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-12 h-[68px] rounded bg-bg-overlay flex items-center justify-center flex-shrink-0">
              <span className="text-ink-600 text-xs">▶</span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm text-ink-100 font-medium truncate max-w-[280px]">{video.title || "Untitled"}</p>
            <p className="text-xs text-ink-500 mt-0.5">{formatDateShort(video.published_at)}</p>
            {video.hashtags && video.hashtags.length > 0 && (
              <div className="flex gap-1 mt-1 flex-wrap">
                {video.hashtags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] text-cyan-glow/70 font-mono">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-right font-mono text-xs text-ink-300">
        {video.duration_seconds ? formatDuration(video.duration_seconds) : "—"}
      </td>
      <td className="py-3 px-4 text-right">
        <span className="inline-flex items-center gap-1 text-xs font-mono text-cyan-glow">
          ▶ Live
        </span>
      </td>
    </tr>
  );
}

// ── Video Detail Drawer ────────────────────────────────────────────────────

function VideoDrawer({ video, onClose }: { video: Video; onClose: () => void }) {
  const { data, isLoading } = useVideoAnalytics(video.id);
  const analytics = data?.data;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="relative w-full max-w-md h-full bg-bg-card border-l border-border shadow-2xl overflow-y-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-bg-card border-b border-border px-6 py-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-ink-100 leading-snug line-clamp-2">
              {video.title || "Untitled"}
            </h2>
            <p className="text-xs text-ink-500 mt-1">{formatDateShort(video.published_at)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-ink-500 hover:text-ink-200 transition-colors text-lg leading-none flex-shrink-0 mt-0.5"
          >
            ✕
          </button>
        </div>

        {/* Thumbnail */}
        {video.thumbnail_url && (
          <div className="relative w-full aspect-[9/16] max-h-64 overflow-hidden bg-bg-overlay">
            <Image src={video.thumbnail_url} alt={video.title} fill className="object-cover" unoptimized />
          </div>
        )}

        {/* Stats */}
        <div className="px-6 py-5">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-bg-overlay rounded animate-pulse" />
              ))}
            </div>
          ) : analytics ? (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Views",          value: formatNumber(analytics.views) },
                { label: "Likes",          value: formatNumber(analytics.likes) },
                { label: "Comments",       value: formatNumber(analytics.comments) },
                { label: "Shares",         value: formatNumber(analytics.shares) },
                { label: "Saves",          value: formatNumber(analytics.saves) },
                { label: "Engagement",     value: `${analytics.engagement_rate?.toFixed(2)}%` },
                { label: "Completion",     value: `${analytics.completion_rate?.toFixed(1)}%` },
                { label: "Avg Watch Time", value: formatDuration(analytics.avg_watch_time) },
              ].map(({ label, value }) => (
                <div key={label} className="card p-3">
                  <p className="text-[10px] text-ink-500 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-base font-mono font-semibold text-ink-100">{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-600 text-center py-8">No analytics collected yet.</p>
          )}

          {/* Hashtags */}
          {video.hashtags && video.hashtags.length > 0 && (
            <div className="mt-5">
              <p className="text-xs text-ink-500 uppercase tracking-wider mb-2">Hashtags</p>
              <div className="flex flex-wrap gap-2">
                {video.hashtags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-cyan-glow bg-cyan-glow/10 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function VideosContent() {
  const [page, setPage]           = useState(1);
  const [selected, setSelected]   = useState<Video | null>(null);
  const { data, isLoading, error } = useVideos(page);

  const videos: Video[]  = data?.data ?? [];
  const meta             = data?.meta ?? {};
  const totalPages       = meta.total_pages ?? 1;
  const totalCount       = meta.total_count ?? videos.length;

  if (isLoading) {
    return (
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="h-4 w-32 bg-bg-overlay rounded animate-pulse" />
        </div>
        <div className="divide-y divide-border">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <div className="w-12 h-[68px] rounded bg-bg-overlay animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-bg-overlay rounded animate-pulse w-3/4" />
                <div className="h-3 bg-bg-overlay rounded animate-pulse w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-12 flex items-center justify-center">
        <p className="text-sm text-red-400">Failed to load videos. Check your API connection.</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="card p-16 flex flex-col items-center justify-center gap-4 text-center">
        <div className="text-4xl opacity-30">🎬</div>
        <div>
          <p className="text-sm font-medium text-ink-300">No videos yet</p>
          <p className="text-xs text-ink-600 mt-1">Connect your TikTok account and sync to see your videos here.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card overflow-hidden">
        {/* Table header */}
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-xs text-ink-500 font-mono">{totalCount} videos</span>
          <span className="text-xs text-ink-600">Click a row to see stats</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg-overlay/30">
                <th className="text-left py-2.5 px-4 text-[10px] uppercase tracking-wider text-ink-500">Video</th>
                <th className="text-right py-2.5 px-4 text-[10px] uppercase tracking-wider text-ink-500">Duration</th>
                <th className="text-right py-2.5 px-4 text-[10px] uppercase tracking-wider text-ink-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <VideoRow key={video.id} video={video} onSelect={setSelected} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="text-xs text-ink-400 disabled:opacity-30 hover:text-ink-100 transition-colors font-mono"
            >
              ← Prev
            </button>
            <span className="text-xs text-ink-600 font-mono">
              {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="text-xs text-ink-400 disabled:opacity-30 hover:text-ink-100 transition-colors font-mono"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && <VideoDrawer video={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
