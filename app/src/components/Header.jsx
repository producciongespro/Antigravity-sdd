import React from 'react';
import { ShoppingCart, Home, Sun, Moon } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  activeListTitle,
  theme,
  toggleTheme
}) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-30 shadow-md transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Izquierda: Logo, Título, Versión y Lista activa */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group min-w-0"
          title="SuperCarrito - Ir al inicio"
        >
          <div className="bg-emerald-500 text-slate-950 p-2 rounded-xl shadow-inner font-bold flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              SuperCarrito <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-semibold border border-emerald-500/30">SDD v2.5</span>
            </h1>
            <p className="text-xs text-slate-400 truncate">
              {activeListTitle ? `Lista activa: ${activeListTitle}` : 'Tu asistente inteligente para el súper'}
            </p>
          </div>
        </div>

        {/* Derecha: Estrictamente 1 ó 2 funciones según la pantalla */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Botón 1: Alternador de Tema Claro / Oscuro (Siempre presente) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm focus:outline-none"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Alternar tema claro y oscuro"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
          </button>

          {/* Botón 2: Botón de Inicio con Icono (Solo en modo detalle: activeTab !== 'home') */}
          {activeTab !== 'home' && (
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm focus:outline-none group"
              title="Volver a la ventana principal"
              aria-label="Volver a la ventana principal"
            >
              <Home className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
