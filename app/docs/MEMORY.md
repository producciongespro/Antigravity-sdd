# MEMORY.md - Bitácora de Memoria del Proyecto SuperCarrito

> **Propósito:** Registro persistente de contexto, decisiones arquitectónicas, lecciones aprendidas y estado actual del proyecto para humanos y agentes de IA.  
> **Última Actualización:** 2026-10-08  
> **Estado del Laboratorio:** Guardrails Híbridos en 5 Fases Activos $\rightarrow$ 40/40 Verificaciones en Verde 🟢 (`npm run check:guardrails`).

---

## 📌 1. Resumen Ejecutivo del Proyecto
- **Nombre:** SuperCart (Laboratorio de Spec-Driven Development, Arneses y Agentes).
- **Repositorio Git Local:** `C:\xampp\htdocs\Antigravity-sdd`.
- **Dominio:** Aplicación web para optimizar compras en el supermercado con modelo relacional (Catálogo Maestro $\rightarrow$ Listas $\rightarrow$ Vinculación $\rightarrow$ Modo Súper táctil).
- **Persistencia:** `localStorage` bajo la clave `'supermarket_app_db_v2'`.
- **Stack:** React 18, Vite, Tailwind CSS v4 (`@tailwindcss/postcss`), JavaScript (ESModules).
- **Única Fuente de Verdad:** [docs/SPEC.md](SPEC.md) (Versión 2.12.0 en Español).
- **Arnés de Pruebas Visual:** [tests/harness.html](tests/harness.html) (Ejecutable en `http://localhost:3000/tests/harness.html`).
- **Guardrails Automatizados:** [scripts/guardrails.js](scripts/guardrails.js) (`npm run check:guardrails` / `npm test`).
- **Arquitectura y Estándares:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) y [RULES.md](RULES.md).

---

## 🏛️ 2. Registro de Decisiones de Arquitectura (ADRs)

### ADR-01: Modelo Relacional Desacoplado
- **Decisión:** Separar la despensa general (`productos`) de las compras puntuales (`listas` y `productos_listas`).
- **Motivo:** Permite planificar compras dinámicas reutilizando productos frecuentes.

### ADR-02: Internacionalización / Nacionalización al Español (v2.1.0)
- **Decisión:** Renombrar formalmente todas las entidades de inglés a español (`Product` $\rightarrow$ `Producto`, `ShoppingList` $\rightarrow$ `Lista`, `ListDetailItem` $\rightarrow$ `ProductoLista`).
- **Motivo:** Requerimiento del sponsor para alinear el software con el lenguaje de negocio del usuario final.

### ADR-03: Prevención de Desmarcado Accidental (Anti-dedazos) (v2.2.0)
- **Decisión:** Incorporar `alternarConConfirmacion` en el servicio y UI para requerir confirmación explícita solo cuando el producto ya está en `enCarrito === true`.
- **Motivo:** Evitar que toques involuntarios en la pantalla del móvil devuelvan artículos comprados a la lista de pendientes.

### ADR-04: Taxonomía Estandarizada del Arnés de Pruebas
- **Decisión:** Organizar el arnés agrupando las pruebas en 5 secciones temáticas y estandarizando los identificadores con los códigos formales de la especificación (`RNF-02`, `RNF-03`, `RF-1.1`, `RF-2.1`, `RF-3.1`, `RF-4.2`, `RF-4.6`).
- **Motivo:** Evitar mezclas inconsistentes (`MOD-*` vs `RF-*`), facilitando la legibilidad técnica y la auditoría tanto para humanos como para agentes.

### ADR-05: Guardrails Híbridos en 5 Fases y Formalización de Estándares (v2.3.0)
- **Decisión:** Implementar el motor de guardrails `scripts/guardrails.js` ejecutable por CLI (`npm run check:guardrails` y `npm test`), que unifica:
  1. Integridad de artefactos SDD obligatorios.
  2. Integridad semántica de la especificación (SSOT).
  3. Memoria viva y gobernanza operativa (`MEMORY.md`, `AGENTS.md`, `RULES.md`).
  4. Linter de dominio, aislamiento estricto de capas (la UI no accede a `localStorage` directo) y detección de sentencias `debugger;`.
  5. Ejecución headless del arnés de pruebas sobre `MockStorage` en memoria (40ms).
  Junto con la creación de `RULES.md` y `docs/ARCHITECTURE.md`.
- **Motivo:** Proporcionar una barrera física e infalible (Nivel 2 de Guardrails) que previene alucinaciones de IA y regresiones tanto en desarrollo local como en pipelines de CI/CD.

