"use client";

import { Bell, RefreshCw } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-bg-surface flex-shrink-0">
      <div className="flex items-center gap-2">
        <span className="label text-[10px] tracking-[0.2em]">Last sync</span>
        <span className="font-mono text-[11px] text-ink-400">2 min ago</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink-400 hover:text-cyan-glow hover:border-cyan-glow/40 transition-all duration-150">
          <RefreshCw size={14} />
        </button>
        <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink-400 hover:text-cyan-glow hover:border-cyan-glow/40 transition-all duration-150 relative">
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-glow" />
        </button>
      </div>
    </header>
  );
}
