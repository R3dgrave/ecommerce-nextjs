import { authService } from "./authService";
import { apiClient } from "./apiClient";

jest.mock("./apiClient");

describe("authService", () => {
  const mockUser = {
    id: "1",
    name: "Test User",
    email: "test@test.com",
    isAdmin: false,
  };

  it("debería llamar a /auth/login con las credenciales correctas", async () => {
    (apiClient as jest.Mock).mockResolvedValue({
      user: mockUser,
      token: "fake-token",
    });

    const result = await authService.login({
      email: "test@test.com",
      password: "password123",
    });

    expect(apiClient).toHaveBeenCalledWith(
      "/auth/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "test@test.com",
          password: "password123",
        }),
      })
    );
    expect(result.token).toBe("fake-token");
  });
});