### ADR-06: Evolución de Marca a SuperCarrito y Flujo Cronológico de Navegación (v2.3.0)
- **Decisión:** Renombrar la marca formal a **SuperCarrito** e implementar la pantalla principal `HomeHub.jsx` estructurada en un flujo cronológico de 2 pasos:
  1. Paso 1 · Gestión y Catálogos (En casa: despensa y armado de listas).
  2. Paso 2 · ¡Vamos al Súper! (En el pasillo: modo compra táctil con protección anti-dedazos RF-4.6).
- **Motivo:** Coherencia semántica total con el dominio de negocio en español y optimización de la experiencia de usuario orientada a los momentos reales de compra propuesta por Christian Vargas A.

### ADR-07: Consolidación de UX y Centro de Control SDD Visual (v2.4.0)
- **Decisión:**
  1. Rediseñar [`Header.jsx`](src/components/Header.jsx) para ser minimalista en Home (ocultando pestañas repetitivas) y desplegar un botón visible `← Volver al Inicio` al entrar a cualquier subpantalla (RF-5.2).
  2. Incorporar el **Paso 3 (Laboratorio SDD y Calidad)** como tercera tarjeta de acceso en [`HomeHub.jsx`](src/components/HomeHub.jsx).
  3. Implementar el **Panel Visual de Guardrails** ([`tests/guardrails.html`](tests/guardrails.html)) ejecutable en el navegador con interfaz gráfica, métricas de latencia en vivo y barras de progreso animadas (RF-5.3).
- **Motivo:** Brindar a desarrolladores y evaluadores humanos la misma capacidad de auditoría visual e inmediata de los guardrails que tienen los comandos CLI en terminal, reduciendo al mismo tiempo la fricción visual y cognitiva en la pantalla de inicio propuesta por Christian Vargas A.

### ADR-08: Centro Unificado de Gestión en Dos Secciones Verticales (v2.5.0)
- **Decisión:**
  1. Sustituir los dos botones individuales (`Catálogo` y `Mis Listas`) en la tarjeta del Paso 1 de [`HomeHub.jsx`](src/components/HomeHub.jsx) por **un único botón de acción denominado "Gestionar"**.
  2. Crear la pantalla unificada [`GestionHub.jsx`](src/components/GestionHub.jsx) dividida verticalmente en dos secciones jerárquicas:
     - **Sección 1 (Superior):** Catálogo de Productos de Despensa (alta, edición, eliminación y búsqueda).
     - **Sección 2 (Inferior):** Mantenimiento y Armado de Listas (creación, selección de listas, vinculación de artículos con selector de cantidades y botón para saltar al modo compra).
- **Motivo:** Evitar la fragmentación y duplicidad cognitiva de navegación entre dos vistas separadas para la etapa de preparación en el hogar, consolidando la experiencia en un solo flujo continuo propuesto por Christian Vargas A.

### ADR-09: Selector de Catálogo con Checkboxes y Carga en Lote (v2.5.1)
- **Decisión:**
  1. Reemplazar la caja de texto solitaria en el armado de listas por un **selector visual directo** donde todos los artículos del catálogo están visibles de entrada con casillas de verificación (`checkboxes`).
  2. Implementar selección múltiple simultánea, botón de agregar en lote (`+ Agregar Seleccionados (N)`), botón `"Seleccionar todos"` / `"Deseleccionar todos"` y buscador opcional de filtrado rápido.
  3. Extender el servicio de almacenamiento con `agregarMultiplesProductosALista(listaId, productoIds, cantidad)` para inserción atómica en un único ciclo de persistencia.
- **Motivo:** Reducir la fricción y el esfuerzo cognitivo del usuario al armar listas, permitiendo ver todo el inventario de despensa de una vez y seleccionar múltiples productos con simples toques en lugar de tener que escribir individualmente en un buscador, propuesto por Christian Vargas A.

### ADR-10: Modo Claro/Oscuro y Header Minimalista Estricto (v2.5.2)
- **Decisión:**
  1. Integrar control global de Tema Claro / Oscuro con persistencia en `SupermarketStorage` (`obtenerTema` / `guardarTema`) y tema oscuro por defecto (`dark`) para confort visual.
  2. Depurar el encabezado superior ([`Header.jsx`](src/components/Header.jsx)) para dejar exclusivamente a la izquierda el isotipo, nombre "SuperCarrito", badge "SDD v2.5" y subtítulo de lista activa.
  3. En la ventana principal (Home), el extremo derecho contiene **únicamente el botón de alternancia de Tema Claro / Oscuro** (Sol/Luna).
  4. En las subpantallas de detalle (Gestión, Súper, Listas), el extremo derecho contiene **estrictamente dos funciones**: el botón de Tema Claro / Oscuro y, a su derecha, el botón con **ícono de Inicio (`Home`)** para volver al inicio.
  5. Desterrar textos de bienvenida, métricas y títulos de sección del header; todo dato contextual adicional se renderiza adentro de la ventana correspondiente.
