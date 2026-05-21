"use client";

import { Eye, Heart, Share2, Clock, TrendingUp } from "lucide-react";
import MetricCard from "./MetricCard";
import EngagementChart from "./EngagementChart";
import InsightFeed from "./InsightFeed";
import { useOverviewAnalytics } from "@/hooks/useAnalytics";
import { useInsights } from "@/hooks/useInsights";
import { useMe } from "@/hooks/useAuth";
import { formatNumber, formatDuration } from "@/lib/format";

export default function DashboardOverview() {
  const { data: overview, isLoading: loadingOverview } = useOverviewAnalytics();
  const { data: insightsData, isLoading: loadingInsights } = useInsights();
  const { data: me } = useMe();

  const metrics = overview?.data ?? null;
  const summary = metrics?.summary ?? null;
  const growth  = metrics?.growth  ?? null;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-50 tracking-tight">
          Overview{me?.data?.name ? `, ${(me.data as { name: string }).name.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-1 text-sm text-ink-400">Last 30 days · TikTok</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Views"
          value={loadingOverview ? "—" : formatNumber(summary?.total_views ?? 0)}
          change={growth?.views_growth_percent ?? 0}
          icon={<Eye size={16} />}
          accent="cyan"
          delay={0}
        />
        <MetricCard
          label="Engagement Rate"
          value={loadingOverview ? "—" : `${(summary?.avg_engagement_rate ?? 0).toFixed(1)}%`}
          change={0}
          icon={<Heart size={16} />}
          accent="amber"
          delay={100}
        />
        <MetricCard
          label="Shares"
          value={loadingOverview ? "—" : formatNumber(summary?.total_shares ?? 0)}
          change={0}
          icon={<Share2 size={16} />}
          accent="rose"
          delay={200}
        />
        <MetricCard
          label="Total Videos"
          value={loadingOverview ? "—" : String(summary?.total_videos ?? 0)}
          change={0}
          icon={<Clock size={16} />}
          accent="emerald"
          delay={300}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-ink-100">Engagement Trend</h2>
              <p className="text-xs text-ink-400 mt-0.5">Views & engagement over time</p>
            </div>
            <TrendingUp size={16} className="text-cyan-glow" />
          </div>
          <EngagementChart />
        </div>

        <div className="card p-6">
          <h2 className="text-sm font-semibold text-ink-100 mb-4">AI Insights</h2>
          <InsightFeed
            insights={insightsData?.data ?? []}
            loading={loadingInsights}
          />
        </div>
      </div>
    </div>
  );
}
