import { useMutation } from "@tanstack/react-query";
import {
  getMyProfileDataApi,
  giftShop,
  putMethodRelationShip,
  userBadge,
} from "../api";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { studentAPI } from "@/app/setting/store/api";

export const useSpecificStudentsAPI = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return studentAPI(id).then(function (response) {
        queryClient.setQueryData([`specific-student-data`, id], response.data);
      });
    },
  });
};

export const useGetMyProfileDataAPI = () => {
  return useMutation({
    mutationFn: (data) => {
      return getMyProfileDataApi(data).then(function (response) {
        queryClient.setQueryData(["my-profile-data"], response.data);
      });
    },
  });
};

export const useBadgeAPI = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return userBadge(data).then((res) => {
        queryClient.setQueryData(["user-badge"], res.data);
      });
    },
  });
};

export const useGiftShopAPI = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return giftShop(data).then((res) => {
        queryClient.setQueryData(["gift-shop"], res.data);
      });
    },
  });
};
