export function Hero() {
  return (
    <section className="relative w-full rounded-[3rem] overflow-hidden bg-gray-900 flex items-center px-12 group">
      <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-transparent to-indigo-900/40" />
      <div className="relative z-10 max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700 py-6">
        <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-[0.2em]">
          Nueva Colección 2026
        </span>
        <h1 className="text-6xl font-black text-white mt-6 leading-tight tracking-tighter">
          Tecnología que <br /> <span className="text-blue-500">Define tu Futuro</span>
        </h1>
        <p className="text-gray-400 mt-8 text-xl font-medium max-w-md">
          Gadgets avanzados con garantía oficial y envío gratis a todo Chile.
        </p>
        <button className="mt-10 bg-white text-gray-900 px-10 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all active:scale-95 shadow-xl">
          Explorar Ahora
        </button>
      </div>
    </section>
  );
}