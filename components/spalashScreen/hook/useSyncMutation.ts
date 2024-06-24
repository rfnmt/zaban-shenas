import { useMutation } from "@tanstack/react-query";

import { getSyncData } from "../api";
import { ISyncSchema } from "@/providers/Dexie/sync.interface";
import { pushDataToSyncDatabase } from "@/providers/Dexie";
import { removeAllHasUpdateTrue } from "@/providers/Dexie/helpers";
import { generateLog } from "@/modules/helper";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

const defaultValues = {
  lessons: [],
  courses: [],
  sessions: [],
  experiences: [],
  questions: [],
  version: -1,
};

export const useSyncMutation = () => {
  return useMutation({
    retry: false,
    // mutationKey: ["sync-clinet-only-has-update-records"],
    mutationFn: (data) => {
      generateLog(`start sync:`, `params: ${JSON.stringify(data)}`);

      let preparedData =
        <ISyncSchema>(
          queryClient.getQueryData(["sync-clinet-only-has-update-records"])
        ) || defaultValues;

      if (data) {
        preparedData = data;
      }

      return getSyncData(preparedData)
        .then(function (response) {
          generateLog(
            `sync success:`,
            `params: ${JSON.stringify(response.data)}`
          );

          return pushDataToSyncDatabase(response.data).then(function () {
            return removeAllHasUpdateTrue(preparedData);
          });
        })
        .catch(function (error) {
          generateLog(`sync fail:`, `params: ${JSON.stringify(error)}`);

          throw new Error(error);
        });
    },
  });
};
