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
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 py-6 border-b border-gray-100 last:border-0 group">
      <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
        <Image
          src={item.images[0] || "/placeholder.png"}
          alt={item.name}
          fill
          sizes="96px"
          className="object-contain p-2 mix-blend-multiply"
        />
      </div>

      <div className="grow">
        <Link 
          href={`/product/${item.id}`} 
          className="font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1"
        >
          {item.name}
        </Link>
        
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-8">
            <button 
              onClick={() => updateQuantity(item.id, -1)}
              disabled={item.quantity <= 1}
              className="px-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-600 font-bold"
            >
              −
            </button>
            <span className="w-8 text-center text-xs font-bold text-gray-900">
              {item.quantity}
            </span>
            <button 
              onClick={() => updateQuantity(item.id, 1)}
              className="px-2 hover:bg-gray-100 transition-colors text-gray-600 font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-[10px] text-red-500 font-black uppercase tracking-wider hover:text-red-700 transition-colors ml-2"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-black text-gray-900 text-lg">
          ${Math.round(item.price * item.quantity).toLocaleString('es-CL')}
        </p>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
          ${Math.round(item.price).toLocaleString('es-CL')} c/u
        </p>
      </div>
    </div>
  );
};