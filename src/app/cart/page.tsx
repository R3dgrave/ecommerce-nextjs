'use client';

import dynamic from 'next/dynamic';

const CartClient = dynamic(() => import('../../components/cart/CartClient'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-400 font-medium animate-pulse">Cargando tu carrito...</p>
      </div>
    </div>
  )
});

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50/30">
      <CartClient />
    </main>
  );
}