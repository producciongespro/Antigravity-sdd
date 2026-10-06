import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Search, Check, X, PackagePlus } from 'lucide-react';

const CATEGORIAS = [
  'Lácteos',
  'Verduras y Frutas',
  'Carnes',
  'Abarrotes',
  'Limpieza',
  'Cuidado Personal',
  'Otros'
];

const UNIDADES = ['unidades', 'kg', 'litros', 'paquete', 'bolsa'];

export default function ProductCatalog({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Abarrotes');
  const [unidad, setUnidad] = useState('unidades');

  const [editingId, setEditingId] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editCategoria, setEditCategoria] = useState('');
  const [editUnidad, setEditUnidad] = useState('');

  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('all');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onAddProduct({ nombre, categoria, unidad });
    setNombre('');
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditNombre(p.nombre || p.name || '');
    setEditCategoria(p.categoria || p.category || 'Otros');
    setEditUnidad(p.unidad || p.unit || 'unidades');
  };

  const saveEdit = (id) => {
    if (!editNombre.trim()) return;
    onUpdateProduct(id, { nombre: editNombre, categoria: editCategoria, unidad: editUnidad });
    setEditingId(null);
  };

  // Filtrado
  const filtrados = products.filter(p => {
    const nom = p.nombre || p.name || '';
    const cat = p.categoria || p.category || 'Otros';
    const coincideBusqueda = nom.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoriaSeleccionada === 'all' || cat === categoriaSeleccionada;
    return coincideBusqueda && coincideCat;
  });

  return (
    <div className="space-y-6">
      {/* Formulario de Alta de Producto */}
      <div className="bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-700 shadow-md">
        <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <PackagePlus className="w-5 h-5 text-emerald-400" />
          <span>Agregar Producto a la Despensa Maestra</span>
        </h2>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="Nombre del producto (ej: Café, Manzanas)..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <select
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {UNIDADES.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <div className="sm:col-span-4">
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Guardar en Despensa</span>
            </button>
          </div>
        </form>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar por nombre en la despensa..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="all">Todas las categorías ({products.length})</option>
          {CATEGORIAS.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Lista del Catálogo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filtrados.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700/60 p-6">
            <p className="text-slate-400 text-sm">No hay productos que coincidan con la búsqueda.</p>
          </div>
        ) : (
          filtrados.map(p => {
            const isEditing = editingId === p.id;
            const nom = p.nombre || p.name;
            const cat = p.categoria || p.category;
            const uni = p.unidad || p.unit;

            return (
              <div
                key={p.id}
                className="bg-slate-800 border border-slate-700 rounded-xl p-3.5 flex flex-col justify-between gap-3 shadow-sm hover:border-slate-600 transition-colors"
              >
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editNombre}
                      onChange={(e) => setEditNombre(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                    <div className="grid grid-cols-2 gap-1.5">
                      <select
                        value={editCategoria}
                        onChange={(e) => setEditCategoria(e.target.value)}
                        className="bg-slate-900 border border-slate-750 rounded-lg px-2 py-1 text-xs text-white"
                      >
                        {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select
                        value={editUnidad}
                        onChange={(e) => setEditUnidad(e.target.value)}
                        className="bg-slate-900 border border-slate-750 rounded-lg px-2 py-1 text-xs text-white"
                      >
                        {UNIDADES.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-sm text-white leading-snug">{nom}</h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[11px] px-2 py-0.5 bg-slate-750 text-slate-300 rounded-md font-medium border border-slate-700">
                        {cat}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        • {uni}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-1 pt-2 border-t border-slate-700/60">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => saveEdit(p.id)}
                        className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-semibold flex items-center gap-1 px-2.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Guardar</span>
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(p)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar "${nom}" del catálogo?`)) onDeleteProduct(p.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
