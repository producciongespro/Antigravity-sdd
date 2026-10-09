# SPEC.md - Especificación Principal del Sistema: SuperCarrito (SDD)

> **Documento:** `docs/SPEC.md`  
> **Versión:** 2.16.0  
> **Fecha de Actualización:** 2026-10-08  
> **Estado:** Aprobado / Fuente Única de Verdad (SSOT)  
> **Stack Técnico:** React 18+ | JavaScript (ESModules) | Vite 6+ | Tailwind CSS v4 | LocalStorage | Vitest & Testing Library

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
| **v2.9.0** | 2026-10-08 | Christian Vargas A. | **Guardrail de Acero en Git Pre-commit Hook:** Automatización e intercepción física mediante hook de Git pre-commit que ejecuta los 44 guardrails maestros en menos de 50ms antes de autorizar cualquier confirmación. |
| **v2.10.0** | 2026-10-08 | Christian Vargas A. | **Arnés Sensorial E2E con Vitest y JSDOM (RF-5.6):** Suite sensorial automatizada simulando la interacción física completa del usuario sobre el DOM, con ejecución integrada en la pestaña 4 del Centro de Auditoría. |
| **v2.11.0** | 2026-10-08 | Christian Vargas A. | **Patrón del Puntero Maestro (RF-5.7):** Consolidación de toda la documentación técnica dentro del directorio `docs/` y establecimiento de `AGENTS.md` en la raíz como único puntero operativo para agentes de IA. |
| **v2.12.0** | 2026-10-08 | Christian Vargas A. | **Estandarización Internacional de Nombres Markdown:** Consolidación de la especificación como `docs/SPEC.md` según los estándares internacionales de la industria y la comunidad de agentes SDD. |
| **v2.13.0** | 2026-10-08 | Christian Vargas A. | **Módulo de Inspección de Agentes y Subagentes Autónomos (RF-5.8):** Incorporación de la 5ª opción en el panel lateral AdminLTE del Centro de Auditoría (Paso 3) para visualizar, auditar y desplegar la orquestación en tiempo real de 3 subagentes especialistas (Centinela de Especificación, Analista de Memoria/ADRs y Probador Sensorial DOM). |
| **v2.14.0** | 2026-10-08 | Christian Vargas A. | **Panel Ejecutivo 360° Estilo Power BI en Auditoría (RF-5.9):** Incorporación de la vista inicial unificada de mando ejecutivo (Posición 0 en Sidebar AdminLTE) con 4 tarjetas KPI estratégicas, 4 widgets gráficos de telemetría (desglose de fases, enjambre de agentes, pipeline funnel y gobernanza viva) y navegación interactiva con drill-down a cada módulo técnico. |
| **v2.15.0** | 2026-10-08 | Christian Vargas A. | **Arnés de Caos e Inyección de Mutaciones SDD (RF-5.10):** Incorporación del Laboratorio de Caos en el Centro de Auditoría (Opción 6 en Sidebar AdminLTE) con 4 vectores de mutación hostil en caliente (corrupción de JSON, huérfanos relacionales, ataques de contrato y commit corrupto), verificación empírica de auto-recuperación sin caídas y telemetría de resiliencia en vivo. |
| **v2.16.0** | 2026-10-08 | Christian Vargas A. | **Sistema de Contrastes y Armonización Visual Adaptativa (WCAG AAA):** Refactorización integral de tokens de color, neutralización de degradados oscuros en modo claro, adaptación de acentos esmeralda/cielo/púrpura/ámbar/rosa a ratios de contraste superiores a 7:1 en fondos claros, preservación de texto blanco en botones de acción saturados y aislamiento de terminales en modo obsidian developer. |

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
  - **Sistema de Contrastes y Ergonomía Visual Adaptativa (WCAG AAA):**
    1. **Modo Claro:** Tarjetas y contenedores con fondo blanco puro (`#ffffff`) o gris suave (`#f8fafc`), bordes nítidos (`#e2e8f0` / `#cbd5e1`), anulación completa de degradados oscuros de Tailwind v4 (`from-slate-800`, `from-purple-950`, `from-sky-950`, `from-emerald-950`, `from-rose-950`), convirtiendo los encabezados y banners ejecutivos (como el Paso 3 y el Cuadro de Mando Power BI) en superficies luminosas con tinte pastel suave (`#ffffff` $\rightarrow$ `#faf5ff`) y bordes nítidos (`#e9d5ff`), y mapeo de textos y badges a escalas saturadas de alto contraste (`emerald-700`, `sky-700`, `purple-700`, `amber-700`, `rose-700`) con ratios de luminancia superiores a 7:1 (WCAG AAA).
    2. **Protección de Botones Primarios:** Los elementos interactivos con fondos saturados oscuros (`bg-indigo-600`, `bg-purple-600`, `bg-rose-600`, `bg-emerald-600`, `bg-sky-600`) preservan estrictamente su tipografía en blanco puro (`#ffffff`), previniendo la inversión involuntaria a texto oscuro.
    3. **Modo Oscuro Profundo (Dark Luxury):** Fondos midnight slate (`#090d16`), tarjetas slate-900 con bordes de acero sutiles (`#1e293b`), y acentos luminosos vibrantes.
    4. **Consolas y Terminales Developer:** Tanto en modo claro como oscuro, las consolas de telemetría de resiliencia y terminales Git preservan su identidad obsidian developer (`#0b0f19`) garantizando contraste inmaculado para la sintaxis de logs coloreados.
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
       - En Paso 3: Opciones `Auditar el Sistema`, `Ver Arnés Sensorial`, `Guardrail de Acero (Git)` y `Arnés E2E (Vitest)`.
    2. **Área de Trabajo Derecha (Workspace):** Despliegue amplio del sub-módulo activo, maximizando el espacio para formularios, filtros, tablas, consola interactiva de Vitest y terminal interactiva de Git.
  - **Excepción de Ergonomía Móvil (Paso 2):** El Paso 2 (¡Vamos al Súper! en tienda) **no adopta menú lateral**; se mantiene en una sola columna vertical con tarjetas táctiles de alta densidad optimizadas para el uso en el pasillo del supermercado con una sola mano.
