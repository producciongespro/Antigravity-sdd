# AGENTS.md - Reglamento Operativo y Puntero Maestro

> **Laboratorio SDD:** SuperCarrito  
> **Sponsor y Desarrollador Líder:** Christian Vargas A.  
> **Copiloto AI:** Antigravity (Google DeepMind)

---

## 🧭 Puntero Maestro de Documentación

La aplicación, el código fuente y toda la base de conocimiento técnico se encuentran en el directorio [`app/`](app/):

| Orden | Artefacto Maestro | Ubicación | Rol y Propósito |
| :---: | :--- | :--- | :--- |
| **0º** | **Reglamento del Agente (Constitución)** | [`app/AGENTS.md`](app/AGENTS.md) | Normas de comportamiento, flujos y comandos del agente. |
| **1º** | **Especificación Principal (SSOT)** | [`app/docs/SPEC.md`](app/docs/SPEC.md) | **Única Fuente de Verdad** funcional y técnica. |
| **2º** | **Arquitectura del Sistema** | [`app/docs/ARCHITECTURE.md`](app/docs/ARCHITECTURE.md) | Diagramas C4, modelo relacional y flujo de datos. |
| **3º** | **Estándares y Reglas de Calidad** | [`app/docs/RULES.md`](app/docs/RULES.md) | Estándares de ingeniería y Criterios de Aceptación (DoD). |
| **4º** | **Bitácora de Memoria y Decisiones** | [`app/docs/MEMORY.md`](app/docs/MEMORY.md) | Registro de ADRs, lecciones aprendidas y roadmap activo. |

---

## ⚡ Comandos Rápidos de Verificación

Desde `app/`:
- **Guardrails:** `npm run check:guardrails` (46/46 verificaciones en verde).
- **Arnés Sensorial E2E:** `npm run test:e2e` (8/8 flujos de usuario).
- **Arnés Visual:** `http://localhost:3000/tests/harness.html`.