- **Motivo:** Cumplir la directiva de experiencia de usuario de Christian Vargas A., reduciendo sobrecarga visual, permitiendo modo oscuro nativo para confort visual, y estandarizando la navegación de retorno mediante un icono Home intuitivo y minimalista.

### ADR-11: Centro Integrado de Auditoría, Guardrails y Arneses en la SPA (v2.6.0)
- **Decisión:**
  1. Integrar el Paso 3 (Laboratorio SDD, Guardrails y Arnés Sensorial) como una vista interna nativa de React ([`AuditoriaHub.jsx`](src/components/AuditoriaHub.jsx)) bajo la ruta de estado `activeTab === 'auditoria'`.
  2. Sustituir los enlaces externos que abrían pestañas ajenas en el navegador por un botón de acción principal ("Auditar Sistema") idéntico al patrón de los Pasos 1 y 2.
  3. Mantener de forma continua e ininterrumpida la barra superior de SuperCarrito: conmutador de Tema Claro / Oscuro activo y botón con icono de Home (`Home`) para volver al inicio con un solo clic.
  4. Proveer dentro de la vista pestañas para ejecutar en vivo tanto los 38 Guardrails maestros (con animación y métricas de milisegundos) como el Arnés Sensorial con 7 pruebas unitarias ejecutadas directamente en memoria contra `SupermarketStorage`.
  5. Mantener al pie de la vista enlaces discretos opcionales a los archivos estáticos independientes (`tests/guardrails.html` y `tests/harness.html`) para auditorías aisladas.
- **Motivo:** Resolver la fragmentación de la experiencia de usuario reportada por Christian Vargas A., eliminando la sensación de "salirse de la app" a otro host y garantizando que toda la auditoría de calidad SDD ocurra armónicamente dentro de la misma aplicación, respetando el diseño, el tema y la navegación unificada.

### ADR-12: Disposición de Navegación Lateral (Sidebar estilo AdminLTE) en Mantenimiento (v2.7.0)
- **Decisión:**
  1. Adoptar el patrón arquitectónico de panel lateral de navegación (Sidebar estilo AdminLTE / Dashboard) en dos columnas para los módulos de administración y escritorio:
     - **Paso 1 ([`GestionHub.jsx`](src/components/GestionHub.jsx)):** Menú lateral izquierdo con opciones `Catálogo` e `Armado de Listas` (con badges numéricos reactivos), y área de trabajo derecha con el catálogo o constructor de listas activo.
     - **Paso 3 ([`AuditoriaHub.jsx`](src/components/AuditoriaHub.jsx)):** Menú lateral izquierdo con opciones `Auditar el Sistema` (39 guardrails) y `Ver Arnés Sensorial` (7 pruebas unitarias), con badges dinámicos y enlaces independientes al pie del menú.
  2. **Excepción Estricta de Usabilidad Física (Paso 2):** Preservar deliberadamente el Paso 2 ([`ActiveShopping.jsx`](src/components/ActiveShopping.jsx)) en flujo vertical simplificado de una sola columna sin menús laterales, optimizado para manipulación rápida con el pulgar de una sola mano mientras se empuja el carrito en el supermercado.
- **Motivo:** Cumplir la directiva de diseño de Christian Vargas A., profesionalizando el flujo de trabajo en casa o escritorio donde el usuario requiere visión jerárquica clara y cambio ágil de contexto, sin sacrificar la ergonomía móvil crítica en tienda.

### ADR-13: Ventana Modal Táctil de Confirmación Anti-dedazos en Modo Súper (v2.8.0)
- **Decisión:**
  1. Erradicar el cuadro de diálogo síncrono y bloqueante del navegador (`window.confirm`) en la regla anti-dedazos (RF-4.6).
  2. Crear el componente reutilizable [`ConfirmModal.jsx`](src/components/ConfirmModal.jsx) con fondo semitransparente con desenfoque (`backdrop-blur-sm`), tarjeta con badge ámbar de advertencia, animación de escala suave, soporte de tecla `Escape` y dos botones táctiles grandes de alto contraste:
     - Botón de cancelación seguro: *"No, mantener en carrito"*.
     - Botón de confirmación destacado: *"Sí, sacar del carrito"*.
  3. Desacoplar la interacción en [`ActiveShopping.jsx`](src/components/ActiveShopping.jsx) para que la confirmación ocurra asíncronamente en el estado de React, manteniendo la integridad del contrato con `storageService.alternarConConfirmacion` en el arnés sensorial y los guardrails.
- **Motivo:** Reemplazar el cuadro estéril y anticuado del navegador reportado por Christian Vargas A. por una experiencia visual moderna, fluida y ergonómicamente diseñada para el uso real en el supermercado.

