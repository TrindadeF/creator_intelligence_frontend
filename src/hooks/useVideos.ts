import { useQuery } from "@tanstack/react-query";
import { videosApi } from "@/lib/api";

export function useVideos(page = 1) {
  return useQuery({
    queryKey: ["videos", page],
    queryFn:  () => videosApi.list(page),
  });
}

export function useVideo(id: string) {
  return useQuery({
    queryKey: ["videos", id],
    queryFn:  () => videosApi.show(id),
    enabled:  !!id,
  });
}
