/**
 * Storage Service - Motor de persistencia y lógica relacional (v2.2.0 en Español)
 * Fuente de Verdad: docs/ESPECIFICACION_PRINCIPAL.md
 */

export const DB_KEY = 'supermarket_app_db_v2';

// Datos iniciales de demostración en español (RNF-04)
export const PRODUCTOS_DEMO = [
  { id: 'prod_1', nombre: 'Leche Semidescremada', categoria: 'Lácteos', unidad: 'litros', creadoEn: 1696500000000 },
  { id: 'prod_2', nombre: 'Huevos de Pastoreo', categoria: 'Lácteos', unidad: 'paquete', creadoEn: 1696500001000 },
  { id: 'prod_3', nombre: 'Arroz Blanco 99%', categoria: 'Abarrotes', unidad: 'kg', creadoEn: 1696500002000 },
  { id: 'prod_4', nombre: 'Frijoles Negros', categoria: 'Abarrotes', unidad: 'kg', creadoEn: 1696500003000 },
  { id: 'prod_5', nombre: 'Café Tarrazú Molido', categoria: 'Abarrotes', unidad: 'paquete', creadoEn: 1696500004000 },
  { id: 'prod_6', nombre: 'Manzanas Rojas', categoria: 'Verduras y Frutas', unidad: 'kg', creadoEn: 1696500005000 },
  { id: 'prod_7', nombre: 'Pechuga de Pollo', categoria: 'Carnes', unidad: 'kg', creadoEn: 1696500006000 },
  { id: 'prod_8', nombre: 'Detergente Líquido', categoria: 'Limpieza', unidad: 'litros', creadoEn: 1696500007000 },
];

export const LISTAS_DEMO = [
  {
    id: 'list_1',
    titulo: 'Súper Quincenal',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'activa',
    creadoEn: 1696500010000
  }
];

export const ITEMS_DEMO = [
  { id: 'item_1', listaId: 'list_1', productoId: 'prod_1', cantidad: 2, enCarrito: false, notas: 'Deslactosada' },
  { id: 'item_2', listaId: 'list_1', productoId: 'prod_2', cantidad: 1, enCarrito: false, notas: '' },
  { id: 'item_3', listaId: 'list_1', productoId: 'prod_3', cantidad: 2, enCarrito: true, notas: '' },
  { id: 'item_4', listaId: 'list_1', productoId: 'prod_5', cantidad: 1, enCarrito: false, notas: 'Tueste oscuro' },
];

export class SupermarketStorage {
  constructor(storage = (typeof window !== 'undefined' ? window.localStorage : null)) {
    this.storage = storage;
  }

  // --- Carga, Resiliencia y Migración (RNF-02 y RNF-03) ---
  obtenerBaseDeDatos() {
    if (!this.storage) {
      return {
        productos: [...PRODUCTOS_DEMO],
        listas: [...LISTAS_DEMO],
        productos_listas: [...ITEMS_DEMO]
      };
    }

    try {
      const raw = this.storage.getItem(DB_KEY);
      if (!raw) {
        const inicial = {
          productos: [...PRODUCTOS_DEMO],
          listas: [...LISTAS_DEMO],
          productos_listas: [...ITEMS_DEMO]
        };
        this.guardarBaseDeDatos(inicial);
        return inicial;
      }

      const parsed = JSON.parse(raw);

      // RNF-03: Regla de migración automática de v2.0 a v2.1
      if (parsed && (Array.isArray(parsed.products) || Array.isArray(parsed.lists) || Array.isArray(parsed.items))) {
        const migrado = {
          productos: (parsed.products || []).map(p => ({
            id: p.id,
            nombre: p.nombre || p.name || 'Sin nombre',
            categoria: p.categoria || p.category || 'Otros',
            unidad: p.unidad || p.unit || 'unidades',
            creadoEn: p.creadoEn || p.createdAt || Date.now()
          })),
          listas: (parsed.lists || []).map(l => ({
            id: l.id,
            titulo: l.titulo || l.title || 'Lista',
            fecha: l.fecha || l.date || new Date().toISOString().split('T')[0],
            estado: l.estado || l.status || 'activa',
            creadoEn: l.creadoEn || l.createdAt || Date.now()
          })),
          productos_listas: (parsed.items || []).map(i => ({
            id: i.id,
            listaId: i.listaId || i.listId,
            productoId: i.productoId || i.productId,
            cantidad: i.cantidad || i.quantity || 1,
            enCarrito: i.enCarrito !== undefined ? i.enCarrito : (i.inCart || false),
            notas: i.notas || i.notes || ''
          }))
        };
        this.guardarBaseDeDatos(migrado);
        return migrado;
      }

      if (!parsed || !Array.isArray(parsed.productos) || !Array.isArray(parsed.listas) || !Array.isArray(parsed.productos_listas)) {
        throw new Error('Estructura corrupta o incompatible');
      }

      return parsed;
    } catch (e) {
      console.warn('Recuperación de resiliencia: localStorage corrupto. Reiniciando a estructura limpia.', e);
      const limpia = { productos: [], listas: [], productos_listas: [] };
      this.guardarBaseDeDatos(limpia);
      return limpia;
    }
  }

