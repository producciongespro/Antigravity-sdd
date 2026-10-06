# AGENTS.md - Reglamento Operativo para Agentes de IA

> **Propósito:** Instrucciones de comportamiento, normas de ingeniería y protocolos obligatorios para cualquier Agente de IA (o asistente de programación) que trabaje en este repositorio.

---

## 🎯 1. Principio Fundamental: Spec-Driven Development (SDD)

1. **La Única Fuente de Verdad:**  
   Antes de escribir o modificar una sola línea de código, el agente **DEBE LEER** el archivo:
   👉 [`docs/ESPECIFICACION_PRINCIPAL.md`](docs/ESPECIFICACION_PRINCIPAL.md).
2. **Prohibido asumir requerimientos:**  
   Si una regla de negocio o modelo de datos entra en conflicto, la especificación en `docs/` siempre tiene la última palabra. Si algo no está claro, pregunta al usuario en lugar de inventar.
3. **El Código sigue a la Spec:**  
   Nunca modifiques el código para resolver un requerimiento sin haber actualizado primero la especificación y el arnés de pruebas correspondiente.

---

## 🛡️ 2. Protocolo de Verificación con el Arnés (*The Harness*)

1. **Ubicación del Arnés:**  
   El banco de pruebas automatizado se encuentra en:
   👉 [`tests/harness.html`](tests/harness.html) (ejecutable en `http://localhost:3000/tests/harness.html`).
2. **Criterio de Entrega (Definition of Done):**  
   Ninguna tarea se considera finalizada si el arnés reporta pruebas en rojo 🔴.
3. **Bucle de Autocorrección:**  
   Si una prueba falla, el agente debe leer el mensaje exacto de aserción devuelto por el arnés, corregir el código en `src/`, y re-ejecutar hasta lograr **100% pruebas en Verde 🟢**.

---

## 📐 3. Estándares Técnicos y Nomenclatura

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

## 🧠 4. Protocolo de Memoria y Bitácora (`MEMORY.md`)

- Cada vez que se tome una decisión arquitectónica (ADR) o se complete un paso del roadmap, el agente debe actualizar:
  👉 [`MEMORY.md`](MEMORY.md).
