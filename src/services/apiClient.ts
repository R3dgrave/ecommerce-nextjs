import { ApiResponse } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ValidationError {
  msg: string;
  param?: string;
  location?: string;
}

interface ErrorResponse {
  success: boolean;
  message?: string;
  errors?: ValidationError[];
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("El servidor tuvo un problema técnico. Por favor, intenta más tarde.");
  }

  const result = await response.json() as ApiResponse<T> & ErrorResponse;

  if (!response.ok) {
    if (result.errors && Array.isArray(result.errors)) {
      const validationMsg = result.errors.map((err) => err.msg).join(", ");
      throw new Error(validationMsg);
    }
    throw new Error(result.message || "Error inesperado");
  }

  return result.data as T;
}