- **RF-5.6 (Arnés Sensorial End-to-End Automatizado con Vitest y Testing Library):**
  - El sistema cuenta con una suite de pruebas de integración sensoriales (`tests/e2e.test.jsx`) bajo Vitest y JSDOM que valida los flujos completos de usuario en el DOM virtual sin navegadores pesados:
    1. **Navegación HomeHub $\leftrightarrow$ Gestión:** Verificación de las 3 tarjetas de inicio, botón "Gestionar" y botón Home contextual en Header.
    2. **Catálogo con Checkboxes y Carga en Lote:** Selección individual, múltiple y carga de productos al listado activo.
    3. **Modo Compra y Métricas Reactivas:** Clic táctil en productos pendientes, marcado en carrito y actualización en vivo del contador de progreso (`x de y artículos`).
    4. **Protección Anti-dedazos con Modal Táctil:** Intercepción ante el intento de devolver productos del carrito, prueba de cancelación segura (`No, mantener en carrito`) y confirmación efectiva (`Sí, sacar del carrito`).
    5. **Conmutación de Tema Claro/Oscuro:** Alternancia de clases CSS en `document.documentElement` (`dark` $\leftrightarrow$ `light`).
    6. **Centro de Auditoría y Guardrails:** Navegación por las 4 pestañas del Sidebar AdminLTE (Guardrails, Arnés Sensorial, Guardrail de Acero Git y Arnés E2E).
  - **Consola y Ejecutor Interactivo en SPA (Paso 3):** Incorpora la 4ª opción en el Sidebar de `AuditoriaHub.jsx` con botón interactivo de ejecución táctil (`▶ Ejecutar Suite E2E`), métricas de latencia, consola estilo terminal Vitest en vivo y desglose interactivo de selectores DOM de los 6 flujos.
  - Comando de ejecución: `npm run test:e2e` y verificación combinada en `npm test`.
