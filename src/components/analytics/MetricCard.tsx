"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Accent = "cyan" | "amber" | "rose" | "emerald";

interface MetricCardProps {
  label:   string;
  value:   string;
  change:  number;
  icon:    React.ReactNode;
  accent:  Accent;
  delay?:  number;
}

const accentMap: Record<Accent, { text: string; bg: string; border: string; glow: string }> = {
  cyan:    { text: "text-cyan-glow",    bg: "bg-cyan-glow/10",    border: "border-cyan-glow/20",    glow: "shadow-glow-cyan" },
  amber:   { text: "text-amber-glow",   bg: "bg-amber-glow/10",   border: "border-amber-glow/20",   glow: "shadow-glow-amber" },
  rose:    { text: "text-rose-glow",    bg: "bg-rose-glow/10",    border: "border-rose-glow/20",    glow: "shadow-glow-rose" },
  emerald: { text: "text-emerald-glow", bg: "bg-emerald-glow/10", border: "border-emerald-glow/20", glow: "shadow-glow-cyan" },
};

export default function MetricCard({ label, value, change, icon, accent, delay = 0 }: MetricCardProps) {
  const a = accentMap[accent];
  const positive = change >= 0;

  return (
    <div
      className="card p-5 animate-slide-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="label">{label}</span>
        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center border", a.bg, a.border, a.text)}>
          {icon}
        </div>
      </div>

      <div className="metric-number text-ink-50">{value}</div>

      <div className={cn("mt-2 flex items-center gap-1 text-xs font-mono", positive ? "text-emerald-glow" : "text-rose-glow")}>
        {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        <span>{positive ? "+" : ""}{change}%</span>
        <span className="text-ink-600 ml-1">vs last month</span>
      </div>
    </div>
  );
}
