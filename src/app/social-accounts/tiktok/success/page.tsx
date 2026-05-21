"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

function TikTokSuccessContent() {
  const router       = useRouter();
  const params       = useSearchParams();
  const queryClient  = useQueryClient();
  const accountId    = params.get("account_id");

  useEffect(() => {
    // Invalidate social accounts cache so dashboard re-fetches
    queryClient.invalidateQueries({ queryKey: ["social_accounts"] });
    const timer = setTimeout(() => router.replace("/settings"), 3000);
    return () => clearTimeout(timer);
  }, [queryClient, router]);

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center">
      <div className="card p-10 max-w-sm w-full text-center space-y-4">
        <div className="text-4xl">✅</div>
        <h1 className="font-display text-xl font-bold text-ink-50">TikTok Connected!</h1>
        <p className="text-sm text-ink-400">
          Your account has been linked successfully.
          {accountId && <span className="block text-xs text-ink-600 mt-1 font-mono">ID: {accountId}</span>}
        </p>
        <p className="text-xs text-ink-600">Redirecting to settings…</p>
      </div>
    </div>
  );
}

export default function TikTokSuccessPage() {
  return (
    <Suspense>
      <TikTokSuccessContent />
    </Suspense>
  );
}
