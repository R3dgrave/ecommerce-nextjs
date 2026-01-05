import { productService } from '../services/productService';
import { Hero } from '../components/home/Hero';
import { FeaturedProducts } from '../components/products/FeaturedProducts';
import { Product } from '../types/index';
import Link from 'next/link';

export default async function HomePage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const response = await productService.getAllProducts();
    products = response?.data || [];
  } catch {
    error = "No pudimos conectar con el servidor en este momento.";
  }

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />

      <section className="container mx-auto px-4">
        <div className="flex justify-between flex-col md:flex-row md:items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Destacados</h2>
            <p className="text-gray-500 font-medium mt-2">Los favoritos de la comunidad TECHSTORE</p>
          </div>
          <Link
            href="/products"
            className="text-blue-600 font-bold hover:bg-blue-50 px-6 py-3 rounded-xl transition-colors"
          >
            Ver catálogo completo →
          </Link>
        </div>

        <FeaturedProducts products={products} error={error} />
      </section>
    </div>
  );
}