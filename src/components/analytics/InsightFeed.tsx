import { TrendingUp, Clock, AlertCircle, Lightbulb } from "lucide-react";

type InsightType = "best_time" | "format" | "drop" | "tip";

interface Insight {
  id:    string;
  type:  InsightType;
  title: string;
  desc:  string;
}

const stub: Insight[] = [
  { id: "1", type: "best_time", title: "Post at 7–9 PM",       desc: "Your audience is 2.4× more active in the evenings." },
  { id: "2", type: "format",    title: "Short clips win",       desc: "Videos under 30s have 40% higher completion rate." },
  { id: "3", type: "drop",      title: "Retention drop at 15s", desc: "Most viewers leave before the 15-second mark." },
  { id: "4", type: "tip",       title: "Try trending sounds",   desc: "Sound-matched videos get 3× more shares lately." },
];

const icons: Record<InsightType, React.ReactNode> = {
  best_time: <Clock     size={13} className="text-cyan-glow" />,
  format:    <TrendingUp size={13} className="text-emerald-glow" />,
  drop:      <AlertCircle size={13} className="text-rose-glow" />,
  tip:       <Lightbulb  size={13} className="text-amber-glow" />,
};

export default function InsightFeed() {
  return (
    <div className="space-y-3">
      {stub.map((insight) => (
        <div key={insight.id} className="flex gap-3 p-3 rounded-lg bg-bg-raised border border-border hover:border-border-focus transition-all duration-150 cursor-pointer group">
          <div className="mt-0.5 flex-shrink-0">
            {icons[insight.type]}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink-100 group-hover:text-cyan-glow transition-colors">{insight.title}</p>
            <p className="text-xs text-ink-400 mt-0.5 leading-relaxed">{insight.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
