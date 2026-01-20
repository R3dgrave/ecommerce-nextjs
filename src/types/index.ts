export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  stock: number;
  discount?: number;
  isNewProduct?: boolean;
  categoryId?: string;
  brandId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface StatusHistory {
  status: OrderStatus;
  date: string;
  comment?: string;
}

export interface Order {
  id: string;
  _id?: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
  status: OrderStatus;
  statusHistory: StatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  phone?: string;
  shippingAddresses?: ShippingAddress[];
}

export interface ShippingAddress {
  id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  code: number;
  data: T;
  details?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}
