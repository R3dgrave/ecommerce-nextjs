import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import { Hero } from "../components/home/Hero";
import { ProductShowcase } from "../components/products/ProductShowcase";

export default async function HomePage() {
  const [productsRes, categoriesRes] = await Promise.allSettled([
    productService.getAllProducts(),
    categoryService.getAllCategories(),
  ]);

  const products =
    productsRes.status === "fulfilled" ? productsRes.value.data : [];
  const categories =
    categoriesRes.status === "fulfilled" ? categoriesRes.value : [];

  return (
    <div className="flex flex-col gap-12 pb-20">
      <Hero />

      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black text-gray-900 mb-2">
          Nuestro Catálogo
        </h2>
        <p className="text-gray-500 mb-8">Equipamiento premium para tu setup</p>
      </div>

      <ProductShowcase initialProducts={products} categories={categories} />
    </div>
  );
}
