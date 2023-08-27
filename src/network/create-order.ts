import { useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";

import { type CreateOrderBody } from "@/pages/api/order/create";

import { axiosAPI } from "./api";

interface CreateOrderResponse {
  link: string;
  token: string;
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (body: CreateOrderBody) => {
      try {
        const response = await axiosAPI.post<
          CreateOrderBody,
          AxiosResponse<CreateOrderResponse>
        >(`/api/order/create`, body);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
