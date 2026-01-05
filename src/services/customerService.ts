import { apiClient } from "./apiClient";
import { User, ShippingAddress } from "../types";

export const customerService = {
  getProfile: () => {
    return apiClient<User>("/customer/profile");
  },

  updateProfile: (data: { name: string; phone?: string }) => {
    return apiClient<User>("/customer/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  addAddress: (address: Omit<ShippingAddress, "id">) => {
    return apiClient<User>("/customer/address", {
      method: "POST",
      body: JSON.stringify(address),
    });
  },

  removeAddress: (addressId: string) => {
    return apiClient<User>(`/customer/address/${addressId}`, {
      method: "DELETE",
    });
  },
};