- **RF-5.7 (Patrón de Puntero Maestro y Consolidación de Base de Conocimiento):**
  - Para evitar la proliferación de archivos dispersos en la raíz y mantener la máxima ergonomía estructural:
    1. **Único Punto de Entrada en Raíz:** El archivo `AGENTS.md` reside en la raíz del proyecto como la Constitución Operativa y Puntero Maestro indiscutible para agentes de IA.
    2. **Consolidación en `docs/`:** Todos los documentos de especificación técnica, arquitectura, estándares y bitácora viva (`SPEC.md`, `ARCHITECTURE.md`, `RULES.md`, `MEMORY.md`) se alojan centralizados exclusivamente en el directorio `docs/` con nomenclatura estándar internacional.
    3. **Tabla de Enrutamiento Obligatorio:** `AGENTS.md` define formalmente la matriz de lectura obligatoria que cualquier agente debe consultar antes de procesar tareas de desarrollo.
- **RF-5.8 (Módulo de Inspección de Agentes y Subagentes Autónomos en Auditoría):**
  - La plataforma incorpora en el Centro de Auditoría (`AuditoriaHub.jsx`) una **5ª opción en el panel lateral AdminLTE** denominada `🤖 Agentes & Subagentes`.
  - **Jerarquía de Orquestación Multi-Agente:**
    1. **Agente Orquestador (Antigravity):** Actúa como el cerebro director que gobierna el ciclo de vida, delega tareas especializadas y consolida los veredictos de calidad.
    2. **Subagente 1 · Centinela de Especificación y Guardrails:** Inspecciona la consistencia del contrato (`SPEC.md`), verificando que cada requerimiento funcional cuente con guardrails asociados y cobertura en el arnés.
    3. **Subagente 2 · Analista de Memoria y Decisiones (ADRs):** Audita `docs/MEMORY.md`, calcula el balance histórico de ADRs registrados, estado del roadmap y lecciones aprendidas.
    4. **Subagente 3 · Probador Sensorial E2E (DOM Simulator):** Monitorea la salud de la suite E2E de Vitest, la reactividad de selectores DOM y la tolerancia a fallos de persistencia.
  - **Ejecución Interactiva en Vivo:**
    - Botón táctil interactivo: `▶ Desplegar Enjambre de Subagentes`.
    - Simulación reactiva del ciclo de vida con estados visuales: `Inactivo` $\rightarrow$ `Desplegando en Paralelo` $\rightarrow$ `Completado 100% Verde`.
    - Tarjetas de diagnóstico con barras de progreso, telemetría de latencia, insignias de estado y reporte consolidado de salud arquitectónica.

- **RF-5.9 (Panel Ejecutivo 360° Estilo Power BI en Auditoría):**
  - La plataforma incorpora en el Centro de Auditoría (`AuditoriaHub.jsx`) una **opción principal destacada en la posición 0 del panel lateral AdminLTE** denominada `📊 Panel Ejecutivo 360°`, seleccionada por defecto al ingresar a la pantalla del Paso 3.
  - **4 Tarjetas KPI Ejecutivas Principales:**
    1. **Salud Global del Sistema:** Indicador unificado de cumplimiento SDD (100% / Grado A+ / SSOT Consistente).
    2. **Guardrails Maestros:** Contador de aserciones de seguridad en verde (45/45 Verde, latencia media 35ms).
    3. **Arnés Sensorial E2E:** Flujos de usuario simulados sobre DOM real emulado (7/7 Aprobados, 100% Cobertura).
    4. **Enjambre Multi-Agente:** Estado del orquestador y subagentes especialistas (3 Activos, telemetría y latencia ~390ms).
  - **4 Widgets Gráficos de Telemetría (Estilo Power BI):**
    1. **Desglose de Guardrails por Fase:** Gráfico de barras horizontales de progreso porcentual para las Fases 1 a 5 (Artefactos, Contratos, Gobernanza, Aislamiento y Dominio).
    2. **Matriz de Telemetría Multi-Agente:** Vista ejecutiva de roles, estado operativo (`EN LÍNEA 🟢`) y métricas de cada agente (Antigravity, Centinela, Analista, Sensorial).
    3. **Embudo de Seguridad SDD (Pipeline Funnel):** Visualización de las 4 compuertas secuenciales de calidad (Spec $\rightarrow$ Linters $\rightarrow$ Arnés E2E $\rightarrow$ Guardrail de Acero Pre-commit).
    4. **Gobernanza y Memoria Viva:** Balance general de 19 ADRs activos, 29 pasos de roadmap completados y certificación criptográfica del último commit en Git.
  - **Navegación Interactiva "Drill-Down":**
    - Cada tarjeta KPI o widget contiene botones de acción rápida para saltar directamente a la pestaña técnica profunda correspondiente (`guardrails`, `harness`, `git`, `e2e`, `agentes`).
    - Botón de refresco interactivo de telemetría general con recálculo dinámico y animación reactiva.

