"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      gcTime: 86400000,
      // staleTime: 86400000,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // cacheTime: 1 * 60 * 60 * 1000,
      // staleTime: 1 * 60 * 60 * 1000,
      // staleTime: Infinity,
      // retry: 1,
      // refetchInterval: 1 * 60 * 60 * 1000,
    },
  },
});

type Props = {
  children: React.ReactNode;
};

const ReactQueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default ReactQueryWrapper;
