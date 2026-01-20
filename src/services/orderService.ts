import { apiClient } from "./apiClient";
import { Order } from "../types/index";

export const orderService = {
  createOrder: (shippingAddress?: {
    address: string;
    city: string;
    country: string;
    zipCode: string;
  }) => {
    return apiClient<Order>("/order", {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
    });
  },

  createPaymentIntent: (orderId: string) => {
    return apiClient<{ clientSecret: string }>("/payment/create-intent", {
      method: "POST",
      body: JSON.stringify({ orderId }),
    });
  },

  getStripeConfig: async () => {
    const data = await apiClient<{ publishableKey: string }>(
      "/payment/config",
      {
        method: "GET",
      }
    );
    return data.publishableKey;
  },

  getMyOrders: (page = 1, limit = 10) => {
    return apiClient<Order[]>(`/order?page=${page}&limit=${limit}`, {
      method: "GET",
    });
  },

  getOrderById: (orderId: string) => {
    return apiClient<Order>(`/order/${orderId}`, {
      method: "GET",
    });
  },
};
