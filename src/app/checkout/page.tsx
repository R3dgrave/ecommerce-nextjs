"use client";

import { useState, useEffect } from "react";
import { orderService } from "@/src/services/orderService";
import { customerService } from "@/src/services/customerService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import type { Order } from "@/src/types";

export default function CheckoutPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    state: "Chile", 
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchFreshProfile = async () => {
      try {
        const freshUser = await customerService.getProfile();
        const currentToken = localStorage.getItem("token");
        if (currentToken && JSON.stringify(freshUser) !== JSON.stringify(user)) {
          login(freshUser, currentToken);
        }
      } catch (error) {
        console.error("Error al refrescar perfil:", error);
      }
    };
    if (mounted) fetchFreshProfile();
  }, [mounted, user, login]);

  useEffect(() => {
    if (mounted && user?.shippingAddresses) {
      if (user.shippingAddresses.length > 0) {
        const defaultAddr = user.shippingAddresses.find(a => a.isDefault) || user.shippingAddresses[0];
        setSelectedAddressId(defaultAddr.id || defaultAddr.street);
        setUseNewAddress(false);
      } else {
        setUseNewAddress(true);
      }
    }
  }, [user?.shippingAddresses, mounted]);

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let addressToPath;

      if (useNewAddress) {
        addressToPath = {
          address: newAddress.street,
          city: newAddress.city,
          country: newAddress.state,
          zipCode: newAddress.zipCode,
        };
      } else {
        const selected = user?.shippingAddresses?.find(
          (addr) => (addr.id || addr.street) === selectedAddressId
        );
        if (selected) {
          addressToPath = {
            address: selected.street,
            city: selected.city,
            country: selected.state || "Chile",
            zipCode: selected.zipCode,
          };
        }
      }

      if (!addressToPath) throw new Error("Selecciona una dirección");

      const order: Order = await orderService.createOrder(addressToPath);
      const orderId = order.id || order._id;
      
      router.push(`/checkout/payment?orderId=${orderId}`);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error al procesar la orden";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">Finalizar Compra</h1>

      <form onSubmit={handleStartPayment} className="space-y-6">
        {user?.shippingAddresses && user.shippingAddresses.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest ml-2">Direcciones Guardadas</h2>
            <div className="grid grid-cols-1 gap-3">
              {user.shippingAddresses.map((addr) => {
                const addrId = addr.id || addr.street;
                const isSelected = !useNewAddress && selectedAddressId === addrId;
                return (
                  <label
                    key={addrId}
                    className={`flex items-center p-5 rounded-4xl border-2 cursor-pointer transition-all ${
                      isSelected ? "border-blue-600 bg-blue-50/40 ring-4 ring-blue-50" : "border-gray-100 bg-white"
                    }`}
                    onClick={() => { setUseNewAddress(false); setSelectedAddressId(addrId); }}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="ml-4">
                      <p className="font-bold text-gray-900">{addr.street}</p>
                      <p className="text-sm text-gray-500">{addr.city}, {addr.state} - {addr.zipCode}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => { setUseNewAddress(true); setSelectedAddressId(null); }}
            className={`w-full p-5 rounded-4xl border-2 text-left transition-all flex items-center justify-between ${useNewAddress ? "border-blue-600 bg-blue-50/40" : "border-gray-100 bg-white"}`}
          >
            <span className="font-bold ml-2">Usar una dirección diferente</span>
            <span className="text-2xl text-blue-600">{useNewAddress ? "−" : "+"}</span>
          </button>

          {useNewAddress && (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-black text-gray-400 uppercase ml-2">Calle y Número</label>
                <input
                  required
                  className="w-full p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                  placeholder="Ej: Av. Vitacura 1234"
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 uppercase ml-2">Ciudad</label>
                  <input
                    required
                    className="w-full p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                    placeholder="Santiago"
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 uppercase ml-2">C. Postal</label>
                  <input
                    required
                    className="w-full p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                    placeholder="12345"
                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-6 rounded-4xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:bg-gray-200"
        >
          {loading ? "Procesando..." : "Confirmar y Pagar"}
        </button>
      </form>
    </div>
  );
}