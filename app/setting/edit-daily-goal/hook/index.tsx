import { useMutation } from "@tanstack/react-query";

import { getInitialData, settingDailyGoal } from "../api";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

export const useSettingDailyGoal = () => {
  return useMutation({
    mutationFn: (data: any | undefined) => {
      return settingDailyGoal(data)
        .then((res) => {
          queryClient.setQueryData(["setting-daily-goal"], res.data);
        })
        .catch((error) => {
          console.error({ error });
        });
    },
  });
};

export const useGetInitilaData = () => {
  return useMutation({
    mutationFn: (data: any | undefined) => {
      return getInitialData(data)
        .then((res) => {
          queryClient.setQueryData(["user-initial-data"], res.data);
        })
        .catch((error) => {});
    },
  });
};
