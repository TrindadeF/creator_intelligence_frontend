import { TrendingUp, Clock, AlertCircle, Lightbulb, Loader2 } from "lucide-react";
import type { Insight, InsightType } from "@/types";

const icons: Record<string, React.ReactNode> = {
  best_posting_time: <Clock      size={13} className="text-cyan-glow" />,
  format_performance:<TrendingUp size={13} className="text-emerald-glow" />,
  retention_drop:    <AlertCircle size={13} className="text-rose-glow" />,
  weak_hook:         <AlertCircle size={13} className="text-amber-glow" />,
  growth_opportunity:<TrendingUp size={13} className="text-cyan-glow" />,
  general:           <Lightbulb  size={13} className="text-ink-400" />,
};

// Stub shown when API returns no data yet
const STUBS: Insight[] = [
  { id: "s1", insight_type: "best_posting_time", severity: "info",    title: "Connect TikTok to get insights", description: "Once you connect your account, we'll analyse your data and generate personalised insights.", created_at: new Date().toISOString() },
];

interface Props {
  insights?: Insight[];
  loading?:  boolean;
}

export default function InsightFeed({ insights, loading }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={18} className="animate-spin text-ink-600" />
      </div>
    );
  }

  const items = insights && insights.length > 0 ? insights : STUBS;

  return (
    <div className="space-y-3">
      {items.map((insight) => (
        <div key={insight.id} className="flex gap-3 p-3 rounded-lg bg-bg-raised border border-border hover:border-border-focus transition-all duration-150 cursor-pointer group">
          <div className="mt-0.5 flex-shrink-0">
            {icons[insight.insight_type] ?? icons.general}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink-100 group-hover:text-cyan-glow transition-colors">{insight.title}</p>
            <p className="text-xs text-ink-400 mt-0.5 leading-relaxed">{insight.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
