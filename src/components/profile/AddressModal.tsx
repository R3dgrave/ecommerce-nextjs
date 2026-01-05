import { useState } from 'react';
import { ShippingAddress } from '../../types/index';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (address: Omit<ShippingAddress, 'id'>) => Promise<{ success: boolean; message?: string }>;
}

const INITIAL_STATE = {
  street: '',
  city: '',
  state: '',
  zipCode: '',
  isDefault: false
};

export function AddressModal({ isOpen, onClose, onAdd }: AddressModalProps) {
  const [form, setForm] = useState<Omit<ShippingAddress, 'id'>>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.street || !form.city) return alert("Por favor completa los campos principales");

    setIsSubmitting(true);
    const result = await onAdd(form);
    setIsSubmitting(false);

    if (result.success) {
      setForm(INITIAL_STATE);
      onClose();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-black mb-6 text-gray-900">Nueva Dirección</h2>

        <div className="space-y-4">
          <input
            placeholder="Calle y Número"
            className="w-full p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={form.street}
            onChange={e => setForm({ ...form, street: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Ciudad"
              className="w-full p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })}
            />
            <input
              placeholder="Estado"
              className="w-full p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={form.state}
              onChange={e => setForm({ ...form, state: e.target.value })}
            />
          </div>
          <input
            placeholder="Código Postal"
            className="w-full p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={form.zipCode}
            onChange={e => setForm({ ...form, zipCode: e.target.value })}
          />
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onClose} disabled={isSubmitting} className="cursor-pointer flex-1 py-4 font-bold text-gray-400">Cancelar</button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="cursor-pointer flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 disabled:opacity-50 transition-all"
          >
            {isSubmitting ? 'Guardando...' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}