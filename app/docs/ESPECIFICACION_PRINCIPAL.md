# Especificación Principal del Sistema: SuperCarrito (SDD)

> **Documento:** `docs/ESPECIFICACION_PRINCIPAL.md`  
> **Versión:** 2.9.0  
> **Fecha de Actualización:** 2026-10-08  
> **Estado:** Aprobado / Fuente Única de Verdad (SSOT)  
> **Stack Técnico:** React 18+ | JavaScript (ESModules) | Vite 6+ | Tailwind CSS v4 | LocalStorage

---

## 📜 Historial de Cambios (Changelog)

| Versión | Fecha | Autor / Solicitante | Descripción del Cambio |
| :--- | :--- | :--- | :--- |
| **v2.0.0** | 2026-10-06 | Equipo Arquitectura | Creación inicial del modelo relacional de 4 módulos (Catálogo, Listas, Vinculación, Modo Súper). |
| **v2.1.0** | 2026-10-06 | Solicitud de Negocio (Sponsor) | Nacionalización / Españolización del Modelo de Datos (`productos`, `listas`, `productos_listas`) con migración automática. |
| **v2.2.0** | 2026-10-06 | Solicitud de Negocio (Sponsor) | **Prevención de Desmarcado Accidental (Anti-dedazos):** Validación con confirmación obligatoria al intentar desmarcar un producto que ya se encuentra en el carrito. |
| **v2.3.0** | 2026-10-08 | Christian Vargas A. | **Evolución de Marca y Flujo Cronológico:** Renombrado formal a **SuperCarrito**. Incorporación de **RF-5.1 (Pantalla Principal y Flujo Cronológico de 2 Pasos: Gestión en casa $\rightarrow$ ¡Vamos al Súper! en tienda)**. |
| **v2.4.0** | 2026-10-08 | Christian Vargas A. | **Consolidación de UX y Centro de Control SDD:** Header minimalista sin pestañas redundantes en Home (RF-5.2), botón contextual `← Volver al Inicio`, tercer acceso a Laboratorio SDD en Home y creación del Panel Web de Guardrails interactivo (`tests/guardrails.html`) (RF-5.3). |
| **v2.5.0** | 2026-10-08 | Christian Vargas A. | **Centro Unificado de Gestión en Dos Secciones (RF-5.4):** Botón único de acción 'Gestionar' en la tarjeta de inicio del Paso 1, y pantalla unificada dividida verticalmente: 1. Catálogo de Despensa arriba (alta, edición, eliminación) y 2. Mantenimiento y Armado de Listas abajo. |
| **v2.5.1** | 2026-10-08 | Christian Vargas A. | **Selector de Catálogo con Checkboxes y Carga en Lote (RF-3.1):** Reemplazo de la caja de texto solitaria por visualización directa de productos con casillas de verificación (checkboxes), selección múltiple simultánea, botón de agregar en lote, contador dinámico de ítems seleccionados y botón de seleccionar/deseleccionar todos. |
| **v2.5.2** | 2026-10-08 | Christian Vargas A. | **Modo Claro/Oscuro y Header Minimalista Estricto (RF-5.2):** Botón selector de tema Claro/Oscuro (Sol/Luna) en la barra superior. En subpantallas de detalle, solo coexisten el botón de tema y el botón de Inicio con icono Home a su derecha. Eliminación de textos de bienvenida y métricas en el header. |
| **v2.6.0** | 2026-10-08 | Christian Vargas A. | **Centro Integrado de Auditoría, Guardrails y Arneses en la SPA (RF-5.3):** Integración nativa del Paso 3 dentro de la misma aplicación (`activeTab === 'auditoria'`), compartiendo el Header institucional, el control de tema Claro/Oscuro y el botón Home de retorno, con ejecución interactiva de los 38 guardrails y las 7 pruebas sensoriales. |
| **v2.7.0** | 2026-10-08 | Christian Vargas A. | **Disposición de Navegación Lateral (Sidebar estilo AdminLTE) en Mantenimiento (RF-5.5):** Estructura de dos columnas (panel izquierdo de menú con opciones e insignias numéricas + área de trabajo derecha) para los módulos de administración: Paso 1 (Catálogo vs Armado de Listas) y Paso 3 (Auditar el Sistema vs Arnés Sensorial). El Paso 2 (Modo Súper en tienda) se preserva deliberadamente en disposición vertical simple para manipulación con una sola mano táctil. |
| **v2.8.0** | 2026-10-08 | Christian Vargas A. | **Modal Táctil de Confirmación Anti-dedazos en Modo Súper (RF-4.6):** Reemplazo del cuadro genérico del navegador (`window.confirm`) por una ventana modal personalizada, táctil y de alto contraste (`ConfirmModal.jsx`), con botones grandes ergonómicos para confirmar o cancelar la devolución de productos del carrito con el pulgar. |
| **v2.9.0** | 2026-10-08 | Christian Vargas A. | **Tercera Opción en Auditoría: Guardrail de Acero (Git Pre-commit Hook & Terminal) (RF-5.3 / RF-5.5):** Incorporación de la 3ª opción en el panel lateral de auditoría para visualizar en la interfaz gráfica el estado de blindaje del repositorio, último commit certificado (`47b9dc6`), simulación en vivo de intercepción de commits en consola interactiva, visor web embebido (iframe) y código fuente del hook. |

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
- **RF-3.1 (Selector Visual con Checkboxes y Carga en Lote):** Al estar en una lista, el usuario visualiza directamente todos los productos del catálogo maestro disponibles con casillas de verificación (checkboxes). Permite seleccionar múltiples productos simultáneamente y agregarlos en lote mediante el botón `"Agregar a la Lista"`, además de disponer de un buscador opcional para filtrado rápido y selector global ("Seleccionar todos" / "Deseleccionar todos").
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
- **RF-4.6 (Prevención de Desmarcado Accidental - Anti-dedazos con Modal Táctil):** Si un producto ya está marcado (`enCarrito === true`) y el usuario intenta desmarcarlo, el sistema **DEBE solicitar confirmación explícita** al usuario antes de devolverlo a pendientes.
  - **Experiencia de Usuario Nativa (Modal Táctil):** La confirmación se realiza mediante una ventana modal personalizada (`ConfirmModal.jsx`), con diseño accesible, botones táctiles grandes de alto contraste y soporte de temas, evitando por completo alertas genéricas del navegador (`window.confirm`).
  - **Manejo de Respuestas:** Si el usuario pulsa `"Sí, sacar del carrito"`, el ítem pasa a `enCarrito === false`. Si pulsa `"No, mantener en carrito"`, o presiona `Escape` o fuera del modal, el producto permanece protegido en `enCarrito === true`.

