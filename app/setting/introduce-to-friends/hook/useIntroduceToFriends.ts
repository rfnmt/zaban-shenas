import { useQuery } from "@tanstack/react-query";

import { getIntroduceingToFriends } from "../api";

export const useItroduceToFriends = () => {
  return useQuery({
    queryKey: ["introduce-to-friends-data"],
    queryFn: () => {
      return getIntroduceingToFriends()
        .then((res) => res)
        .catch((err) => {
          throw new Error(err);
        });
    },
  });
};
