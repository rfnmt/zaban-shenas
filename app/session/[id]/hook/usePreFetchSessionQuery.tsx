"use client";

import { useQuery } from "@tanstack/react-query";

import { getSessionData } from "../api";

export const usePrefetchSessionQuery = (id: number) => {
  return useQuery({
    enabled: false,
    refetchOnMount: false,
    queryKey: ["session", id],
    queryFn: ({ signal }) => {
      if (id)
        return getSessionData({ id, signal })
          .then(function (response) {
            return response?.data;
          })
          .catch(function (error) {
            throw new Error(error);
          });
      return;
    },
  });
};