### ADR-14: Guardrail de Acero Físico en Git (Pre-commit Hook) (v2.8.0)
- **Decisión:**
  1. Implementar un script de Git Hook de pre-commit versionado en `.githooks/pre-commit` con permisos de ejecución.
  2. Configurar Git para usar este directorio mediante `git config core.hooksPath .githooks` y documentar el comando `npm run setup:hooks` en `package.json`.
  3. El hook intercepta automáticamente cualquier intento de `git commit` ejecutando `node scripts/guardrails.js`.
  4. Si existe una sola verificación fallida (fases 1 a 5), el script termina con código de salida `1` y Git aborta físicamente el commit, bloqueando la entrada de código que viole el contrato SDD.
- **Motivo:** Materializar el Nivel 2 de Guardrails (Automatización Forzosa) solicitado por Christian Vargas A., eliminando la dependencia de la memoria del programador o del agente de IA y estableciendo una barandilla infranqueable a nivel del sistema de control de versiones.

### ADR-15: Tercera Opción en Auditoría: Guardrail de Acero (Git & Terminal Interactiva) (v2.9.0)
- **Decisión:**
  1. Incorporar una tercera opción en el menú lateral de [`AuditoriaHub.jsx`](src/components/AuditoriaHub.jsx) denominada **"Guardrail de Acero (Git)"** con badge de estado `"Activo"`.
  2. Implementar en el área de trabajo una vista trifásica organizada en sub-pestañas:
     - **Consola y Simulador del Hook:** Ventana interactiva estilo terminal con botones para simular en tiempo real una intercepción exitosa (Commit OK) o un intento fallido (Ver Rechazo con Exit Code 1).
     - **Visor Web Embebido:** Despliegue de los paneles HTML de auditoría (`/tests/guardrails.html`) en un iframe fluido dentro de la SPA sin requerir apertura de ventanas externas.
     - **Script Shell:** Visualizador con sintaxis de `.githooks/pre-commit` para transparencia pedagógica.
  3. Exponer el commit certificado (`47b9dc6`), rama activa, autor y métricas de latencia de 42ms directamente en la UI.
- **Motivo:** Brindar visibilidad gráfica y didáctica completa al sistema de control de versiones Git, transformando un mecanismo que normalmente vive oculto en la consola en una experiencia interactiva para el usuario.

### ADR-16: Arnés Sensorial End-to-End (E2E) con Vitest y Testing Library (v2.10.0)
- **Decisión:**
  1. Configurar un entorno de pruebas sensoriales basado en Vitest, JSDOM y `@testing-library/react` ([`vitest.config.js`](vitest.config.js) y [`tests/setup.js`](tests/setup.js)).
  2. Implementar una suite exhaustiva de 6 pruebas E2E ([`tests/e2e.test.jsx`](tests/e2e.test.jsx)) que montan directamente el componente raíz [`App.jsx`](src/App.jsx) y simulan las interacciones físicas reales del usuario sobre el DOM (clics en botones, selección de casillas de verificación, conmutación de temas, modales de confirmación y navegación lateral).
  3. Registrar formalmente el comando `npm run test:e2e` en `package.json`, e integrar la ejecución combinada en `npm test` (`node scripts/guardrails.js && vitest run`).
  4. Incorporar la presencia de la suite E2E en las 44 verificaciones del script de Guardrails ([`scripts/guardrails.js`](scripts/guardrails.js)) y en el Centro de Auditoría de la SPA ([`AuditoriaHub.jsx`](src/components/AuditoriaHub.jsx)).
  5. Incorporar en el Centro de Auditoría ([`AuditoriaHub.jsx`](src/components/AuditoriaHub.jsx)) la 4ª opción de navegación lateral ("Arnés E2E (Vitest)") con botón de re-ejecución táctil interactiva (`▶ Ejecutar Suite E2E`), consola estilo terminal Vitest en vivo y desglose de selectores DOM de los 6 flujos de usuario evaluados.
- **Motivo:** Cerrar la brecha entre las pruebas unitarias en memoria y la interacción visual real en pantalla, otorgando al sistema un verdadero órgano sensorial interactivo que certifique la experiencia del usuario sin depender de navegadores pesados ni pruebas manuales lentas.

### ADR-17: Patrón de Puntero Maestro y Consolidación de Documentación en `docs/` (v2.11.0)
- **Decisión:**
  1. Mantener en la raíz del proyecto exclusivamente `AGENTS.md` actuando como Constitución Operativa y **Puntero Maestro** de contexto.
  2. Consolidar todos los archivos Markdown de conocimiento técnico, arquitectónico y estándares dentro de la carpeta `docs/` ([`docs/SPEC.md`](SPEC.md), [`docs/ARCHITECTURE.md`](ARCHITECTURE.md), [`docs/RULES.md`](RULES.md) y [`docs/MEMORY.md`](MEMORY.md)).
  3. Estructurar en `AGENTS.md` una tabla de lectura obligatoria con orden de consulta estricto para agentes de IA al iniciar sesión.
  4. Actualizar el script de Guardrails ([`scripts/guardrails.js`](../scripts/guardrails.js)), el Centro de Auditoría ([`AuditoriaHub.jsx`](../src/components/AuditoriaHub.jsx)) y el panel visual ([`tests/guardrails.html`](../tests/guardrails.html)) para auditar las nuevas rutas unificadas en `docs/`.
