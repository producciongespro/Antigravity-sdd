import React from 'react';
import { ShoppingCart, List, PackageCheck, Layers } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, activeListTitle, progress }) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-30 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo y Marca */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 text-slate-950 p-2 rounded-xl shadow-inner font-bold flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              SuperCart <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-semibold border border-emerald-500/30">SDD</span>
            </h1>
            <p className="text-xs text-slate-400">
              {activeListTitle ? `Lista activa: ${activeListTitle}` : 'Tu asistente inteligente para el súper'}
            </p>
          </div>
        </div>

        {/* Pestañas de Navegación */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700/60 w-full sm:w-auto justify-center">
          <button
            onClick={() => setActiveTab('shopping')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'shopping'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>En el Súper</span>
            {progress !== null && progress !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'shopping' ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {progress}%
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('lists')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'lists'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <List className="w-4 h-4" />
            <span>Mis Listas</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'catalog'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Catálogo</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