  guardarBaseDeDatos(data) {
    if (this.storage) {
      this.storage.setItem(DB_KEY, JSON.stringify(data));
    }
  }

  // ==================== MÓDULO 1: PRODUCTOS ====================
  obtenerProductos() {
    return this.obtenerBaseDeDatos().productos;
  }

  crearProducto({ nombre, categoria = 'Otros', unidad = 'unidades' }) {
    const recortado = (nombre || '').trim();
    if (!recortado) throw new Error('El nombre del producto no puede estar vacío');

    const db = this.obtenerBaseDeDatos();
    const nuevo = {
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      nombre: recortado,
      categoria: (categoria || 'Otros').trim(),
      unidad: (unidad || 'unidades').trim(),
      creadoEn: Date.now()
    };

    db.productos.push(nuevo);
    this.guardarBaseDeDatos(db);
    return nuevo;
  }

  actualizarProducto(id, updates) {
    const db = this.obtenerBaseDeDatos();
    const idx = db.productos.findIndex(p => p.id === id);
    if (idx === -1) return null;

    if (updates.nombre !== undefined) {
      const recortado = updates.nombre.trim();
      if (!recortado) throw new Error('El nombre del producto no puede estar vacío');
      updates.nombre = recortado;
    }

    db.productos[idx] = { ...db.productos[idx], ...updates };
    this.guardarBaseDeDatos(db);
    return db.productos[idx];
  }

  eliminarProducto(id) {
    const db = this.obtenerBaseDeDatos();
    const inicial = db.productos.length;
    db.productos = db.productos.filter(p => p.id !== id);
    this.guardarBaseDeDatos(db);
    return db.productos.length < inicial;
  }

  // ==================== MÓDULO 2: LISTAS ====================
  obtenerListas() {
    return this.obtenerBaseDeDatos().listas;
  }

