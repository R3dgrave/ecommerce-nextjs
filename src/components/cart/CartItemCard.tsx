'use client';

import React from 'react';
import { CartItem } from '../../types/index';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  item: CartItem;
}

export const CartItemCard = ({ item }: Props) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-6 border-b border-gray-100 group">
      <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
        <Image
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-contain p-2 mix-blend-multiply"
        />
      </div>

      <div className="grow">
        <Link href={`/product/${item.id}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          {item.name}
        </Link>
        <p className="text-sm text-gray-500 mt-1">Cantidad: {item.quantity}</p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-xs text-red-500 mt-2 font-medium hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Eliminar producto
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
        <p className="text-xs text-gray-400">${item.price.toLocaleString()} c/u</p>
      </div>
    </div>
  );
};