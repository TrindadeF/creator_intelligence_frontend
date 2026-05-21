"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Stub data — replaced by real API data via React Query
const data = [
  { date: "Jun 1",  views: 12000, engagement: 5.2 },
  { date: "Jun 5",  views: 18000, engagement: 6.1 },
  { date: "Jun 10", views: 15000, engagement: 5.8 },
  { date: "Jun 15", views: 34000, engagement: 8.9 },
  { date: "Jun 20", views: 28000, engagement: 7.4 },
  { date: "Jun 25", views: 42000, engagement: 9.2 },
  { date: "Jun 30", views: 38000, engagement: 8.3 },
];

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-overlay border border-border rounded-lg px-3 py-2.5 shadow-card text-xs">
      <p className="label mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-mono text-ink-100">
          {p.name}: <span className="text-cyan-glow">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

export default function EngagementChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#00d4ff" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#22222e" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: "#52525b", fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#52525b", fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#3a3a50", strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="views"
          stroke="#00d4ff"
          strokeWidth={2}
          fill="url(#gradCyan)"
          dot={false}
          activeDot={{ r: 4, fill: "#00d4ff", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
