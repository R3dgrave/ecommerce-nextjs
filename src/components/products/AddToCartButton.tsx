"use client";

import { useCart } from "../../context/CartContext";
import { Product } from "../../types/index";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg ${
        product.stock > 0
          ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 active:scale-95"
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
    >
      {product.stock > 0 ? "Añadir al carrito" : "Producto agotado"}
    </button>
  );
}
