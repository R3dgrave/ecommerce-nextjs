import { renderHook, act } from "@testing-library/react";
import { useAuthActions } from "./useAuthActions";
import { authService } from "../services/authService";
import { User } from "../types/index";

const mockLogin = jest.fn();
jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    user: null,
    token: null,
    logout: jest.fn(),
    isAuthenticated: false,
  }),
}));

jest.mock("../services/authService");
const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe("useAuthActions Hook", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería ejecutar handleRegister con éxito y loguear al usuario", async () => {
    const mockUser: User = {
      id: "1",
      name: "Diego",
      email: "diego@test.com",
      isAdmin: false,
    };

    const mockResponse = { user: mockUser, token: "fake-token-123" };
    mockedAuthService.register.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuthActions());

    await act(async () => {
      const response = await result.current.handleRegister({
        name: "Diego",
        email: "diego@test.com",
        password: "password123",
      });
      expect(response.success).toBe(true);
    });

    expect(mockLogin).toHaveBeenCalledWith(mockUser, "fake-token-123");
  });

    it("debería capturar errores cuando el registro falla", async () => {
    const errorMessage = "El correo ya está registrado";

    mockedAuthService.register.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useAuthActions());

    await act(async () => {
      const response = await result.current.handleRegister({});
      expect(response.success).toBe(false);
      expect(response.message).toBe(errorMessage);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });
});