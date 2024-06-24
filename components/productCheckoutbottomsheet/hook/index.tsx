import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TRANSIENT_CONSUMPTION_API } from "@/modules/constant";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { commonApiCheckout, commonApiPurchase } from "@/modules/commonApi";

export const useCheckoutData = (productID: number, variationID: number) => {
  return useMutation({
    mutationFn: (data: any) => {
      return commonApiCheckout(data).then(function (response) {
        queryClient.setQueryData(
          ["check-out", productID, variationID],
          response.data
        );
      });
    },
  });
};

export function callTransientConsumption(id: number) {
  const url = TRANSIENT_CONSUMPTION_API(id);
  return axios.get(url);
}