- **Motivo:** Mantener una estructura de carpetas limpia y profesional, evitando la dispersión de documentos en la raíz y garantizando que cualquier agente de IA descubra de inmediato las directivas de comportamiento y el mapa completo del sistema.

### ADR-18: Estandarización Internacional de Nombres Markdown: SPEC.md (v2.12.0)
- **Decisión:**
  1. Renombrar y consolidar el artefacto de especificación funcional como [`docs/SPEC.md`](SPEC.md) en lugar de nombres localizados (`ESPECIFICACION_PRINCIPAL.md`), adoptando la convención internacional estandarizada de proyectos de ingeniería de software y agentes de IA.
  2. Preservar la simetría y legibilidad universal de la documentación técnica centralizada:
     - `SPEC.md`: Especificación funcional, modelo de datos y reglas de negocio (SSOT).
     - `ARCHITECTURE.md`: Diagramas C4, modelo entidad-relación y flujo desacoplado.
     - `RULES.md`: Reglas de codificación, stack y Criterios de Aceptación (DoD).
     - `MEMORY.md`: Bitácora viva de contexto, ADRs y roadmap.
     - `AGENTS.md`: Constitución y reglamento operativo del agente de IA.
     - `README.md`: Portada y guía rápida de puesta en marcha.
  3. Actualizar todas las referencias en scripts de guardrails, arnés en memoria, componentes React y guías maestras para auditar `docs/SPEC.md`.
- **Motivo:** Alinear el proyecto con las mejores prácticas globales del ecosistema de software y facilitar la interoperabilidad con herramientas automatizadas, LLMs y desarrolladores de cualquier procedencia lingüística, manteniendo el contenido íntegro y documentado en español.

### ADR-19: Módulo de Inspección y Orquestación de Agentes y Subagentes Autónomos (v2.13.0)
- **Decisión:**
  1. Incorporar la 5ª opción en el panel lateral AdminLTE del Centro de Auditoría (Paso 3) denominada **Agentes & Subagentes** (`activeMenu === 'agentes'`).
  2. Implementar visualización y auditoría en vivo del enjambre multi-agente de calidad:
     - **Agente Orquestador Principal (Antigravity):** Gobierna el ciclo de vida, delega tareas de auditoría especializada a 3 subagentes y consolida veredictos de calidad sin colisiones de contexto.
     - **Centinela de Especificación y Guardrails (`sub-spec`):** Audita `docs/SPEC.md` vs 45 aserciones de guardrails.
     - **Analista de Memoria y Decisiones (`sub-memory`):** Audita los 19 ADRs y roadmap en `docs/MEMORY.md`.
     - **Probador Sensorial E2E (`sub-sensorial`):** Audita 7 flujos de usuario sobre el DOM bajo Vitest/JSDOM.
  3. Proveer control reactivo de despacho (`▶ Desplegar Enjambre de Subagentes`) con telemetría en tiempo real, latencia y consola de logs de misión por subagente.
  4. Ampliar la suite sensorial E2E a 7 flujos de usuario completos (`tests/e2e.test.jsx`) y certificar 45/45 guardrails en verde.
- **Motivo:** Materializar conceptual y visualmente para el sponsor y desarrolladores cómo opera la orquestación multi-agente en una arquitectura SDD, separando responsabilidades entre agentes directores y subagentes especialistas para evitar la sobrecarga de contexto.

### ADR-20: Panel Ejecutivo 360° Estilo Power BI en el Centro de Auditoría (v2.14.0)
- **Decisión:**
  1. Incorporar la Opción 0 destacada en el Sidebar AdminLTE del Centro de Auditoría (`activeMenu === 'dashboard'`) denominada **Panel Ejecutivo 360°** con badge identificador *Power BI*.
  2. Establecer esta vista como la pantalla por defecto del Centro de Auditoría para brindar una panorámica de inteligencia ejecutiva instantánea al ingresar.
  3. Desplegar 4 Tarjetas KPI de primer nivel:
     - **Salud Global SDD:** Calificación Grado A+ (100% de cumplimiento de contrato, barra de progreso completa).
     - **Guardrails Maestros:** 46/46 aserciones en verde con latencia de ejecución en milisegundos y botón de inspección directa.
     - **Arnés Sensorial E2E:** 8/8 flujos de usuario completos aprobados con Vitest/JSDOM.
     - **Enjambre Multi-Agente:** Estado activo de los 3 subagentes especialistas y orquestador Antigravity con latencia reactiva.
  4. Diseñar 4 Widgets Gráficos interactivos en cuadrícula 2x2:
     - **Desglose de Cobertura por Fase:** Barras de progreso segmentadas por las 5 fases de seguridad SDD con navegación drill-down a Guardrails.
     - **Matriz del Enjambre de Agentes:** Lista jerárquica con orquestador y subagentes en línea con botón drill-down directo a la vista de Agentes.
     - **Embudo de Seguridad SDD:** Pipeline secuencial de 4 compuertas inviolables (Spec -> Linter -> E2E -> Git Hook Pre-commit) con acceso a la consola Git.
     - **Gobernanza y Memoria Viva:** Trazabilidad inmutable de 20 ADRs, 30 pasos de roadmap completados y último hash de commit certificado.
  5. Proveer botón de acción en cabecera `Recalcular Telemetría` para re-auditar en caliente todos los indicadores.
