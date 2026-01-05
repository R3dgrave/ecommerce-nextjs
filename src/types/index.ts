export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  stock: number;
  discount?: number;
  isNewProduct?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  cartCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  phone?: string;
  shippingAddresses?: ShippingAddress[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
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
