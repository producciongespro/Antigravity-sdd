import React, { useState } from 'react';
import { Plus, Trash2, Calendar, ShoppingBag, PlusCircle, MinusCircle, ChevronRight } from 'lucide-react';

export default function ListManager({
  lists,
  onCreateList,
  onDeleteList,
  activeListId,
  setActiveListId,
  products,
  listItems,
  onAddItemToList,
  onAddMultipleItemsToList,
  onUpdateItemQuantity,
  onRemoveItemFromList,
  onGoToShopping
}) {
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const activeList = lists.find(l => l.id === activeListId);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created = onCreateList({ titulo: newTitle.trim(), fecha: newDate });
    setNewTitle('');
    if (created && created.id) {
      setActiveListId(created.id);
    }
  };

  // Filtrar productos para selector
  const filteredProducts = products.filter(p => {
    const nombre = p.nombre || p.name || '';
    const categoria = p.categoria || p.category || '';
    return nombre.toLowerCase().includes(catalogSearch.toLowerCase()) ||
           categoria.toLowerCase().includes(catalogSearch.toLowerCase());
  });

  const toggleSelectProduct = (productId) => {
    setSelectedProductIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map(p => p.id));
    }
  };

  const handleAddSelected = () => {
    if (!activeList || selectedProductIds.length === 0) return;
    if (onAddMultipleItemsToList) {
      onAddMultipleItemsToList(activeList.id, selectedProductIds, 1);
    } else {
      selectedProductIds.forEach(id => onAddItemToList(activeList.id, id, 1));
    }
    setSelectedProductIds([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Columna Izquierda: Listas Creadas */}
      <div className="space-y-4 md:col-span-1">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-md">
          <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Crear Nueva Lista</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Nombre de la lista</label>
              <input
                type="text"
                placeholder="Ej: Súper Quincenal"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Fecha programada</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Lista</span>
            </button>
          </form>
        </div>

        {/* Listado de Listas */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Tus Listas Guardadas</h3>
          {lists.length === 0 ? (
            <p className="text-xs text-slate-500 p-2">Aún no tienes listas creadas.</p>
          ) : (
            lists.map(list => {
              const isSelected = list.id === activeListId;
              const titulo = list.titulo || list.title;
              const fecha = list.fecha || list.date;

              return (
                <div
                  key={list.id}
                  onClick={() => setActiveListId(list.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-white shadow-sm'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                  }`}
                >
                  <div className="min-w-0">
                    <p className={`font-semibold text-sm truncate ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                      {titulo}
                    </p>
                    <p className="text-xs text-slate-400">{fecha}</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`¿Eliminar la lista "${titulo}"?`)) onDeleteList(list.id);
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-700/60 transition-colors"
                      title="Eliminar lista"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Columna Derecha: Armador Dinámico */}
      <div className="md:col-span-2 space-y-4">
        {activeList ? (
          <div className="bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-700 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/80">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">Armado de Lista</span>
                <h2 className="text-lg font-black text-white">{activeList.titulo || activeList.title}</h2>
                <p className="text-xs text-slate-400">Selecciona productos de tu despensa para agregar a esta compra.</p>
              </div>

              <button
                onClick={onGoToShopping}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-md"
              >
                <span>Ir al Súper con esta lista</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Selector Visual desde Catálogo con Checkboxes (RF-3.1 / v2.5.1) */}
            <div className="mt-5 space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-xs font-bold text-white flex items-center gap-2">
                    <span>📦 Catálogo de Productos Disponibles</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                      {products.length} artículos
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Marca con las casillas los productos que deseas comprar y agrégalos con el botón.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddSelected}
                  disabled={selectedProductIds.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    Agregar {selectedProductIds.length > 0 ? `(${selectedProductIds.length})` : ''} a la Lista
                  </span>
                </button>
              </div>

              {/* Barra de Filtro Rápido y Seleccionar Todo */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Filtrar catálogo (ej: café, arroz, leche)..."
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  {catalogSearch && (
                    <button
                      type="button"
                      onClick={() => setCatalogSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {filteredProducts.length > 0 && (
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    className="text-[11px] font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors whitespace-nowrap"
                  >
                    {selectedProductIds.length === filteredProducts.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
                  </button>
                )}
              </div>

              {/* Lista Scrolleable de Productos con Checkboxes */}
              <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                {filteredProducts.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No se encontró ningún producto en el catálogo.
                  </div>
                ) : (
                  filteredProducts.map(p => {
                    const isSelected = selectedProductIds.includes(p.id);
                    const nombre = p.nombre || p.name;
                    const categoria = p.categoria || p.category || 'Otros';
                    const unidad = p.unidad || p.unit || 'unidades';
                    const alreadyInList = listItems.find(it => (it.productoId || it.productId) === p.id);

                    return (
                      <label
                        key={p.id}
                        className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500/60 text-white shadow-sm'
                            : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectProduct(p.id)}
                            className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-900 border-slate-700 cursor-pointer accent-emerald-500"
                          />
                          <span className="font-semibold text-xs text-white truncate">{nombre}</span>
                          <span className="text-[11px] text-slate-400 whitespace-nowrap">({categoria} · {unidad})</span>
                        </div>

                        {alreadyInList && (
                          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap ml-2">
                            En lista ({alreadyInList.cantidad !== undefined ? alreadyInList.cantidad : alreadyInList.quantity})
                          </span>
                        )}
                      </label>
                    );
                  })
                )}
              </div>
            </div>

            {/* Ítems vinculados a esta lista */}
            <div className="mt-6 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Productos en esta lista ({listItems.length})
              </h3>

              {listItems.length === 0 ? (
                <div className="text-center py-8 bg-slate-900/40 rounded-xl border border-dashed border-slate-700 p-4">
                  <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Esta lista está vacía.</p>
                  <p className="text-[11px] text-slate-500 mt-1">Busca arriba para vincular productos.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {listItems.map(item => {
                    const nombre = item.nombreProducto || item.productName;
                    const categoria = item.categoria || item.category;
                    const unidad = item.unidad || item.unit;
                    const cantidad = item.cantidad !== undefined ? item.cantidad : item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="bg-slate-900/80 border border-slate-700/70 p-3 rounded-xl flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{nombre}</p>
                          <p className="text-[11px] text-slate-400">{categoria}</p>
                        </div>

                        {/* Controles de Cantidad */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                            <button
                              onClick={() => onUpdateItemQuantity(item.id, cantidad - 1)}
                              disabled={cantidad <= 1}
                              className="text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                            >
                              <MinusCircle className="w-4 h-4" />
                            </button>
                            <span className="text-xs font-bold text-white w-6 text-center">
                              {cantidad}
                            </span>
                            <button
                              onClick={() => onUpdateItemQuantity(item.id, cantidad + 1)}
                              className="text-slate-400 hover:text-white"
                            >
                              <PlusCircle className="w-4 h-4" />
                            </button>
                            <span className="text-[10px] text-slate-400 ml-1">{unidad}</span>
                          </div>

                          <button
                            onClick={() => onRemoveItemFromList(item.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors"
                            title="Quitar de la lista"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center">
            <p className="text-sm text-slate-400">Selecciona o crea una lista a la izquierda para armarla.</p>
          </div>
        )}
      </div>
    </div>
  );
}
