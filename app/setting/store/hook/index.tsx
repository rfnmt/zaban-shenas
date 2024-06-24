import { useMutation } from "@tanstack/react-query";

import { studentAPI } from "../api";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

export const useStudentAPI = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return studentAPI(id).then(function (response) {
        queryClient.setQueryData(["student-data"], response.data);
      });
    },
  });
};
