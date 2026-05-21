import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "@/lib/api";

export function useOverviewAnalytics() {
  return useQuery({
    queryKey: ["analytics", "overview"],
    queryFn:  analyticsApi.overview,
  });
}

export function useVideoAnalytics(videoId: string) {
  return useQuery({
    queryKey: ["analytics", "video", videoId],
    queryFn:  () => analyticsApi.video(videoId),
    enabled:  !!videoId,
  });
}

export function useAnalyticsTrends() {
  return useQuery({
    queryKey: ["analytics", "trends"],
    queryFn:  analyticsApi.trends,
  });
}
