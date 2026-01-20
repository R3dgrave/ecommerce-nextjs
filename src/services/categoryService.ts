import { apiClient } from "./apiClient";
import { Category } from "../types/index";

export const categoryService = {
  async getAllCategories() {
    const response = await apiClient<{ data: Category[] }>("/category");
    return response.data;
  }
};