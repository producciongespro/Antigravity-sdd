import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeHub from './components/HomeHub';
import ActiveShopping from './components/ActiveShopping';
import ListManager from './components/ListManager';
import ProductCatalog from './components/ProductCatalog';
import GestionHub from './components/GestionHub';
import AuditoriaHub from './components/AuditoriaHub';
import { storageService } from './services/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'gestion' | 'shopping' | 'auditoria' | 'lists' | 'catalog'
  const [db, setDb] = useState(() => storageService.obtenerBaseDeDatos());
  const [activeListId, setActiveListId] = useState(() => {
    const listas = storageService.obtenerListas();
    return listas[0] ? listas[0].id : null;
  });

  // --- Estado de Tema Claro / Oscuro (Dark / Light Mode) ---
  const [theme, setTheme] = useState(() => storageService.obtenerTema());

  useEffect(() => {
    storageService.guardarTema(theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

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

  const handleBatchAddItemsToList = (listaId, productoIds, cantidad = 1) => {
    storageService.agregarMultiplesProductosALista(listaId, productoIds, cantidad);
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
  const handleToggleInCart = (itemId) => {
    storageService.alternarConConfirmacion(itemId, () => true);
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
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 pb-16">
        {activeTab === 'home' && (
          <HomeHub
            onGoToShopping={() => setActiveTab('shopping')}
            onGoToGestion={() => setActiveTab('gestion')}
            onGoToLists={() => setActiveTab('lists')}
            onGoToCatalog={() => setActiveTab('catalog')}
            onGoToAuditoria={() => setActiveTab('auditoria')}
            activeList={activeList}
            stats={stats}
            db={db}
          />
        )}

        {activeTab === 'auditoria' && (
          <AuditoriaHub />
        )}

        {activeTab === 'gestion' && (
          <GestionHub
            products={db.productos || []}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            lists={db.listas || []}
            onCreateList={handleCreateList}
            onDeleteList={handleDeleteList}
            activeListId={activeListId}
            setActiveListId={setActiveListId}
            listItems={activeItems}
            onAddItemToList={handleAddItemToList}
            onAddMultipleItemsToList={handleBatchAddItemsToList}
            onUpdateItemQuantity={handleUpdateItemQuantity}
            onRemoveItemFromList={handleRemoveItemFromList}
            onGoToShopping={() => setActiveTab('shopping')}
          />
        )}

        {activeTab === 'shopping' && (
          <ActiveShopping
            lists={db.listas || []}
            activeListId={activeListId}
            setActiveListId={setActiveListId}
            items={activeItems}
            onToggleInCart={handleToggleInCart}
            onClearPurchased={handleClearPurchased}
            onFinishList={handleFinishList}
            onGoToListBuilder={() => setActiveTab('gestion')}
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
            onAddMultipleItemsToList={handleBatchAddItemsToList}
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
