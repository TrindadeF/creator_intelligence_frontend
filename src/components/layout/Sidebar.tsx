"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video, BarChart2, Lightbulb, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard",  label: "Overview",  icon: LayoutDashboard },
  { href: "/videos",     label: "Videos",    icon: Video },
  { href: "/analytics",  label: "Analytics", icon: BarChart2 },
  { href: "/insights",   label: "Insights",  icon: Lightbulb },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 bg-bg-surface border-r border-border flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-glow/10 border border-cyan-glow/20 flex items-center justify-center">
            <Zap size={14} className="text-cyan-glow" />
          </div>
          <div>
            <span className="font-display text-sm font-bold text-ink-50 tracking-tight">Creator</span>
            <span className="font-display text-sm font-bold text-cyan-glow tracking-tight"> IQ</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="label px-3 mb-3">Navigation</p>
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "sidebar-item",
              pathname === href || pathname.startsWith(href + "/") ? "active" : ""
            )}
          >
            <Icon size={16} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-border">
        <Link href="/settings" className="sidebar-item">
          <Settings size={16} />
          <span>Settings</span>
        </Link>

        {/* Account stub */}
        <div className="mt-3 px-3 py-2.5 rounded-lg bg-bg-raised border border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-cyan-glow/20 flex items-center justify-center text-xs font-mono font-bold text-cyan-glow">
              C
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink-100 truncate">Creator</p>
              <p className="text-xs text-ink-600 truncate">TikTok account</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
