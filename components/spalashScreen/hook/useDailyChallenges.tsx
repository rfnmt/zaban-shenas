import { useMutation } from "@tanstack/react-query";
import { dailyChallenge } from "../api";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

export const useDailyChallenges = () => {
  return useMutation({
    mutationKey: ["user-challenge"],
    mutationFn: () => {
      return dailyChallenge().then(function (response) {
        localStorage.setItem("challenges", JSON.stringify(response.data));
        if (response.data)
          queryClient.setQueryData(["user-challenge"], response.data);
        return response.data;
      });
    },
  });
};
