# RULES.md - Reglas y Estándares de Ingeniería de Software

> **Propósito:** Estándares de código, convenciones de arquitectura y directrices de calidad obligatorias para desarrolladores humanos y agentes de IA en este proyecto.  
> **Versión:** 1.0.0  
> **Ámbito:** Repositorio SuperCart (Laboratorio SDD)

---

## 🏛️ 1. Principio Rector: Spec-Driven Development (SDD)

1. **La Especificación es la Ley:** Ninguna función, campo de datos o cambio en la persistencia puede crearse si no está previamente aprobado en [`docs/SPEC.md`](SPEC.md).
2. **Prohibido asumir o alucinar:** Si un requerimiento no está explícito en la especificación, está prohibido adivinarlo; se debe consultar primero al usuario o documentar formalmente la propuesta.
3. **El Ciclo TDD/SDD es Innegociable:**
   - 📜 **1. Spec:** Redactar regla formal con identificador único (`RF-*` o `RNF-*`).
   - 🛡️ **2. Harness:** Escribir la prueba en el arnés con aserciones rigurosas.
   - 🔴 **3. Fase Roja:** Comprobar que la prueba falla antes de codificar la solución.
   - 🟢 **4. Fase Verde:** Escribir la implementación mínima necesaria.
   - 🔵 **5. Refactor:** Pulir y optimizar con la garantía del arnés en verde.

---

## 🏷️ 2. Convenciones de Nomenclatura y Dominio

Para evitar fricciones y mantener la coherencia lingüística del negocio:

### 2.1 Entidades del Modelo de Datos (Siempre en Español)
| Capa | Entidad Singular | Entidad Plural (Tabla) | Identificador Primario |
| :--- | :--- | :--- | :--- |
| **Catálogo** | `Producto` | `productos` | `id` (prefijo `prod_`) |
| **Listas** | `Lista` | `listas` | `id` (prefijo `list_`) |
| **Detalle/Vínculo** | `ProductoLista` | `productos_listas` | `id` (prefijo `item_`) |

### 2.2 Atributos del Modelo
- `nombre`: string (trimmed, no vacío).
- `categoria`: string (del conjunto permitido).
- `unidad`: string ("unidades", "kg", "litros", "paquete", "bolsa").
- `titulo`: string (nombre de la lista).
- `fecha`: string (ISO `YYYY-MM-DD`).
- `estado`: `'borrador' | 'activa' | 'completada'`.
- `cantidad`: number (entero $\ge 1$).
- `enCarrito`: boolean (`true` en el carrito, `false` pendiente).
- `creadoEn`: number (timestamp unix en milisegundos).

> [!WARNING]
> Queda estrictamente prohibido utilizar o reintroducir en código de producción los términos legados en inglés (`inCart`, `items`, `products`, `lists`, `createdAt`).

---

## 🧱 3. Arquitectura y Separación de Responsabilidades

El proyecto aplica una separación estricta en tres capas:

```
┌────────────────────────────────────────────────────────┐
│  Capa 1: Interfaz de Usuario (React Components)        │
│  - src/components/ & src/App.jsx                      │
│  - Componentes funcionales puros y declarativos       │
│  - PROHIBIDO el acceso directo a localStorage          │
└──────────────────────────┬─────────────────────────────┘
                           │ Invoca métodos del servicio
                           ▼
┌────────────────────────────────────────────────────────┐
│  Capa 2: Capa de Servicio / Dominio                   │
│  - src/services/storage.js (SupermarketStorage)        │
│  - Validaciones de negocio, integridad referencial    │
│  - Soporta inyección de dependencias (Sandbox Mock)    │
└──────────────────────────┬─────────────────────────────┘
                           │ Lee / Escribe sincrónicamente
                           ▼
┌────────────────────────────────────────────────────────┐
│  Capa 3: Persistencia Aislada                         │
│  - localStorage nativo bajo 'supermarket_app_db_v2'    │
│  - MockStorage en pruebas unitarias y guardrails       │
└────────────────────────────────────────────────────────┘
```

### Reglas de Arquitectura:
1. **Aislamiento de Persistencia:** Los componentes de React **NUNCA** deben invocar `localStorage.getItem` ni `localStorage.setItem` directamente. Toda interacción debe canalizarse a través de la clase `SupermarketStorage`.
2. **Inyección de Dependencias:** El constructor de `SupermarketStorage` debe aceptar una instancia de almacenamiento (`storage`), permitiendo ejecutar pruebas automatizadas en cualquier entorno (Node.js, Sandbox, Navegador) sin acoplarse a `window`.

---

## 🎨 4. Estándares de Estilo y UI (Tailwind CSS v4)

1. **Directiva de Importación:**
   - Usar exclusivamente: `@import "tailwindcss";` en `src/index.css`.
   - **Prohibido:** Sintaxis de v3 como `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`.
2. **Iconos:** Utilizar exclusivamente la librería `lucide-react`.
3. **Diseño Mobile-First Táctil:** Los botones y áreas de toque deben tener como mínimo 44px de alto para garantizar accesibilidad en dispositivos móviles dentro del supermercado.

---

## 📝 5. Estándar de Commits (Conventional Commits)

Cada commit debe seguir la convención semántica:

```text
<tipo>(<alcance>): <descripción concisa en imperativo>
```

- `feat(sdd)`: Nueva funcionalidad guiada por la especificación.
- `fix(anti-dedazos)`: Corrección de un fallo o ajuste de validación.
- `test(harness)`: Incorporación o actualización de pruebas en el arnés.
- `docs(spec)`: Actualización de la especificación o bitácora de memoria.
- `refactor(storage)`: Mejora de código sin alterar el comportamiento observable.
- `chore(guardrails)`: Tareas de mantenimiento o configuración de scripts.

### 5.1 Guardrail de Acero en Git (Pre-commit Hook)
El repositorio cuenta con un hook de pre-commit forzoso versionado en `.githooks/pre-commit` y activado mediante `git config core.hooksPath .githooks` (o comando `npm run setup:hooks`):
- Cada vez que un desarrollador humano o agente de IA intenta ejecutar `git commit`, Git invoca automáticamente la suite completa de guardrails.
- Si existe una sola violación a la especificación, a la persistencia o a las pruebas, **Git aborta físicamente el commit**, impidiendo que código corrupto o no especificado llegue al historial.

---

## 🚦 6. Criterio de Entrega (Definition of Done - DoD)

Una tarea o requerimiento solo se considera **COMPLETADO** cuando cumple con la siguiente lista de verificación:

- [ ] **1. Spec:** El requerimiento está documentado con código formal (`RF-*` / `RNF-*`) en `docs/SPEC.md`.
- [ ] **2. Harness:** Existe una prueba correspondiente en `tests/harness.html` y flujos sensoriales en `tests/e2e.test.jsx`.
- [ ] **3. Fase Roja superada:** Se verificó que la prueba fallaba antes de la solución.
- [ ] **4. Arnés en Verde:** 100% de las pruebas del arnés y suite E2E pasan exitosamente.
- [ ] **5. Guardrails & Git Hook en Verde:** El comando `npm run check:guardrails` pasa 44/44 en verde y el Git Pre-commit Hook autoriza la confirmación.
- [ ] **6. ADR / Memoria:** La decisión técnica y lecciones aprendidas quedan asentadas en `docs/MEMORY.md`.
