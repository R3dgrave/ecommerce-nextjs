"use client";

import React, { useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { CartItemCard } from "../../components/cart/CartItemCard";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CartClient() {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const total = subtotal;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/cart&reason=auth_required");
      return;
    }
    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-5xl mb-8">
          🛒
        </div>
        <h1 className="text-3xl font-black text-gray-900">
          Tu carrito está vacío
        </h1>
        <p className="text-gray-500 mt-3 max-w-xs mx-auto font-medium">
          Parece que aún no has añadido productos tecnológicos a tu carrito.
        </p>
        <Link
          href="/"
          className="mt-10 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-12">
        <h1 className="text-4xl font-black text-gray-900">Carrito</h1>
        <span className="bg-gray-100 text-gray-500 px-4 py-1 rounded-full text-sm font-bold">
          {cart.length} {cart.length === 1 ? "producto" : "productos"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[2.5rem] px-8 py-4 shadow-sm border border-gray-50">
            {cart.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-50 sticky top-24">
            <h2 className="font-black text-gray-900 mb-8 uppercase tracking-widest text-xs">
              Resumen de Compra
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">
                  ${Math.round(subtotal).toLocaleString("es-CL")}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Envío</span>
                <span className="text-green-500 font-bold">Gratis</span>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                <div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Total
                  </span>
                  <p className="text-3xl font-black text-blue-600 leading-none mt-1">
                    ${Math.round(total).toLocaleString("es-CL")}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="cursor-pointer w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg mt-10 hover:bg-blue-600 transition-all shadow-2xl active:scale-95"
            >
              {isAuthenticated ? "Pagar ahora" : "Inicia sesión para comprar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
