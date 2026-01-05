import { Product } from '../../types/index';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  error: string | null;
}

export function FeaturedProducts({ products, error }: FeaturedProductsProps) {
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-10 rounded-4xl border border-red-100 text-center font-bold">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-24 bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400 text-lg font-medium">No encontramos productos en stock.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}