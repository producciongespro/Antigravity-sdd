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
  onUpdateItemQuantity,
  onRemoveItemFromList,
  onGoToShopping
}) {
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [catalogSearch, setCatalogSearch] = useState('');

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

            {/* Selector Rápido desde Catálogo */}
            <div className="mt-4 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Agregar productos desde el Catálogo Maestro ({products.length} disponibles)
              </label>
              <input
                type="text"
                placeholder="Buscar en catálogo (ej: leche, arroz, queso)..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />

              {catalogSearch && (
                <div className="bg-slate-900/90 rounded-xl border border-slate-700/80 p-2 max-h-48 overflow-y-auto space-y-1">
                  {filteredProducts.length === 0 ? (
                    <p className="text-xs text-slate-500 p-2">No se encontró ningún producto.</p>
                  ) : (
                    filteredProducts.map(p => {
                      const nombre = p.nombre || p.name;
                      const categoria = p.categoria || p.category;
                      const unidad = p.unidad || p.unit;

                      return (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-2 hover:bg-slate-800 rounded-lg text-xs"
                        >
                          <div>
                            <span className="font-semibold text-white">{nombre}</span>
                            <span className="text-slate-400 text-[11px] ml-2">({categoria} - {unidad})</span>
                          </div>
                          <button
                            onClick={() => onAddItemToList(activeList.id, p.id, 1)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-2.5 py-1 rounded-md font-bold transition-colors text-[11px]"
                          >
                            + Agregar
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
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
