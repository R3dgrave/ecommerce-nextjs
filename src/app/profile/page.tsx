'use client';

import { useState } from 'react';
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { useProfile } from "../../hooks/useProfile";
import { ShippingAddress } from "../../types/index";
import { AddressModal } from "../../components/profile/AddressModal";
import { EditProfileForm } from "../../components/profile/EditProfileForm";

export default function ProfilePage() {
  const { fullUser, loading, error, updateInfo, deleteAddress, addAddress } = useProfile();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  if (loading && !fullUser) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-2xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Mi Perfil</h1>
          <p className="text-gray-500">Gestiona tu información y direcciones de envío</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <div className="space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all">
            <div className="flex justify-between flex-col md:flex-row items-start md:items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                Información Personal
              </h2>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="cursor-pointer text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full transition-colors"
                >
                  Editar
                </button>
              )}
            </div>

            {isEditingProfile && fullUser ? (
              <EditProfileForm
                user={fullUser}
                onSave={async (name, phone) => {
                  await updateInfo(name, phone);
                  setIsEditingProfile(false);
                }}
                onCancel={() => setIsEditingProfile(false)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProfileField label="Nombre" value={fullUser?.name} />
                <ProfileField label="Correo Electrónico" value={fullUser?.email} />
                <ProfileField label="Teléfono" value={fullUser?.phone || "No registrado"} />
              </div>
            )}
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between flex-col md:flex-row items-start md:items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                Direcciones de Envío
              </h2>
              <button
                onClick={() => setIsAddingAddress(true)}
                className="cursor-pointer text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full shadow-md shadow-blue-100 transition-all"
              >
                + Añadir
              </button>
            </div>

            <div className="space-y-4">
              {fullUser?.shippingAddresses && fullUser.shippingAddresses.length > 0 ? (
                fullUser.shippingAddresses.map((addr: ShippingAddress) => (
                  <AddressCard
                    key={addr.id || addr.street}
                    address={addr}
                    onDelete={() => addr.id && deleteAddress(addr.id)}
                  />
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-2xl">
                  <p className="text-gray-400 text-sm italic">
                    Aún no has guardado ninguna dirección.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <AddressModal
          isOpen={isAddingAddress}
          onClose={() => setIsAddingAddress(false)}
          onAdd={async (data) => {
            const result = await addAddress(data);
            return result;
          }}
        />
      </div>
    </ProtectedRoute>
  );
}

function ProfileField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="group">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">
        {label}
      </label>
      <p className="text-gray-900 font-semibold text-lg">{value}</p>
    </div>
  );
}

interface AddressCardProps {
  address: ShippingAddress;
  onDelete: () => void;
}

function AddressCard({ address, onDelete }: AddressCardProps) {
  return (
    <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 flex justify-between items-center hover:bg-white hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50/50 transition-all group">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <p className="font-bold text-gray-900">{address.street}</p>
          {address.isDefault && (
            <span className="bg-blue-100 text-blue-700 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">
              Predeterminada
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 font-medium">
          {address.city}, {address.state} — {address.zipCode}
        </p>
      </div>

      <button
        onClick={onDelete}
        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-all opacity-0 group-hover:opacity-100"
        title="Eliminar dirección"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}