### Módulo 5: Pantalla Principal y Flujo de Navegación (`HomeHub`)
- **RF-5.1 (Pantalla Principal con Flujo de 3 Módulos):** La interfaz proporciona un Centro de Control como punto de entrada organizado en tres momentos claros:
  1. **Paso 1 · Gestión y Catálogos (En Casa):** Preparar la despensa general y planificar las listas de compras antes de salir.
  2. **Paso 2 · ¡Vamos al Súper! (En el Pasillo):** Modo compra táctil con métricas en tiempo real y protección anti-dedazos (RF-4.6).
  3. **Paso 3 · Laboratorio SDD y Calidad:** Acceso directo al arnés de pruebas y al panel web de guardrails para validación interactiva de contratos.
- **RF-5.2 (Header Minimalista Estricto y Control de Tema Claro / Oscuro):**
  - **Lado Izquierdo:** Icono de carrito, marca `"SuperCarrito"`, versión formal (`"SDD v2.5"`) y texto de detalle de lista activa.
  - **Lado Derecho (Ventana Principal - Home):** Contiene **únicamente el botón de alternancia de Tema Claro / Oscuro** (Sol ☀️ / Luna 🌙). Se elimina cualquier saludo o texto redundante de bienvenida.
  - **Lado Derecho (Modo Detalle / Subpantallas de Gestión y Compra):** Contiene **estrictamente dos funciones**:
    1. Botón de alternancia de **Tema Claro / Oscuro**.
    2. A la derecha del tema: Botón compacto con **ícono de Home / Inicio** para `Volver al Inicio` a la ventana principal.
  - **Regla de Aislamiento de Header:** La barra superior no debe contener textos extensos, métricas ni títulos de navegación redundantes; cualquier dato adicional (como progreso de compra, filtros o subtítulos de sección) reside exclusivamente en el cuerpo interno de la ventana correspondiente.
