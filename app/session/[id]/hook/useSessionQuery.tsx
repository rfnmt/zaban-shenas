import { useQuery } from "@tanstack/react-query";

import { getSessionData } from "../api";

export const useSessionQuery = (id: number) => {
  return useQuery({
    queryKey: ["session", id],
    enabled: false,
    queryFn: ({ signal }) => {
      if (id)
        return getSessionData({ id, signal })
          .then(function (response) {
            return response?.data;
          })
          .catch(function (error) {
            throw new Error(error);
          });
    },
  });
};
