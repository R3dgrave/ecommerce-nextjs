"use client";

import { useState } from "react";
import { useAuthActions } from "../../hooks/useAuthActions";
import { User } from '../../types';
import Link from "next/link";

type RegisterFormData = Pick<User, 'name' | 'email' | 'phone'> & {
  password: string;
  confirmPassword: string;  
};

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const { handleRegister, loading, error } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;

    await handleRegister({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone ? `+56 ${formData.phone}` : undefined,
    });
  };

  return (
    <div className="max-w-md mx-auto my-12 p-10 bg-white rounded-[2.5rem] shadow-xl border border-gray-50">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          Crear Cuenta
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Únete a la mejor comunidad tech
        </p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          label="Nombre"
          value={formData.name}
          onChange={(v) => setFormData({ ...formData, name: v })}
          placeholder="Juan Pérez"
        />

        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(v) => setFormData({ ...formData, email: v })}
          placeholder="tu@email.com"
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Contraseña"
            type="password"
            onChange={(v) => setFormData({ ...formData, password: v })}
          />
          <InputField
            label="Confirmar"
            type="password"
            onChange={(v) => setFormData({ ...formData, confirmPassword: v })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-black text-gray-400 uppercase ml-2 tracking-widest">
            Teléfono
          </label>
          <div className="flex gap-2">
            <div className="flex items-center justify-center bg-gray-100 px-4 rounded-2xl text-gray-500 font-bold text-sm">
              🇨🇱 +56
            </div>
            <input
              type="tel"
              maxLength={9}
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
              className="flex-1 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="9 1234 5678"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={
            loading ||
            !formData.email ||
            formData.password !== formData.confirmPassword
          }
          className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:bg-gray-200 disabled:shadow-none active:scale-95 mt-4"
        >
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-500 font-medium">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-blue-600 font-bold hover:underline">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value?: string;
  type?: "text" | "email" | "password" | "tel";
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function InputField({
  label,
  type = "text",
  placeholder = "••••••",
  onChange,
  value,
  required = true,
}: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-black text-gray-400 uppercase ml-2 tracking-widest">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />
    </div>
  );
}
