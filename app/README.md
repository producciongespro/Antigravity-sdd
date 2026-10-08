# SuperCarrito SDD - Laboratorio de Desarrollo Guiado por Especificaciones

Proyecto desarrollado por **Christian Vargas A.** en pair programming con **Antigravity (Google DeepMind)** para el aprendizaje integral de:
- **Spec-Driven Development (SDD)**: Desarrollo guiado por especificaciones vivas.
- **Test Harnesses (Arneses de Evaluación)**: Bancos de pruebas automatizados para validación de contratos.
- **Arquitectura de Agentes y Subagentes**: Reglas operativas (`AGENTS.md`) y bitácora persistente (`MEMORY.md`).
- **Guardrails**: Reglas de contención y seguridad para desarrollo asistido por IA (`RULES.md` y `scripts/guardrails.js`).

---

## 📁 Estructura del Repositorio

```text
Antigravity-sdd/
├── app/                  # 🛒 Aplicación Web Completa (React 18 + Vite 6 + Tailwind v4)
│   ├── docs/             # 📜 Documentación Técnica SSOT: SPEC.md, ARCHITECTURE.md, RULES.md, MEMORY.md
│   ├── tests/            # 🛡️ Arnés de Pruebas Visual (tests/harness.html) y Suite E2E (e2e.test.jsx)
│   ├── scripts/          # 🚨 Guardrails Automatizados (scripts/guardrails.js)
│   ├── src/              # 💻 Código Fuente (HomeHub, GestionHub, ActiveShopping, AuditoriaHub)
│   ├── AGENTS.md         # 🤖 Reglamento Operativo y Puntero Maestro
│   ├── .gitignore        # Exclusiones de Git
│   └── README.md         # Esta portada
└── info-docs/            # 📚 Documentación Teórica, Guía Maestra e Imprimible HTML
```

---

## 🚀 Cómo Ejecutar la Aplicación

1. Entrar a la carpeta `app`:
   ```bash
   cd app
   ```
2. Ejecutar la auditoría de Guardrails:
   ```bash
   npm run check:guardrails
   ```
3. Iniciar el servidor local de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador:
   * **App en Vivo (SuperCarrito):** `http://localhost:3000/`
   * **Arnés de Pruebas Visual:** `http://localhost:3000/tests/harness.html`
