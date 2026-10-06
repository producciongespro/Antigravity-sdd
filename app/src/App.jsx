import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ActiveShopping from './components/ActiveShopping';
import ListManager from './components/ListManager';
import ProductCatalog from './components/ProductCatalog';
import { storageService } from './services/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('shopping'); // 'shopping' | 'lists' | 'catalog'
  const [db, setDb] = useState(() => storageService.obtenerBaseDeDatos());
  const [activeListId, setActiveListId] = useState(() => {
    const listas = storageService.obtenerListas();
    return listas[0] ? listas[0].id : null;
  });

  // Refrescar estado global desde el servicio
  const refreshDb = () => {
    setDb({ ...storageService.obtenerBaseDeDatos() });
  };

  // Asegurar que haya una lista activa
  useEffect(() => {
    if (!activeListId && db.listas && db.listas.length > 0) {
      setActiveListId(db.listas[0].id);
    }
  }, [db.listas, activeListId]);

  const activeList = (db.listas || []).find(l => l.id === activeListId);
  const activeItems = activeListId ? storageService.obtenerItemsDeLista(activeListId) : [];
  const stats = activeListId ? storageService.obtenerMetricasLista(activeListId) : { porcentaje: 0 };

  // --- Handlers: Catálogo ---
  const handleAddProduct = (data) => {
    storageService.crearProducto(data);
    refreshDb();
  };

  const handleUpdateProduct = (id, updates) => {
    storageService.actualizarProducto(id, updates);
    refreshDb();
  };

  const handleDeleteProduct = (id) => {
    storageService.eliminarProducto(id);
    refreshDb();
  };

  // --- Handlers: Listas ---
  const handleCreateList = (data) => {
    const creada = storageService.crearLista(data);
    refreshDb();
    return creada;
  };

  const handleDeleteList = (id) => {
    storageService.eliminarLista(id);
    if (activeListId === id) {
      const restantes = (db.listas || []).filter(l => l.id !== id);
      setActiveListId(restantes[0] ? restantes[0].id : null);
    }
    refreshDb();
  };

  // --- Handlers: Ítems y Modo Súper ---
  const handleAddItemToList = (listaId, productoId, cantidad) => {
    storageService.agregarProductoALista(listaId, productoId, cantidad);
    refreshDb();
  };

  const handleUpdateItemQuantity = (itemId, cantidad) => {
    storageService.actualizarItemDeLista(itemId, { cantidad });
    refreshDb();
  };

  const handleRemoveItemFromList = (itemId) => {
    storageService.eliminarItemDeLista(itemId);
    refreshDb();
  };

  // RF-4.6: Prevención de desmarcado accidental con confirmación
  const handleToggleInCart = (itemId, nombreProducto) => {
    storageService.alternarConConfirmacion(itemId, () => {
      return window.confirm(`¿Deseas devolver "${nombreProducto || 'este producto'}" a la lista de pendientes?`);
    });
    refreshDb();
  };

  const handleClearPurchased = () => {
    if (!activeListId) return;
    storageService.limpiarCompradosDeLista(activeListId);
    refreshDb();
  };

  const handleFinishList = () => {
    if (!activeListId) return;
    storageService.actualizarLista(activeListId, { estado: 'completada' });
    alert('🎉 ¡Felicidades! Completaste todos los productos de tu lista.');
    refreshDb();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeListTitle={activeList ? activeList.titulo : null}
        progress={activeListId ? stats.porcentaje : null}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 pb-16">
        {activeTab === 'shopping' && (
          <ActiveShopping
            lists={db.listas || []}
            activeListId={activeListId}
            setActiveListId={setActiveListId}
            items={activeItems}
            onToggleInCart={handleToggleInCart}
            onClearPurchased={handleClearPurchased}
            onFinishList={handleFinishList}
            onGoToListBuilder={() => setActiveTab('lists')}
          />
        )}

        {activeTab === 'lists' && (
          <ListManager
            lists={db.listas || []}
            onCreateList={handleCreateList}
            onDeleteList={handleDeleteList}
            activeListId={activeListId}
            setActiveListId={setActiveListId}
            products={db.productos || []}
            listItems={activeItems}
            onAddItemToList={handleAddItemToList}
            onUpdateItemQuantity={handleUpdateItemQuantity}
            onRemoveItemFromList={handleRemoveItemFromList}
            onGoToShopping={() => setActiveTab('shopping')}
          />
        )}

        {activeTab === 'catalog' && (
          <ProductCatalog
            products={db.productos || []}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </main>
    </div>
  );
}