- **RF-5.10 (Arnés de Caos e Inyección de Mutaciones SDD - Chaos Engineering):**
  - La plataforma incorpora en el Centro de Auditoría (`AuditoriaHub.jsx`) una **opción en el panel lateral AdminLTE** denominada `🌪️ Arnés de Caos`, en la posición 6 (`activeMenu === 'caos'`) con badge `Chaos Lab`.
  - **Propósito:** Someter en caliente al sistema a fallas inducidas deliberadas para demostrar empíricamente la inviolabilidad de los contratos y la auto-recuperación de la resiliencia [`RNF-02`](#4-requerimientos-no-funcionales-y-migración).
  - **4 Vectores de Inyección de Caos:**
    1. **Vector 1 - Corrupción de Base de Datos (Inyección de JSON Malformado):** Inyecta datos con sintaxis rota en `localStorage`. Valida que `storage.js` invoque la resiliencia RNF-02, capture la excepción y reinicie a un estado limpio sin que la interfaz crashee ni se congele.
    2. **Vector 2 - Huérfano Referencial (Violación de Clave Foránea):** Inyecta vínculos inválidos en `productos_listas` hacia IDs inexistentes. Valida que el motor de lectura filtre de forma segura los nulos evitando errores en cascada `Cannot read properties of undefined`.
    3. **Vector 3 - Intento de Violación de Contrato (Nombre Vacío / Espacios en Blanco):** Fuerza la inserción de un producto con espacios vacíos evadiendo validación HTML. Valida que la compuerta de dominio de `storage.js` rechace formalmente la operación y lance la excepción controlada de RF-1.1.
    4. **Vector 4 - Simulación de Intento de Commit Corrupto (El Guardrail de Acero):** Simula una violación de guardrails y ejecuta la intercepción del hook físico `.githooks/pre-commit`, mostrando la salida de denegación con código de salida `1` en una terminal emulada interactiva.
  - **Telemetría y Registro de Resiliencia en Vivo:**
    - Indicador reactivo de estado: `🟢 Sistema Estable`, `🟡 Caos Activo`, `🛡️ Resiliencia Verificada`.
    - Consola de eventos con estampas de tiempo, excepción interceptada y milisegundos de auto-recuperación.
    - Botón de auto-saneamiento instantáneo `✨ Restaurar Base de Datos Pura & Re-certificar`.

---

## 4. Requerimientos No Funcionales y Migración

- **RNF-01 (Persistencia Inmediata):** Cada acción guarda sincrónicamente en `localStorage`.
- **RNF-02 (Tolerancia a Fallos):** Si la clave `supermarket_app_db_v2` contiene datos corruptos, inicializar la estructura limpia con tablas vacías.
- **RNF-03 (Regla de Migración v2.0 -> v2.1):** Si el almacenamiento contiene las claves antiguas en inglés (`products`, `lists`, `items`), el sistema debe migrar automáticamente los datos a las nuevas claves en español.
- **RNF-04 (Semillas Iniciales):** Si la base de datos está totalmente vacía, sembrar productos de demostración en español.
