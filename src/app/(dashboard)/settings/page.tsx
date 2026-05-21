import TikTokConnect from "@/components/social/TikTokConnect";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink-50 tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-ink-400">Manage your connected accounts and preferences</p>
      </div>

      <section>
        <h2 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">
          Connected Accounts
        </h2>
        <TikTokConnect />
      </section>
    </div>
  );
}
