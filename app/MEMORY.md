# MEMORY.md - Bitácora de Memoria del Proyecto SuperCart

> **Propósito:** Registro persistente de contexto, decisiones arquitectónicas, lecciones aprendidas y estado actual del proyecto para humanos y agentes de IA.  
> **Última Actualización:** 2026-10-06  
> **Estado del Laboratorio:** Taxonomía de Pruebas Estandarizada $\rightarrow$ 7 de 7 Pruebas en Verde 🟢 Agrupadas por Módulos.

---

## 📌 1. Resumen Ejecutivo del Proyecto
- **Nombre:** SuperCart (Laboratorio de Spec-Driven Development, Arneses y Agentes).
- **Repositorio Git Local:** `C:\xampp\htdocs\Antigravity-sdd`.
- **Dominio:** Aplicación web para optimizar compras en el supermercado con modelo relacional (Catálogo Maestro $\rightarrow$ Listas $\rightarrow$ Vinculación $\rightarrow$ Modo Súper táctil).
- **Persistencia:** `localStorage` bajo la clave `'supermarket_app_db_v2'`.
- **Stack:** React 18, Vite, Tailwind CSS v4 (`@tailwindcss/postcss`), JavaScript (ESModules).
- **Única Fuente de Verdad:** [docs/ESPECIFICACION_PRINCIPAL.md](docs/ESPECIFICACION_PRINCIPAL.md) (Versión 2.2.0 en Español).
- **Arnés de Pruebas:** [tests/harness.html](tests/harness.html) (Ejecutable en `http://localhost:3000/tests/harness.html`).

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

---

## 🚦 4. Estado de Tareas (Roadmap)

- [x] **Paso 0:** Definir visión y arquitectura relacional de 4 módulos.
- [x] **Paso 1:** Redactar la especificación formal v2.1.0 en español (`docs/ESPECIFICACION_PRINCIPAL.md`).
- [x] **Paso 2:** Actualizar el arnés de pruebas (`tests/harness.html`).
- [x] **Paso 3:** Verificación de la Fase Roja 🔴.
- [x] **Paso 4:** Refactorizar el motor de datos (`src/services/storage.js`) y componentes React al español.
- [x] **Paso 5:** Verificar en navegador que el arnés pasa al 100% en Verde 🟢.
- [x] **Requerimiento Adicional (RF-4.6):** Confirmación anti-dedazos (v2.2.0).
- [x] **Refactorización de Taxonomía del Arnés:** Estandarización visual y de IDs (`RF-*` y `RNF-*`).
