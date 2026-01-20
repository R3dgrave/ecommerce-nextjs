"use client";

import React, { useState } from "react";
import { Product } from "../../types/index";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const hasSecondaryImage = product.images && product.images.length > 1;
  const hasDiscount = (product.discount ?? 0) > 0;

  return (
    <div
      className="group bg-white border border-gray-100 rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="flex flex-col grow">
        <div className="relative h-64 w-full bg-gray-50/50 overflow-hidden">
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {product.isNewProduct && (
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg shadow-emerald-200">
                Nuevo
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg shadow-red-200">
                -{product.discount}%
              </span>
            )}
          </div>

          <Image
            src={product.images[0] || "/placeholder.png"}
            alt={product.name}
            fill
            className={`object-contain p-6 transition-all duration-700 ease-in-out ${
              isHovered && hasSecondaryImage ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            loading="eager"
          />

          {hasSecondaryImage && (
            <Image
              src={product.images[1]}
              alt={`${product.name} vista secundaria`}
              fill
              className={`object-contain p-6 transition-all duration-700 ease-in-out absolute inset-0 ${
                isHovered ? "opacity-100 scale-110" : "opacity-0 scale-100"
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-30">
              <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Agotado
              </span>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col grow">
          <div className="grow">
            <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-blue-600 font-black text-2xl tracking-tighter">
                ${Math.round(product.price).toLocaleString("es-CL")}
              </p>
              {hasDiscount && (
                <p className="text-gray-400 line-through text-sm font-medium">
                  ${Math.round(product.price * 1.1).toLocaleString("es-CL")}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="px-6 pb-6">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!isOutOfStock) addToCart(product);
          }}
          disabled={isOutOfStock}
          className={`cursor-pointer w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 
            ${
              isOutOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-blue-600 shadow-lg shadow-gray-200 hover:shadow-blue-200"
            }`}
        >
          {isOutOfStock ? "Sin Stock" : "Añadir al Carro"}
        </button>
      </div>
    </div>
  );
};