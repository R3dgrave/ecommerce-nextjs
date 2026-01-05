import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { Product } from '../../types/index';

const mockAddToCart = jest.fn();

jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    cart: [],
    addToCart: mockAddToCart,
    removeFromCart: jest.fn(),
    cartCount: 0,
  }),
}));

const mockProduct: Product = {
  id: '123',
  name: 'Teclado Mecánico RGB',
  price: 59990,
  images: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'],
  stock: 10,
  isNewProduct: true,
  discount: 0,
  description: 'Un teclado de prueba'
};

describe('ProductCard Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el nombre y el precio en formato CLP', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Teclado Mecánico RGB')).toBeInTheDocument();
    expect(screen.getByText('$59.990')).toBeInTheDocument();
  });

    it('debería mostrar el badge de "Nuevo" si corresponde', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/nuevo/i)).toBeInTheDocument();
  });

  it('debería deshabilitar el botón si no hay stock', () => {
    const outOfStockProduct: Product = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);

    const button = screen.getByRole('button', { name: /sin stock/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-gray-100');
  });

  it('debería llamar a addToCart al hacer click en el botón', () => {
    render(<ProductCard product={mockProduct} />);

    const button = screen.getByRole('button', { name: /añadir al carro/i });
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});