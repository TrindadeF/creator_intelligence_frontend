import VideosContent from "@/components/videos/VideosContent";

export default function VideosPage() {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink-50 tracking-tight">Videos</h1>
        <p className="mt-1 text-sm text-ink-400">All your TikTok content · performance breakdown</p>
      </div>
      <VideosContent />
    </div>
  );
}
