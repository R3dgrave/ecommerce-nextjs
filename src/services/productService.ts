import { PaginatedResponse, Product } from "../types/index";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const productService = {
  async getAllProducts(category?: string): Promise<PaginatedResponse<Product>> {
    try {
      const url = new URL(`${API_URL}/product`);
      if (category && category !== "Todas") {
        url.searchParams.append("category", category);
      }

      const response = await fetch(url.toString(), {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const resJson = await response.json();
      return resJson.data;
    } catch (error) {
      console.error("Error en productService.getAllProducts:", error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/product/${id}`);
    if (!response.ok) throw new Error("Producto no encontrado");
    const resJson = await response.json();
    return resJson.data;
  },
};