- **Motivo:** Cumplir la visión de diseño del sponsor (Christian Vargas A.) de contar con un cuadro de mando ejecutivo de alto impacto estético y analítico inspirado en Power BI, que agregue toda la telemetría del laboratorio SDD en un único punto de control interactivo con navegación drill-down.

---

## 💡 3. Lecciones Aprendidas (Knowledge Base)
1. **La regla de oro de SDD:** El código siempre sigue a la especificación, nunca al revés.
2. **Ciclo TDD/SDD Completo:**
   - 📜 Especificar la necesidad (`docs/`).
   - 🛡️ Diseñar la prueba en el arnés (`tests/`).
   - 🔴 Ver la prueba fallar en rojo (garantiza que el arnés realmente evalúa la regla).
   - 🟢 Programar la solución mínima necesaria hasta ver verde.
3. **El arnés es el órgano sensorial del agente:** Sin un arnés de pruebas, la IA programa a ciegas. Con el arnés, el agente y el desarrollador tienen certeza absoluta.
4. **La taxonomía de pruebas importa:** Una suite de pruebas desordenada genera fricción cognitiva. Agrupar por requerimientos funcionales y módulos crea un contrato visual transparente.
5. **Guardrails como Plantilla Maestra Reutilizable:** Un buen script de guardrails sirve como plantilla corporativa para cualquier proyecto que utilice agentes de IA y SDD, asegurando que ningún código pase a producción sin cumplir los 4 niveles de barandillas de seguridad.
6. **Diseño de Interfaz antes de Código con Generative UI:** Crear prototipos interactivos en el chat permite validar la usabilidad y el flujo cronológico con el usuario antes de tocar la arquitectura.
7. **Guardrails Duales (CLI + Web):** Los guardrails no deben limitarse a la consola de comandos; tener un runner gráfico en el navegador democratiza la verificación de calidad para perfiles no técnicos y sponsors.
8. **Unificación Jerárquica en UX:** Agrupar tareas complementarias del mismo momento de usuario (preparar despensa + armar listas) en una sola vista con secciones jerárquicas elimina clics innecesarios y reduce fricción cognitiva.
9. **Casillas de Verificación vs Búsqueda Oculta:** Exponer visualmente el catálogo con checkboxes acelera drásticamente la creación de listas de compras en comparación con obligar al usuario a adivinar y tipear nombres uno por uno.
10. **Aislamiento Estricto de la Barra Superior:** El header debe mantenerse limpio como un compás de orientación global (identidad, tema y botón Home de regreso); las métricas y herramientas operativas pertenecen al espacio de trabajo de la ventana.
11. **Auditoría como Función de Primera Clase en la SPA:** Los arneses y guardrails no tienen por qué ser herramientas ajenas al producto final; integrarlos directamente como un módulo de auditoría dentro de la misma interfaz gráfica empodera a los desarrolladores y usuarios para certificar la salud del sistema en vivo.
12. **Desacoplamiento Ergonómico según Contexto Físico:** Las interfaces de escritorio o planificación previa demandan dashboards estructurados con menús laterales (AdminLTE); en contraste, el momento físico en sitio (pasillos de tienda) exige interfaces táctiles ultra-lineales de una sola columna accesibles con una sola mano.
13. **Erradicación de Diálogos Nativos del Navegador:** Los `alert` y `confirm` nativos rompen la inmersión, no respetan el tema de la aplicación, bloquean el hilo principal y ofrecen una estética prehistórica; un modal táctil nativo en React ofrece accesibilidad, animaciones fluidas y botones amigables para el pulgar.
14. **El Guardrail de Acero no pide permiso, bloquea:** Un comando `npm run check:guardrails` es una recomendación si depende de que alguien lo ejecute; cuando se amarra a un Git Pre-commit Hook (`.githooks/pre-commit`), se convierte en una barandilla física inviolable que protege la rama principal de errores humanos y alucinaciones de IA.
15. **La Observabilidad Gráfica de Git Eleva la Confianza:** Traer lo que ocurre en la terminal de Git a la interfaz gráfica del usuario con consolas interactivas y simuladores permite a perfiles de producto, QA y arquitectura presenciar y experimentar el rigor de las barandillas de seguridad sin lidiar con comandos oscuros de shell.
16. **El Arnés Sensorial DOM Eleva la Certeza:** Las pruebas unitarias validan lógica de datos en memoria, pero el arnés sensorial E2E simula la interacción física del dedo del usuario (clics, checkboxes, modales, temas y tabs). Esto garantiza que no existan discrepancias entre el contrato del backend local y los elementos que el usuario efectivamente ve e interactúa.
17. **El Patrón del Puntero Maestro en la Raíz:** Tener múltiples archivos Markdown dispersos en la raíz genera desorden cognitivo. Mantener únicamente `AGENTS.md` como la Constitución Operativa en la raíz y concentrar todos los documentos de conocimiento técnico en `docs/` (con un índice de lectura obligatoria) proporciona la máxima limpieza estructural y descubrimiento infalible para los agentes de IA.
18. **Especialización Multi-Agente sin Polución de Contexto:** Un solo agente orquestador intentando auditar código, memoria, contratos y DOM al mismo tiempo sufre de saturación cognitiva y alucinaciones; segmentar misiones críticas en subagentes especialistas acotados (Centinela de Especificación, Analista de ADRs, Probador Sensorial) permite una orquestación paralela, escalable y con veredictos 100% deterministas.
19. **Paneles Ejecutivos 360° con Drill-Down Reducen la Fatiga Analítica:** Agrupar múltiples fuentes de telemetría especializada (contratos, arneses sensoriales, barandillas de Git y orquestación multi-agente) en un cuadro de mando ejecutivo estilo Power BI otorga a directores y desarrolladores un veredicto instantáneo de salud sistémica, habilitando a la vez navegación por profundidad (drill-down) hacia la evidencia técnica granular con un solo clic.

