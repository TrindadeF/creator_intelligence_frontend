import MetricCard from "@/components/analytics/MetricCard";
import EngagementChart from "@/components/analytics/EngagementChart";
import InsightFeed from "@/components/analytics/InsightFeed";
import { TrendingUp, Eye, Heart, Share2, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-50 tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-ink-400">Last 30 days · TikTok</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Views"
          value="2.4M"
          change={+12.5}
          icon={<Eye size={16} />}
          accent="cyan"
          delay={0}
        />
        <MetricCard
          label="Engagement Rate"
          value="8.3%"
          change={+2.1}
          icon={<Heart size={16} />}
          accent="amber"
          delay={100}
        />
        <MetricCard
          label="Shares"
          value="48.2K"
          change={-3.4}
          icon={<Share2 size={16} />}
          accent="rose"
          delay={200}
        />
        <MetricCard
          label="Avg Watch Time"
          value="24s"
          change={+5.8}
          icon={<Clock size={16} />}
          accent="emerald"
          delay={300}
        />
      </div>

      {/* Charts row */}
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
          <InsightFeed />
        </div>
      </div>
    </div>
  );
}
