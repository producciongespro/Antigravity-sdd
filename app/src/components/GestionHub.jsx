import React, { useState } from 'react';
import ProductCatalog from './ProductCatalog';
import ListManager from './ListManager';
import { Layers, Calendar, ArrowRight, Package, ListChecks, ChevronRight } from 'lucide-react';

export default function GestionHub({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  lists,
  onCreateList,
  onDeleteList,
  activeListId,
  setActiveListId,
  listItems,
  onAddItemToList,
  onAddMultipleItemsToList,
  onUpdateItemQuantity,
  onRemoveItemFromList,
  onGoToShopping
}) {
  const [activeMenu, setActiveMenu] = useState('catalogo'); // 'catalogo' | 'listas'

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Encabezado del Módulo de Gestión */}
      <div className="bg-gradient-to-r from-sky-950/40 via-slate-800 to-slate-800 border border-sky-500/30 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-black shadow-md flex-shrink-0 text-2xl">
            📋
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-wider">
                Paso 1 · En Casa
              </span>
              <h2 className="text-xl font-black text-white tracking-tight">
                Centro de Gestión
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Administración de despensa y armado de listas con panel de navegación lateral.
            </p>
          </div>
        </div>

        <button
          onClick={onGoToShopping}
          className="self-stretch sm:self-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105 flex-shrink-0"
        >
          <span>Ir al Modo Súper</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* DISPOSICIÓN ESTILO ADMINLTE: PANEL IZQUIERDO (MENÚ) + ÁREA DE TRABAJO DERECHA */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* PANEL IZQUIERDO: Menú Lateral de Opciones */}
        <aside className="md:col-span-4 lg:col-span-3 space-y-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-3 shadow-md space-y-1">
            <span className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Opciones de Gestión
            </span>

            {/* Opción 1: Catálogo */}
            <button
              onClick={() => setActiveMenu('catalogo')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all text-left group ${
                activeMenu === 'catalogo'
                  ? 'bg-sky-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className={`w-4 h-4 ${activeMenu === 'catalogo' ? 'text-slate-950' : 'text-sky-400'}`} />
                <span>Catálogo</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeMenu === 'catalogo'
                  ? 'bg-slate-950/20 text-slate-950'
                  : 'bg-slate-700 text-slate-300 border border-slate-600'
              }`}>
                {products.length}
              </span>
            </button>

            {/* Opción 2: Armado de Listas */}
            <button
              onClick={() => setActiveMenu('listas')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all text-left group ${
                activeMenu === 'listas'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ListChecks className={`w-4 h-4 ${activeMenu === 'listas' ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span>Armado de Listas</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeMenu === 'listas'
                  ? 'bg-slate-950/20 text-slate-950'
                  : 'bg-slate-700 text-slate-300 border border-slate-600'
              }`}>
                {lists.length}
              </span>
            </button>
          </div>

          {/* Tarjeta de Resumen Rápido en Sidebar */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-xs space-y-2 hidden md:block">
            <span className="font-bold text-slate-300 block">💡 Flujo de Trabajo</span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              1. En <strong>Catálogo</strong> da de alta los productos que compras con frecuencia.<br />
              2. En <strong>Armado de Listas</strong> selecciona con checkboxes lo que necesitas para tu salida al súper.
            </p>
          </div>
        </aside>

        {/* ÁREA DE TRABAJO DERECHA: Despliegue de la opción seleccionada */}
        <main className="md:col-span-8 lg:col-span-9 space-y-4">
          {activeMenu === 'catalogo' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between px-1 border-b border-slate-700/80 pb-2">
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span>Catálogo de Productos de Despensa</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Alta, edición, eliminación y búsqueda de los artículos de tu despensa.
                  </p>
                </div>
                <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20">
                  {products.length} productos
                </span>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 shadow-sm">
                <ProductCatalog
                  products={products}
                  onAddProduct={onAddProduct}
                  onUpdateProduct={onUpdateProduct}
                  onDeleteProduct={onDeleteProduct}
                />
              </div>
            </div>
          )}

          {activeMenu === 'listas' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between px-1 border-b border-slate-700/80 pb-2">
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Mantenimiento y Armado de Listas</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Crea listas y vincula artículos de tu catálogo con casillas de verificación (checkboxes).
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  {lists.length} listas
                </span>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 shadow-sm">
                <ListManager
                  lists={lists}
                  onCreateList={onCreateList}
                  onDeleteList={onDeleteList}
                  activeListId={activeListId}
                  setActiveListId={setActiveListId}
                  products={products}
                  listItems={listItems}
                  onAddItemToList={onAddItemToList}
                  onAddMultipleItemsToList={onAddMultipleItemsToList}
                  onUpdateItemQuantity={onUpdateItemQuantity}
                  onRemoveItemFromList={onRemoveItemFromList}
                  onGoToShopping={onGoToShopping}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
