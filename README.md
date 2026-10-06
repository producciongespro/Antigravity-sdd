# SuperCart SDD - Laboratorio de Desarrollo Guiado por Especificaciones

Proyecto desarrollado en pair programming con **Antigravity (Google DeepMind)** para el aprendizaje integral de:
- **Spec-Driven Development (SDD)**: Desarrollo guiado por especificaciones vivas.
- **Test Harnesses (Arneses de Evaluación)**: Bancos de pruebas automatizados para validación de contratos.
- **Arquitectura de Agentes y Subagentes**: Reglas operativas (`AGENTS.md`) y bitácora persistente (`MEMORY.md`).
- **Guardrails**: Reglas de contención y seguridad para desarrollo asistido por IA.

---

## 📁 Estructura del Repositorio

```text
Antigravity-sdd/
├── app/                  # 🛒 Aplicación Web Completa (React 18 + Vite + Tailwind v4)
│   ├── docs/             # 📜 Fuente Única de Verdad (docs/ESPECIFICACION_PRINCIPAL.md)
│   ├── tests/            # 🛡️ Arnés de Pruebas Automatizado (tests/harness.html)
│   ├── src/              # 💻 Código Fuente de la Aplicación
│   ├── AGENTS.md         # 🤖 Reglamento Operativo para Agentes de IA
│   └── MEMORY.md         # 🧠 Bitácora de Memoria del Proyecto y ADRs
├── info-docs/            # 📚 Documentación Teórica, Diagramas y Guía Maestra PDF
├── .gitignore            # Exclusiones de Git
└── README.md             # Esta portada
```

---

## 🚀 Cómo Ejecutar la Aplicación

1. Entrar a la carpeta `app`:
   ```bash
   cd app
   ```
2. Instalar dependencias (si es primera vez):
   ```bash
   npm install
   ```
3. Iniciar el servidor local:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador:
   * **App en Vivo:** `http://localhost:3000/`
   * **Arnés de Pruebas:** `http://localhost:3000/tests/harness.html`
