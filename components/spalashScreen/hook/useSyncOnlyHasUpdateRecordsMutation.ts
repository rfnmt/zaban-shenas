import { useQuery } from "@tanstack/react-query";

import { prepaireSyncDatabaseForSyncApi } from "@/providers/Dexie";
import { ISyncSchema } from "@/providers/Dexie/sync.interface";

export const useSyncOnlyHasUpdateRecordsMutation = () => {
  return useQuery<ISyncSchema, Error, undefined>({
    queryKey: ["sync-clinet-only-has-update-records"],
    queryFn: () => prepaireSyncDatabaseForSyncApi(),
    // queryFn: () => new Error("something is wrong (purpose for debugging)"),
  });
};
