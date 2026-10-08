# AGENTS.md - Reglamento Operativo y Puntero Maestro para Agentes de IA

> **Propósito:** Constitución operativa, directivas de ingeniería y puntero maestro de documentación para cualquier Agente de IA o asistente que opere en este repositorio.

---

## 🧭 1. Puntero Maestro de Documentación (Lectura Obligatoria al Iniciar)

Para mantener la raíz del proyecto limpia y libre de saturación, toda la base de conocimiento técnico reside centralizada en [`docs/`](docs/). Al iniciar una sesión o comenzar cualquier tarea, el agente **DEBE CONSULTAR** los siguientes archivos en orden:

| Orden | Artefacto Maestro | Ubicación | Rol y Propósito |
| :---: | :--- | :--- | :--- |
| **1º** | **Especificación Principal (SSOT)** | [`docs/SPEC.md`](docs/SPEC.md) | **Única Fuente de Verdad** funcional, técnica y de negocio del proyecto. |
| **2º** | **Arquitectura del Sistema** | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Diseño de componentes, modelo relacional C4 y flujo de datos. |
| **3º** | **Estándares y Reglas de Calidad** | [`docs/RULES.md`](docs/RULES.md) | Reglas de codificación, stack y Criterios de Aceptación (*Definition of Done*). |
| **4º** | **Bitácora de Memoria y Decisiones** | [`docs/MEMORY.md`](docs/MEMORY.md) | Registro de ADRs (Architectural Decision Records), lecciones y roadmap activo. |

---

## 🎯 2. Principio Fundamental: Spec-Driven Development (SDD)

1. **La Única Fuente de Verdad:**  
   Antes de escribir o modificar una sola línea de código, el agente **DEBE LEER** el archivo:
   👉 [`docs/SPEC.md`](docs/SPEC.md).
2. **Prohibido asumir requerimientos:**  
   Si una regla de negocio o modelo de datos entra en conflicto, la especificación en `docs/` siempre tiene la última palabra. Si algo no está claro, pregunta al usuario en lugar de inventar.
3. **El Código sigue a la Spec:**  
   Nunca modifiques el código para resolver un requerimiento sin haber actualizado primero la especificación y el arnés de pruebas correspondiente.

---

## 🛡️ 3. Protocolo de Verificación con el Arnés (*The Harness*)

1. **Ubicación del Arnés Visual:**  
   El banco de pruebas automatizado se encuentra en:
   👉 [`tests/harness.html`](tests/harness.html) (ejecutable en `http://localhost:3000/tests/harness.html`).
2. **Arnés Sensorial E2E (Vitest + JSDOM):**  
   Suite sensorial de 7 flujos de usuario completos:
   👉 [`tests/e2e.test.jsx`](tests/e2e.test.jsx) (ejecutable con `npm run test:e2e`).
3. **Criterio de Entrega (Definition of Done):**  
   Ninguna tarea se considera finalizada si el arnés o los guardrails reportan pruebas en rojo 🔴.
4. **Bucle de Autocorrección:**  
   Si una prueba falla, el agente debe leer el mensaje exacto de aserción devuelto por el arnés, corregir el código en `src/`, y re-ejecutar hasta lograr **100% pruebas en Verde 🟢**.

---

## 📐 4. Estándares Técnicos y Nomenclatura

- **Stack Técnico:**
  - **Framework:** React 18+ (Componentes funcionales y Hooks).
  - **Bundler:** Vite 5+.
  - **Estilos:** Tailwind CSS v4 (usar directiva `@import "tailwindcss";`, no `@tailwind base;`).
  - **Iconos:** `lucide-react`.
  - **Persistencia:** `localStorage` nativo bajo la clave `'supermarket_app_db_v2'`.

- **Nomenclatura Obligatoria (v2.1.0 en Español):**
  - Entidades en BD: `productos`, `listas`, `productos_listas`.
  - Atributos: `nombre`, `categoria`, `unidad`, `titulo`, `fecha`, `estado`, `cantidad`, `enCarrito`, `notas`.
  - Métodos del Servicio: `obtenerBaseDeDatos()`, `crearProducto()`, `crearLista()`, `agregarProductoALista()`, `alternarEnCarrito()`, `limpiarCompradosDeLista()`.

---

## 🧠 5. Protocolo de Memoria y Bitácora (`docs/MEMORY.md`)

- Cada vez que se tome una decisión arquitectónica (ADR) o se complete un paso del roadmap, el agente debe actualizar:
  👉 [`docs/MEMORY.md`](docs/MEMORY.md).
