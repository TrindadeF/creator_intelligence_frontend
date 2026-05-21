"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { socialApi } from "@/lib/api";
import api from "@/lib/api";
import { SocialAccount } from "@/types";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.16 8.16 0 004.77 1.52V7.08a4.85 4.85 0 01-1-.39z" />
    </svg>
  );
}

export default function TikTokConnect() {
  const queryClient = useQueryClient();
  const [connecting, setConnecting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["social_accounts"],
    queryFn: socialApi.list,
  });

  const accounts: SocialAccount[] = data?.data ?? [];
  const tiktokAccount = accounts.find((a) => a.provider === "tiktok");

  const disconnectMutation = useMutation({
    mutationFn: () => api.delete("/auth/tiktok/disconnect"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["social_accounts"] }),
  });

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const { data } = await api.get("/auth/tiktok/connect");
      const url = data?.data?.authorization_url;
      if (url) window.location.href = url;
    } catch {
      setConnecting(false);
    }
  };

  if (isLoading) {
    return <div className="card p-4 h-20 animate-pulse bg-bg-overlay" />;
  }

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-bg-overlay flex items-center justify-center text-ink-200">
            <TikTokIcon />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-100">TikTok</p>
            {tiktokAccount ? (
              <p className="text-xs text-green-400 mt-0.5">
                Connected as @{tiktokAccount.username}
              </p>
            ) : (
              <p className="text-xs text-ink-500 mt-0.5">Not connected</p>
            )}
          </div>
        </div>

        {tiktokAccount ? (
          <button
            onClick={() => disconnectMutation.mutate()}
            disabled={disconnectMutation.isPending}
            className="text-xs text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-400/60 px-3 py-1.5 rounded transition-all disabled:opacity-50"
          >
            {disconnectMutation.isPending ? "Disconnecting…" : "Disconnect"}
          </button>
        ) : (
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="flex items-center gap-2 text-xs font-semibold bg-cyan-glow text-bg-base px-4 py-2 rounded-lg hover:bg-cyan-glow/90 transition-colors disabled:opacity-50"
          >
            {connecting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-bg-base/30 border-t-bg-base rounded-full animate-spin" />
                Connecting…
              </>
            ) : (
              <>
                <TikTokIcon />
                Connect TikTok
              </>
            )}
          </button>
        )}
      </div>

      {tiktokAccount && (
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-ink-500">Connected</p>
            <p className="text-ink-300 font-mono mt-0.5">
              {new Date(tiktokAccount.connected_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-ink-500">Provider ID</p>
            <p className="text-ink-300 font-mono mt-0.5 truncate">{tiktokAccount.id}</p>
          </div>
        </div>
      )}
    </div>
  );
}