  crearLista({ titulo, fecha, estado = 'activa' }) {
    const recortado = (titulo || '').trim();
    if (!recortado) throw new Error('El título de la lista es obligatorio');

    const db = this.obtenerBaseDeDatos();
    const nueva = {
      id: `list_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      titulo: recortado,
      fecha: fecha || new Date().toISOString().split('T')[0],
      estado,
      creadoEn: Date.now()
    };

    db.listas.unshift(nueva);
    this.guardarBaseDeDatos(db);
    return nueva;
  }

  actualizarLista(id, updates) {
    const db = this.obtenerBaseDeDatos();
    const idx = db.listas.findIndex(l => l.id === id);
    if (idx === -1) return null;

    db.listas[idx] = { ...db.listas[idx], ...updates };
    this.guardarBaseDeDatos(db);
    return db.listas[idx];
  }

  eliminarLista(id) {
    const db = this.obtenerBaseDeDatos();
    db.listas = db.listas.filter(l => l.id !== id);
    db.productos_listas = db.productos_listas.filter(item => item.listaId !== id);
    this.guardarBaseDeDatos(db);
    return true;
  }

  // ==================== MÓDULO 3 & 4: PRODUCTOS_LISTAS ====================
  obtenerItemsDeLista(listaId) {
    const db = this.obtenerBaseDeDatos();
    const mapaProductos = new Map(db.productos.map(p => [p.id, p]));

    return db.productos_listas
      .filter(item => item.listaId === listaId)
      .map(item => {
        const prod = mapaProductos.get(item.productoId);
        return {
          ...item,
          nombreProducto: prod ? prod.nombre : '(Producto eliminado)',
          categoria: prod ? prod.categoria : 'Otros',
          unidad: prod ? prod.unidad : 'unidades'
        };
      });
  }

  agregarProductoALista(listaId, productoId, cantidad = 1, notas = '') {
    const db = this.obtenerBaseDeDatos();
    
    const existente = db.productos_listas.find(i => i.listaId === listaId && i.productoId === productoId);
    if (existente) {
      existente.cantidad += Math.max(1, cantidad);
      this.guardarBaseDeDatos(db);
      return existente;
    }

    const nuevoItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      listaId,
      productoId,
      cantidad: Math.max(1, cantidad),
      enCarrito: false,
      notas: notas || ''
    };

    db.productos_listas.push(nuevoItem);
    this.guardarBaseDeDatos(db);
    return nuevoItem;
  }

  actualizarItemDeLista(itemId, updates) {
    const db = this.obtenerBaseDeDatos();
    const idx = db.productos_listas.findIndex(i => i.id === itemId);
    if (idx === -1) return null;

    if (updates.cantidad !== undefined) {
      updates.cantidad = Math.max(1, updates.cantidad);
    }

    db.productos_listas[idx] = { ...db.productos_listas[idx], ...updates };
    this.guardarBaseDeDatos(db);
    return db.productos_listas[idx];
  }

  alternarEnCarrito(itemId) {
    const db = this.obtenerBaseDeDatos();
    const item = db.productos_listas.find(i => i.id === itemId);
    if (!item) return false;

    item.enCarrito = !item.enCarrito;
    this.guardarBaseDeDatos(db);
    return item.enCarrito;
  }

  // RF-4.6: Prevención de desmarcado accidental (Anti-dedazos)
  alternarConConfirmacion(itemId, callbackConfirmacion) {
    const db = this.obtenerBaseDeDatos();
    const item = db.productos_listas.find(i => i.id === itemId);
    if (!item) return false;

    // Si aún no está en el carrito, se marca directo sin pedir confirmación (RF-4.2)
    if (!item.enCarrito) {
      item.enCarrito = true;
      this.guardarBaseDeDatos(db);
      return true;
    }

    // Si ya está en el carrito, solicitamos confirmación explícita (RF-4.6)
    const confirmado = typeof callbackConfirmacion === 'function' ? callbackConfirmacion() : true;
    if (confirmado) {
      item.enCarrito = false;
      this.guardarBaseDeDatos(db);
      return false;
    }

    // Si el usuario canceló (fue un dedazo), permanece protegido en el carrito
    return true;
  }

  eliminarItemDeLista(itemId) {
    const db = this.obtenerBaseDeDatos();
    db.productos_listas = db.productos_listas.filter(i => i.id !== itemId);
    this.guardarBaseDeDatos(db);
    return true;
  }

  limpiarCompradosDeLista(listaId) {
    const db = this.obtenerBaseDeDatos();
    const antes = db.productos_listas.length;
    db.productos_listas = db.productos_listas.filter(i => !(i.listaId === listaId && i.enCarrito === true));
    this.guardarBaseDeDatos(db);
    return antes - db.productos_listas.length;
  }

  obtenerMetricasLista(listaId) {
    const items = this.obtenerItemsDeLista(listaId);
    const total = items.length;
    const enCarrito = items.filter(i => i.enCarrito).length;
    const pendientes = total - enCarrito;
    const porcentaje = total > 0 ? Math.round((enCarrito / total) * 100) : 0;

    return { total, enCarrito, pendientes, porcentaje };
  }

  // Métodos de compatibilidad temporal
  getDatabase() { return this.obtenerBaseDeDatos(); }
  getProducts() { return this.obtenerProductos(); }
  getLists() { return this.obtenerListas(); }
  getListItems(id) { return this.obtenerItemsDeLista(id); }
  getListStats(id) { return this.obtenerMetricasLista(id); }
}

export const storageService = new SupermarketStorage();
