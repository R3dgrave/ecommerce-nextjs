import { productService } from "../../../services/productService";
import { notFound } from "next/navigation";
import { AddToCartButton } from "../../../components/products/AddToCartButton";
import { ProductGallery } from "../../../components/products/ProductGallery";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await productService.getProductById(id);

  if (!product) notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col justify-center">
          {product.isNewProduct && (
            <span className="w-fit px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Nuevo Lanzamiento
            </span>
          )}

          <h1 className="text-4xl font-black text-gray-900 mb-2 leading-tight">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-blue-600 mb-6">
            ${product.price.toLocaleString("es-CL")}
          </p>

          <div className="border-t border-b border-gray-100 py-6 mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
              Descripción
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "Sin descripción disponible."}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm font-medium text-gray-500">
                {product.stock > 0
                  ? `${product.stock} unidades disponibles`
                  : "Sin stock"}
              </span>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
