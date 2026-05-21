import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { creatorApi, authApi } from "@/lib/api";
import { clearTokens, isAuthenticated } from "@/lib/auth";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn:  creatorApi.me,
    enabled:  isAuthenticated(),
    retry:    false,
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearTokens();
      qc.clear();
      window.location.href = "/login";
    },
    onError: () => {
      // Even on error, clear local tokens and redirect
      clearTokens();
      qc.clear();
      window.location.href = "/login";
    },
  });
}
