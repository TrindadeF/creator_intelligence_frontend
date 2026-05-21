import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { insightsApi } from "@/lib/api";

export function useInsights() {
  return useQuery({
    queryKey: ["insights"],
    queryFn:  insightsApi.list,
  });
}
