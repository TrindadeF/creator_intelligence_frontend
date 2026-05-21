import AnalyticsContent from "@/components/analytics/AnalyticsContent";

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink-50 tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-ink-400">Deep-dive into your performance metrics</p>
      </div>
      <AnalyticsContent />
    </div>
  );
}