- **RF-5.3 (Centro Integrado de Auditoría, Guardrails y Arneses en la SPA):**
  - La plataforma integra el Paso 3 directamente dentro de la aplicación (`activeTab === 'auditoria'`), compartiendo el Header institucional de SuperCarrito, el alternador de tema Claro / Oscuro y el botón con icono de Home para volver al inicio con un solo clic.
  - Dentro de esta vista (`AuditoriaHub.jsx`) se presentan tres opciones operativas:
    1. **Auditar el Sistema:** Ejecución en memoria de los 40 Guardrails Maestros en 5 fases.
    2. **Ver Arnés Sensorial:** Ejecución instantánea de las 7 pruebas unitarias contra el motor relacional.
    3. **Guardrail de Acero (Git):** Visualización del estado del Pre-commit Hook, commit certificado (`47b9dc6`), consola interactiva para simular autorizaciones y bloqueos físicos en tiempo real, visor web embebido (iframe) y código del script `.githooks/pre-commit`.
  - Enlaces secundarios a reportes web independientes (`tests/guardrails.html` y `tests/harness.html`).
- **RF-5.4 (Centro Unificado de Gestión):**
  - La tarjeta de inicio del Paso 1 cuenta con **un único botón de acción** denominado `"Gestionar"`.
  - Al ingresar, despliega la interfaz unificada (`GestionHub.jsx`) que integra el Catálogo de Despensa (alta, edición, eliminación) y el Mantenimiento y Armado de Listas de compras.
- **RF-5.5 (Disposición de Navegación Lateral estilo AdminLTE para Mantenimiento):**
  - Para los módulos de administración y mantenimiento (**Paso 1: Gestión** y **Paso 3: Auditoría y Arneses**), la interfaz implementa un diseño de dos columnas:
    1. **Panel Lateral Izquierdo (Sidebar):** Menú vertical con opciones claras, iconos identificativos y badges con conteo dinámico de elementos.
       - En Paso 1: Opciones `Catálogo` y `Armado de Listas`.
       - En Paso 3: Opciones `Auditar el Sistema`, `Ver Arnés Sensorial` y `Guardrail de Acero (Git)`.
    2. **Área de Trabajo Derecha (Workspace):** Despliegue amplio del sub-módulo activo, maximizando el espacio para formularios, filtros, tablas y terminal interactiva.
  - **Excepción de Ergonomía Móvil (Paso 2):** El Paso 2 (¡Vamos al Súper! en tienda) **no adopta menú lateral**; se mantiene en una sola columna vertical con tarjetas táctiles de alta densidad optimizadas para el uso en el pasillo del supermercado con una sola mano.

---

## 4. Requerimientos No Funcionales y Migración

- **RNF-01 (Persistencia Inmediata):** Cada acción guarda sincrónicamente en `localStorage`.
- **RNF-02 (Tolerancia a Fallos):** Si la clave `supermarket_app_db_v2` contiene datos corruptos, inicializar la estructura limpia con tablas vacías.
- **RNF-03 (Regla de Migración v2.0 -> v2.1):** Si el almacenamiento contiene las claves antiguas en inglés (`products`, `lists`, `items`), el sistema debe migrar automáticamente los datos a las nuevas claves en español.
- **RNF-04 (Semillas Iniciales):** Si la base de datos está totalmente vacía, sembrar productos de demostración en español.
