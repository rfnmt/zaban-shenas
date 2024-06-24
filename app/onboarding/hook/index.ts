import { useQuery } from "@tanstack/react-query";

import { getOnboardingData } from "../api";

export const useOnboardingData = () => {
  return useQuery({
    queryKey: ["onboarding"],
    queryFn: () => {
      return getOnboardingData().then(function (response) {
        return response.data;
      });
    },
  });
};
