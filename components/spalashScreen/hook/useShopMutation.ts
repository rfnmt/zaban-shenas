import { useMutation } from "@tanstack/react-query";

import { settingStore } from "../api";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { generateLog } from "@/modules/helper";
import { IShop } from "@/app/setting/store/store.interfaces";

export const useShopMutation = () => {
  return useMutation({
    mutationFn: () => {
      generateLog(`start get shop data`);

      return settingStore()
        .then(function ({ data }: { data: IShop }) {
          generateLog(
            `success get shop data:`,
            `shop data: ${JSON.stringify(data)}`
          );
          queryClient.setQueryData(["shop-data"], data);
        })
        .catch((error) => {
          generateLog(`fail get shop data:`, `error: ${JSON.stringify(error)}`);
        });
    },
  });
};
