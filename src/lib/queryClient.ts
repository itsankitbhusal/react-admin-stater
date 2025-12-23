import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: attempt =>
        Math.min(1000 * 2 ** attempt, 30_000),

      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,

      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,

      throwOnError: false,
    },
    mutations: {
      retry: 0,
    },
  },
})
