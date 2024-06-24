import { useQuery } from "@tanstack/react-query";

import { getTipData } from "../api";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

export const useTipQuery = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["tip", id],
    queryFn: ({ signal }) => {
      if (id)
        return getTipData({ id, signal })
          .then(function (response) {
            // queryClient.setQueryData(["tip", id], response?.data);
            return response?.data;
          })
          .catch(function (error) {
            throw new Error(error);
          });
    },
  });
};
