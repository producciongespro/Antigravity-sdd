# Especificación Principal del Sistema: SuperMarket App (SDD)

> **Documento:** `docs/ESPECIFICACION_PRINCIPAL.md`  
> **Versión:** 2.2.0  
> **Fecha de Actualización:** 2026-10-06  
> **Estado:** Aprobado / Fuente Única de Verdad (SSOT)  
> **Stack Técnico:** React 18+ | JavaScript (ESModules) | Vite | Tailwind CSS | LocalStorage

---

## 📜 Historial de Cambios (Changelog)

| Versión | Fecha | Autor / Solicitante | Descripción del Cambio |
| :--- | :--- | :--- | :--- |
| **v2.0.0** | 2026-10-06 | Equipo Arquitectura | Creación inicial del modelo relacional de 4 módulos (Catálogo, Listas, Vinculación, Modo Súper). |
| **v2.1.0** | 2026-10-06 | Solicitud de Negocio (Sponsor) | Nacionalización / Españolización del Modelo de Datos (`productos`, `listas`, `productos_listas`) con migración automática. |
| **v2.2.0** | 2026-10-06 | Solicitud de Negocio (Sponsor) | **Prevención de Desmarcado Accidental (Anti-dedazos):** Validación con confirmación obligatoria al intentar desmarcar un producto que ya se encuentra en el carrito. |

---

## 1. Visión y Propósito del Producto
Una aplicación web progresiva y táctil diseñada para optimizar las compras del supermercado. El sistema desacopla la despensa general (catálogo de productos) de las listas de compras puntuales, permitiendo planificar listas dinámicas en casa y ejecutarlas de forma eficiente en el supermercado mediante una interfaz de "Modo Compra" con persistencia local resistente a fallos.

---

## 2. Modelo de Dominio y Contrato de Datos (v2.1 en Español)

Toda la información se almacena localmente bajo la clave maestra: `'supermarket_app_db_v2'`.

Estructura de la base de datos local:
```typescript
interface BaseDeDatosLocal {
  productos: Producto[];
  listas: Lista[];
  productos_listas: ProductoLista[];
}
```

### 2.1 Entidad: `Producto`
```typescript
interface Producto {
  id: string;          // Formato: "prod_<timestamp>_<random>"
  nombre: string;      // Nombre del producto (ej: "Leche Semidescremada", obligatorio, trimmed)
  categoria: string;   // Categoría: "Lácteos", "Verduras y Frutas", "Carnes", "Abarrotes", "Limpieza", "Cuidado Personal", "Otros"
  unidad: string;      // Unidad de medida: "unidades", "kg", "litros", "paquete", "bolsa"
  creadoEn: number;    // Timestamp de creación
}
```

### 2.2 Entidad: `Lista`
```typescript
interface Lista {
  id: string;          // Formato: "list_<timestamp>_<random>"
  titulo: string;      // Nombre de la lista (ej: "Súper Quincenal", "Asado Domingo")
  fecha: string;       // Fecha programada (formato ISO YYYY-MM-DD)
  estado: 'borrador' | 'activa' | 'completada';
  creadoEn: number;
}
```

### 2.3 Entidad: `ProductoLista`
```typescript
interface ProductoLista {
  id: string;          // Formato: "item_<timestamp>_<random>"
  listaId: string;     // ID de la lista padre
  productoId: string;  // ID del producto maestro vinculado
  cantidad: number;    // Cantidad requerida (mínimo 1, por defecto 1)
  enCarrito: boolean;  // false = pendiente, true = en el carrito
  notas?: string;      // Nota opcional
}
```

---

## 3. Requerimientos Funcionales por Módulo

### Módulo 1: Catálogo Maestro de Productos (`ProductCatalog`)
- **RF-1.1 (Crear Producto):** Registro de productos con validación obligatoria de `nombre` (no vacío). Si no se indica categoría o unidad, asume valores por defecto (`"Otros"`, `"unidades"`).
- **RF-1.2 (Editar Producto):** Modificación de `nombre`, `categoria` o `unidad`. Los cambios se reflejan inmediatamente.
- **RF-1.3 (Eliminar Producto e Integridad):** Si se elimina un producto que ya forma parte de una lista existente, el sistema debe preservar la lista sin provocar fallos de referencia nula.
- **RF-1.4 (Búsqueda y Filtros):** Filtrar catálogo por `nombre` o `categoria`.

### Módulo 2: Gestor de Listas de Compra (`ListManager`)
- **RF-2.1 (Crear Lista):** Crear lista con `titulo` y `fecha`.
- **RF-2.2 (Listar y Seleccionar):** Mostrar listas disponibles con resumen (cantidad de productos y estado).
- **RF-2.3 (Estados de Lista):** Cambiar `estado` entre `'borrador'`, `'activa'` y `'completada'`.
- **RF-2.4 (Eliminar Lista):** Elimina la lista y todos sus registros en `productos_listas` vinculados en cascada.

### Módulo 3: Vinculación y Armado de Lista (`ListBuilder`)
- **RF-3.1 (Selector Rápido):** Al estar en una lista, el usuario busca en el catálogo y agrega productos con un click.
- **RF-3.2 (Ajuste de Cantidades):** Controles `+` y `-` para subir o bajar la `cantidad` de cada ítem en la lista. Si se vuelve a agregar el mismo producto, suma la cantidad.
- **RF-3.3 (Quitar de la Lista):** Eliminar un producto de la lista actual sin afectar el catálogo maestro.

### Módulo 4: "Compra del Día" / Modo Supermercado (`ActiveShoppingMode`)
- **RF-4.1 (Vista Táctil Rápida):** Vista optimizada para móvil con tarjetas grandes y checkboxes accesibles.
- **RF-4.2 (Check En Carrito - Toggle):** Con un solo toque, el producto cambia de `enCarrito = false` a `enCarrito = true` directamente sin fricción.
- **RF-4.3 (Filtros de Ejecución):**
  - **"Todos":** Muestra la lista completa.
  - **"Pendientes":** Muestra solo lo que falta por comprar (`enCarrito === false`).
  - **"En el Carrito":** Muestra lo que ya se depositó en el carrito (`enCarrito === true`).
- **RF-4.4 (Barra de Progreso en Vivo):** Muestra el porcentaje y conteo: `"Llevas X de Y artículos (Z%)"`.
- **RF-4.5 (Finalizar Compra):** Botón que marca la lista como `'completada'`.
- **RF-4.6 (Prevención de Desmarcado Accidental - Anti-dedazos):** Si un producto ya está marcado (`enCarrito === true`) y el usuario intenta desmarcarlo, el sistema **DEBE solicitar confirmación explícita** al usuario antes de devolverlo a pendientes. Si el usuario cancela, el producto permanece en `enCarrito === true`. Si confirma, pasa a `enCarrito === false`.

---

## 4. Requerimientos No Funcionales y Migración

- **RNF-01 (Persistencia Inmediata):** Cada acción guarda sincrónicamente en `localStorage`.
- **RNF-02 (Tolerancia a Fallos):** Si la clave `supermarket_app_db_v2` contiene datos corruptos, inicializar la estructura limpia con tablas vacías.
- **RNF-03 (Regla de Migración v2.0 -> v2.1):** Si el almacenamiento contiene las claves antiguas en inglés (`products`, `lists`, `items`), el sistema debe migrar automáticamente los datos a las nuevas claves en español.
- **RNF-04 (Semillas Iniciales):** Si la base de datos está totalmente vacía, sembrar productos de demostración en español.
