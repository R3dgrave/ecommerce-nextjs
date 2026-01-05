import { useState, useMemo } from 'react';
import { User } from '../../types/index';

interface Props {
  user: User;
  onSave: (name: string, phone: string) => Promise<void>;
  onCancel: () => void;
}

export function EditProfileForm({ user, onSave, onCancel }: Props) {
  const initialCleanPhone = useMemo(() =>
    user.phone?.replace('+56', '').trim() || '',
    [user.phone]);

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(initialCleanPhone);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasChanges = useMemo(() => {
    const nameChanged = name.trim() !== user.name;
    const phoneChanged = phone.trim() !== initialCleanPhone;
    return nameChanged || phoneChanged;
  }, [name, phone, user.name, initialCleanPhone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) return;

    setIsSubmitting(true);
    try {
      const fullPhone = `+56 ${phone.trim()}`;
      await onSave(name.trim(), fullPhone);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Nombre Completo
        </label>
        <input
          required
          className="w-full p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 font-medium"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ej: Juan Pérez"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Teléfono de Contacto
        </label>
        <div className="flex gap-2">
          <div className="flex items-center justify-center bg-gray-100 border border-gray-200 px-4 rounded-2xl text-gray-500 font-bold text-sm select-none">
            🇨🇱 +56
          </div>
          <input
            type="tel"
            className="flex-1 p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 font-medium"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="9 1234 5678"
            maxLength={9}
          />
        </div>
        <p className="mt-2 text-[10px] text-gray-400 italic">
          Solo los 9 dígitos después del +56.
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="cursor-pointer flex-1 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!hasChanges || isSubmitting || name.trim().length < 3}
          className={`cursor-pointer flex-1 py-4 rounded-2xl font-bold shadow-xl transition-all flex justify-center items-center gap-2
            ${!hasChanges || isSubmitting
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
            }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Guardando...
            </>
          ) : 'Guardar Cambios'}
        </button>
      </div>
    </form>
  );
}