---

## 🚦 4. Estado de Tareas (Roadmap)

- [x] **Paso 0:** Definir visión y arquitectura relacional de 4 módulos.
- [x] **Paso 1:** Redactar la especificación formal v2.1.0 en español (`docs/SPEC.md`).
- [x] **Paso 2:** Actualizar el arnés de pruebas (`tests/harness.html`).
- [x] **Paso 3:** Verificación de la Fase Roja 🔴.
- [x] **Paso 4:** Refactorizar el motor de datos (`src/services/storage.js`) y componentes React al español.
- [x] **Paso 5:** Verificar en navegador que el arnés pasa al 100% en Verde 🟢.
- [x] **Requerimiento Adicional (RF-4.6):** Confirmación anti-dedazos (v2.2.0).
- [x] **Refactorización de Taxonomía del Arnés:** Estandarización visual y de IDs (`RF-*` y `RNF-*`).
- [x] **Paso 6:** Crear estándares de ingeniería y codificación ([`docs/RULES.md`](RULES.md)).
- [x] **Paso 7:** Diseñar y documentar la arquitectura del sistema con diagramas Mermaid ([`docs/ARCHITECTURE.md`](ARCHITECTURE.md)).
- [x] **Paso 8:** Implementar el motor de Guardrails híbrido en 5 fases ([`scripts/guardrails.js`](../scripts/guardrails.js)).
- [x] **Paso 9:** Configurar comandos de CLI (`npm run check:guardrails` y `npm test`) logrando 27/27 verificaciones en verde 🟢.
- [x] **Paso 10:** Documentar ADR-05 en `docs/MEMORY.md`.
- [x] **Paso 11:** Resolver conflicto peer dependency en `npm install` (Vite 6) y compilar Tailwind CSS v4.
- [x] **Paso 12:** Evolucionar marca a **SuperCarrito** e incorporar **RF-5.1** en la especificación v2.3.0.
- [x] **Paso 13:** Implementar componente [`HomeHub.jsx`](../src/components/HomeHub.jsx) y navegación unificada en [`App.jsx`](../src/App.jsx) y [`Header.jsx`](../src/components/Header.jsx).
- [x] **Paso 14:** Extender guardrails automáticos a 29/29 verificaciones en verde 🟢 (46ms).
- [x] **Paso 15:** Implementar Header contextual minimalista en Home con botón `← Volver al Inicio` en subpantallas ([`Header.jsx`](../src/components/Header.jsx) - RF-5.2).
- [x] **Paso 16:** Crear Panel Web de Guardrails Visuales ([`tests/guardrails.html`](../tests/guardrails.html) - RF-5.3).
- [x] **Paso 17:** Incorporar tarjeta de Laboratorio SDD en [`HomeHub.jsx`](../src/components/HomeHub.jsx) e incrementar guardrails a 32/32 en verde 🟢 (34ms).
- [x] **Paso 18:** Crear vista unificada [`GestionHub.jsx`](../src/components/GestionHub.jsx) con dos secciones verticales, botón único "Gestionar" en Home (RF-5.4) e incrementar guardrails a 34/34 en verde 🟢 (57ms).
- [x] **Paso 19:** Implementar selector de catálogo con checkboxes, carga en lote y botón 'Seleccionar todos' en [`ListManager.jsx`](../src/components/ListManager.jsx) (RF-3.1), e incrementar guardrails a 36/36 en verde 🟢 (40ms).
- [x] **Paso 20:** Implementar Modo Claro / Oscuro adaptativo, Header minimalista estricto con botón Home en detalle ([`Header.jsx`](../src/components/Header.jsx) - RF-5.2) e incrementar guardrails a 37/37 en verde 🟢 (29ms).
- [x] **Paso 21:** Integrar Centro de Auditoría nativo en la SPA ([`AuditoriaHub.jsx`](../src/components/AuditoriaHub.jsx) - RF-5.3), eliminar apertura de pestañas ajenas, preservar Header y control Claro/Oscuro e incrementar guardrails a 38/38 en verde 🟢 (39ms).
- [x] **Paso 22:** Implementar Disposición de Navegación Lateral (Sidebar estilo AdminLTE) en Paso 1 ([`GestionHub.jsx`](../src/components/GestionHub.jsx)) y Paso 3 ([`AuditoriaHub.jsx`](../src/components/AuditoriaHub.jsx)), preservando ergonomía vertical táctil de una sola mano en Paso 2 ([`ActiveShopping.jsx`](../src/components/ActiveShopping.jsx) - RF-5.5) e incrementar guardrails a 39/39 en verde 🟢 (59ms).
- [x] **Paso 23:** Reemplazar diálogo nativo `window.confirm` por modal táctil personalizado [`ConfirmModal.jsx`](../src/components/ConfirmModal.jsx) para la regla anti-dedazos (RF-4.6), actualizar especificación v2.8.0 e incrementar guardrails a 40/40 en verde 🟢 (62ms).
- [x] **Paso 24:** Implementar el Guardrail de Acero en Git: Hook de Pre-commit versionado ([`.githooks/pre-commit`](../../.githooks/pre-commit)), configuración con `core.hooksPath` y comando `npm run setup:hooks` para abortar físicamente cualquier commit que no pase los 40 guardrails al 100% en verde 🟢.
- [x] **Paso 25:** Incorporar la 3ª Opción en Auditoría ([`AuditoriaHub.jsx`](../src/components/AuditoriaHub.jsx)): Guardrail de Acero (Git), con tarjeta de commit certificado (`47b9dc6`), terminal interactiva con simulación de intercepciones, visor web embebido en iframe de `/tests/guardrails.html` y código del hook (v2.9.0).
- [x] **Paso 26:** Implementar el Arnés Sensorial End-to-End (E2E) con Vitest y Testing Library ([`tests/e2e.test.jsx`](../tests/e2e.test.jsx) - RF-5.6), con 6 pruebas automatizadas sobre el DOM real emulado, comando `npm run test:e2e` y elevación a 44 Guardrails Maestros en verde 🟢 (v2.10.0).
- [x] **Paso 27:** Implementar el Patrón del Puntero Maestro consolidando todos los archivos de conocimiento en `docs/` (`docs/MEMORY.md` y `docs/RULES.md`), dejando `AGENTS.md` como único punto de entrada en raíz (v2.11.0).
- [x] **Paso 28:** Estandarizar la nomenclatura Markdown al estándar internacional de la industria (`docs/SPEC.md`), unificando todos los artefactos clave del repositorio bajo nombres en mayúsculas universalmente reconocidos (v2.12.0).
- [x] **Paso 29:** Implementar el Módulo de Inspección de Agentes y Subagentes Autónomos (RF-5.8) en el Centro de Auditoría ([`AuditoriaHub.jsx`](../src/components/AuditoriaHub.jsx)), con catálogo de 3 subagentes especialistas, orquestador Antigravity, consola de telemetría reactiva, suite E2E 7/7 en verde 🟢 y elevación a 45 Guardrails Maestros (v2.13.0).
- [x] **Paso 30:** Implementar el Panel Ejecutivo 360° Estilo Power BI en el Centro de Auditoría ([`AuditoriaHub.jsx`](../src/components/AuditoriaHub.jsx) - RF-5.9), con 4 KPIs estratégicas, 4 widgets gráficos interactivos con navegación drill-down, suite sensorial E2E ampliada a 8/8 flujos en verde 🟢 y elevación a 46 Guardrails Maestros certificados (v2.14.0).

