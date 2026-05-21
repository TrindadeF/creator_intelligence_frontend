"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function TikTokErrorContent() {
  const params  = useSearchParams();
  const router  = useRouter();
  const message = params.get("message") ?? "Connection failed";

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center">
      <div className="card p-10 max-w-sm w-full text-center space-y-4">
        <div className="text-4xl">❌</div>
        <h1 className="font-display text-xl font-bold text-ink-50">Connection Failed</h1>
        <p className="text-sm text-ink-400">{decodeURIComponent(message)}</p>
        <button
          onClick={() => router.replace("/settings")}
          className="w-full py-2.5 rounded-lg bg-cyan-glow text-bg-base text-sm font-semibold hover:bg-cyan-glow/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function TikTokErrorPage() {
  return (
    <Suspense>
      <TikTokErrorContent />
    </Suspense>
  );
}
