"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAnalyticsTrends, useOverviewAnalytics } from "@/hooks/useAnalytics";
import { formatNumber, formatDateShort } from "@/lib/format";

// ── Types ──────────────────────────────────────────────────────────────────

interface TrendPoint {
  date: string;
  views: number;
  engagement_rate?: number;
  likes?: number;
}

interface TopVideo {
  id: string;
  title: string;
  views: number;
  likes: number;
  engagement_rate: number;
  published_at: string;
}

// ── Tooltip ────────────────────────────────────────────────────────────────

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-overlay border border-border rounded-lg px-3 py-2.5 shadow-card text-xs">
      <p className="text-ink-400 mb-2 font-mono">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-mono text-ink-100" style={{ color: p.color }}>
          {p.name}:{" "}
          <span className="font-semibold">
            {p.name === "Engagement %" ? `${p.value.toFixed(2)}%` : formatNumber(p.value)}
          </span>
        </p>
      ))}
    </div>
  );
};

// ── Metric Pill ────────────────────────────────────────────────────────────

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="card px-4 py-3 flex flex-col gap-0.5">
      <span className="text-[10px] text-ink-500 uppercase tracking-wider">{label}</span>
      <span className="text-xl font-mono font-bold text-ink-100">{value}</span>
    </div>
  );
}

// ── Period Selector ────────────────────────────────────────────────────────

const PERIODS = [
  { label: "7d",  days: 7  },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

// ── Main Component ─────────────────────────────────────────────────────────

export default function AnalyticsContent() {
  const [period, setPeriod] = useState(30);

  const { data: overviewData, isLoading: overviewLoading } = useOverviewAnalytics();
  const { data: trendsData,   isLoading: trendsLoading   } = useAnalyticsTrends();

  const summary    = overviewData?.data?.summary    ?? {};
  const growth     = overviewData?.data?.growth     ?? {};
  const topVideos: TopVideo[] = overviewData?.data?.top_videos ?? [];
  const trends: TrendPoint[]  = trendsData?.data?.trends ?? [];

  // Filter trends by period if timestamps are available
  const filteredTrends = trends.slice(-period);

  const hasData = filteredTrends.length > 0;

  if (overviewLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-4 h-20 animate-pulse bg-bg-overlay" />
          ))}
        </div>
        <div className="card h-64 animate-pulse bg-bg-overlay" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex items-center gap-2">
        {PERIODS.map(({ label, days }) => (
          <button
            key={days}
            onClick={() => setPeriod(days)}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              period === days
                ? "bg-cyan-glow text-bg-base font-semibold"
                : "text-ink-400 hover:text-ink-200 border border-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Summary pills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricPill label="Total Views"    value={formatNumber(summary.total_views ?? 0)} />
        <MetricPill label="Total Likes"    value={formatNumber(summary.total_likes ?? 0)} />
        <MetricPill label="Avg Engagement" value={`${(summary.avg_engagement_rate ?? 0).toFixed(2)}%`} />
        <MetricPill
          label="Views Growth"
          value={`${growth.views_growth_percent > 0 ? "+" : ""}${(growth.views_growth_percent ?? 0).toFixed(1)}%`}
        />
      </div>

      {/* Views Trend Chart */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-ink-200 mb-4">Views over time</h2>
        {!hasData ? (
          <div className="h-52 flex items-center justify-center">
            <p className="text-xs text-ink-600">No trend data yet — sync your TikTok account to start collecting.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={filteredTrends} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gradViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#00d4ff" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#22222e" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#52525b", fontFamily: "var(--font-mono)" }}
                tickFormatter={(v) => formatDateShort(v)}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#52525b", fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#3a3a50", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="views"
                name="Views"
                stroke="#00d4ff"
                strokeWidth={2}
                fill="url(#gradViews)"
                dot={false}
                activeDot={{ r: 4, fill: "#00d4ff", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Engagement Rate Chart */}
      {hasData && (
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-ink-200 mb-4">Engagement rate (%)</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={filteredTrends} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#22222e" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#52525b", fontFamily: "var(--font-mono)" }}
                tickFormatter={(v) => formatDateShort(v)}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#52525b", fontFamily: "var(--font-mono)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar
                dataKey="engagement_rate"
                name="Engagement %"
                fill="#a78bfa"
                radius={[3, 3, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top Videos table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-ink-200">Top performing videos</h2>
        </div>
        {topVideos.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-xs text-ink-600">No video data yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-bg-overlay/30">
                  {["Video", "Published", "Views", "Likes", "Engagement"].map((h) => (
                    <th
                      key={h}
                      className={`py-2.5 px-4 text-[10px] uppercase tracking-wider text-ink-500 ${
                        h === "Video" ? "text-left" : "text-right"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topVideos.map((v) => (
                  <tr key={v.id} className="border-b border-border hover:bg-bg-overlay/40 transition-colors">
                    <td className="py-3 px-4 text-sm text-ink-200 max-w-[240px] truncate">{v.title || "Untitled"}</td>
                    <td className="py-3 px-4 text-right text-xs text-ink-400 font-mono">{formatDateShort(v.published_at)}</td>
                    <td className="py-3 px-4 text-right text-xs text-ink-200 font-mono">{formatNumber(v.views)}</td>
                    <td className="py-3 px-4 text-right text-xs text-ink-200 font-mono">{formatNumber(v.likes)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-xs font-mono text-violet-400">
                        {(v.engagement_rate ?? 0).toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
