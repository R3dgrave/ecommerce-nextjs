"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthActions } from "@/src/hooks/useAuthActions";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleLogin, loading, error } = useAuthActions();
  const reason = searchParams.get("reason");
  const redirectPath = searchParams.get("redirect") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLogin(email, password);
    if (result?.success) {
      router.push(redirectPath);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl border border-gray-50">
      {reason === "auth_required" && (
        <div className="mb-6 p-4 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl border border-blue-100 animate-in fade-in zoom-in">
          👋 ¡Hola! Por favor inicia sesión para guardar tus datos de envío y
          completar la compra.
        </div>
      )}
      {reason === "session_expired" && (
        <div className="mb-6 p-4 bg-orange-50 text-orange-700 text-sm font-bold rounded-xl border border-orange-100">
          Tu sesión ha expirado por seguridad. Ingresa nuevamente.
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900">Bienvenido</h1>
        <p className="text-gray-500 mt-2">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:bg-gray-400 active:scale-95"
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="cursor-pointer text-blue-600 font-bold hover:underline"
        >
          Regístrate gratis
        </Link>
      </p>
    </div>
  );
}
