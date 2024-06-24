import { useMutation } from "@tanstack/react-query";
import { postEnergyConsumption } from "../api";

export const useEnergyConsumption = () => {
  return useMutation({
    mutationKey: ["energy-consumption"],
    mutationFn: ({
      amount,
      purchasable,
    }: {
      amount: number;
      purchasable: number;
    }) => {
      return postEnergyConsumption({ amount, purchasable });
    },
  });
};
