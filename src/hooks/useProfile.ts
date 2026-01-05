import { useState, useEffect, useCallback } from "react";
import { customerService } from "../services/customerService";
import { User, ShippingAddress } from "../types";

export const useProfile = () => {
  const [fullUser, setFullUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await customerService.getProfile();
      setFullUser(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al cargar perfil");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateInfo = async (name: string, phone: string) => {
    const updated = await customerService.updateProfile({ name, phone });
    setFullUser(updated);
  };

  const deleteAddress = async (id: string) => {
    const updated = await customerService.removeAddress(id);
    setFullUser(updated);
  };

  const addAddress = async (addressData: Omit<ShippingAddress, "id">) => {
    try {
      setLoading(true);
      const updatedUser = await customerService.addAddress(addressData);
      setFullUser(updatedUser);
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        message:
          err instanceof Error ? err.message : "Error al añadir dirección",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    fullUser,
    loading,
    error,
    updateInfo,
    deleteAddress,
    addAddress,
    refresh: fetchProfile,
  };
};
