import React, { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Search, Sparkles } from 'lucide-react';

export default function ActiveShopping({
  lists,
  activeListId,
  setActiveListId,
  items,
  onToggleInCart,
  onClearPurchased,
  onFinishList,
  onGoToListBuilder
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'in_cart'
  const [searchTerm, setSearchTerm] = useState('');

  const currentList = lists.find(l => l.id === activeListId);

  // Filtrado
  const filteredItems = items.filter(item => {
    const enCarrito = item.enCarrito !== undefined ? item.enCarrito : item.inCart;
    const nombre = item.nombreProducto || item.productName || '';

    const matchesFilter =
      filter === 'all' ? true :
      filter === 'pending' ? !enCarrito :
      enCarrito;
    const matchesSearch = nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const total = items.length;
  const inCartCount = items.filter(i => (i.enCarrito !== undefined ? i.enCarrito : i.inCart)).length;
  const progress = total > 0 ? Math.round((inCartCount / total) * 100) : 0;

  if (!currentList) {
    return (
      <div className="text-center py-16 bg-slate-800/50 rounded-2xl border border-slate-700/60 p-8 max-w-md mx-auto my-8">
        <Sparkles className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No hay listas creadas</h3>
        <p className="text-sm text-slate-400 mb-6">Crea tu primera lista para comenzar a comprar en el súper.</p>
        <button
          onClick={onGoToListBuilder}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
        >
          Crear mi primera lista
        </button>
      </div>
    );
  }

  const listTitle = currentList.titulo || currentList.title;
  const listDate = currentList.fecha || currentList.date;

  return (
    <div className="space-y-4">
      {/* Selector de lista activa y Progreso */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Modo Supermercado</span>
            <div className="flex items-center gap-2 mt-0.5">
              <select
                value={activeListId}
                onChange={(e) => setActiveListId(e.target.value)}
                className="bg-slate-900 text-white font-bold text-lg rounded-lg px-2 py-1 border border-slate-700 focus:outline-none focus:border-emerald-500"
              >
                {lists.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.titulo || list.title} ({list.fecha || list.date})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onGoToListBuilder}
              className="text-xs text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              + Agregar Productos
            </button>
            {inCartCount > 0 && (
              <button
                onClick={onClearPurchased}
                className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1"
                title="Quitar comprados de la lista"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpiar</span>
              </button>
            )}
          </div>
        </div>

        {/* Barra de Progreso */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">
              {inCartCount} de {total} artículos en el carrito
            </span>
            <span className={progress === 100 ? 'text-emerald-400' : 'text-slate-400'}>
              {progress}%
            </span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Buscador y Filtros táctiles */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Filtrar por nombre en esta compra..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 text-sm text-white pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos ({total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Por comprar ({total - inCartCount})
          </button>
          <button
            onClick={() => setFilter('in_cart')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filter === 'in_cart' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            En carrito ({inCartCount})
          </button>
        </div>
      </div>

      {/* Lista de Artículos Interactivos (Diseño Táctil Grande) */}
      <div className="space-y-2">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-xl border border-slate-700/50 p-6">
            <p className="text-slate-400 text-sm">No hay productos que coincidan con el filtro.</p>
          </div>
        ) : (
          filteredItems.map(item => {
            const enCarrito = item.enCarrito !== undefined ? item.enCarrito : item.inCart;
            const nombre = item.nombreProducto || item.productName;
            const categoria = item.categoria || item.category;
            const unidad = item.unidad || item.unit;
            const cantidad = item.cantidad !== undefined ? item.cantidad : item.quantity;
            const notas = item.notas || item.notes;

            return (
              <div
                key={item.id}
                onClick={() => onToggleInCart(item.id, nombre)}
                className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer select-none transition-all flex items-center justify-between gap-3 ${
                  enCarrito
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400'
                    : 'bg-slate-800 hover:bg-slate-750 border-slate-700 hover:border-slate-600 text-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    type="button"
                    className="flex-shrink-0 text-slate-400 focus:outline-none"
                    aria-label="Marcar producto"
                  >
                    {enCarrito ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 transition-transform scale-110" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-500 hover:text-slate-400" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <p className={`font-semibold text-base truncate ${enCarrito ? 'line-through text-slate-400' : 'text-white'}`}>
                      {nombre}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                      <span className="px-2 py-0.5 bg-slate-700/60 rounded text-[11px] font-medium">
                        {categoria}
                      </span>
                      {notas && (
                        <span className="italic text-slate-400 truncate max-w-[200px]">
                          "{notas}"
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cantidad grande visible */}
                <div className="flex-shrink-0 text-right">
                  <span className={`text-sm font-black px-2.5 py-1 rounded-lg border ${
                    enCarrito
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    x{cantidad} {unidad}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Botón de Finalizar Compra */}
      {total > 0 && progress === 100 && (
        <div className="pt-4 text-center">
          <button
            onClick={onFinishList}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 text-base transition-all transform hover:-translate-y-0.5"
          >
            🎉 ¡Lista Completada! Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}
