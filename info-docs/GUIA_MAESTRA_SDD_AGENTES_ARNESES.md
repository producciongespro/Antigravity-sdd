# Guía Maestra de Spec-Driven Development, Arneses, Agentes y Guardrails

> **Autor / Estudiante:** Chris Vargas A.  
> **Copiloto de IA:** Antigravity (Google DeepMind)  
> **Proyecto de Referencia:** SuperCart SDD  
> **Versión:** 1.0 Definitiva | Octubre 2026  
> **Ubicación:** `info-docs/`

---

## 📑 Tabla de Contenidos

1. [¿Qué es Spec-Driven Development (SDD)?](#1-qué-es-spec-driven-development-sdd)
2. [El Arnés de Pruebas (Test Harness) - El Órgano Sensorial](#2-el-arnés-de-pruebas-test-harness)
3. [El Ciclo de Vida: Rojo $\rightarrow$ Verde $\rightarrow$ Refactor](#3-el-ciclo-de-vida-rojo--verde--refactor)
4. [Arquitectura de Agentes y Subagentes](#4-arquitectura-de-agentes-y-subagentes)
5. [Guardrails: Las Barandillas de Seguridad en Desarrollo con IA](#5-guardrails-las-barandillas-de-seguridad)
6. [Caso de Estudio Real: SuperCart](#6-caso-de-estudio-real-supercart)
7. [Checklist Profesional y Protocolo de Trabajo](#7-checklist-profesional-y-protocolo-de-trabajo)

---

## 1. ¿Qué es Spec-Driven Development (SDD)?

El **Desarrollo Guiado por Especificaciones (SDD)** es una metodología de ingeniería de software en la cual **una especificación viva, formal y versionada actúa como la Única Fuente de Verdad (Single Source of Truth - SSOT)** antes de escribir o modificar código de producción.

### ⚠️ El Problema de Programar con IA sin Especificación
Cuando se le pide a una IA: *"Hazme una pantalla de lista de compras"*, la IA responde basándose en probabilidades estadísticas. El resultado es:
- Nombres de campos inventados (`item_title` vs `name` vs `nombre`).
- Reglas de negocio cambiantes.
- Falta de integridad referencial.
- **Alucinación técnica** ante cambios acumulativos.

### 💎 La Regla de Oro del SDD
> **"El código siempre sigue a la especificación; la especificación NUNCA persigue al código."**

Si el sponsor pide un cambio de negocio (ej: confirmación anti-dedazos o nombres en español):
1. **Primero** se redacta en la especificación (`docs/ESPECIFICACION_PRINCIPAL.md`).
2. **Segundo** se diseña la prueba en el arnés (`tests/harness.html`).
3. **Tercero** se implementa el código (`src/`).

---

## 2. El Arnés de Pruebas (Test Harness)

El **Arnés de Pruebas** es un banco de evaluación automatizado donde se colocan los componentes de software en condiciones controladas para verificar que cumplen matemáticamente las promesas hechas en la especificación.

### 👁️ El Órgano Sensorial del Agente de IA
- Los humanos tenemos ojos: abrimos el navegador, hacemos clics e inspeccionamos la interfaz.
- **La IA no tiene ojos humanos nativos.**
- El arnés actúa como su **órgano sensorial**: le permite saber con precisión matemática si su código compila, si cumple las aserciones o dónde falló.
- **Sin arnés:** La IA dice *"¡Listo!"* por corazonada (alucinación).
- **Con arnés:** La IA lee el fallo exacto (`"Expected true but received false"`), corrige el archivo específico y re-evalúa hasta alcanzar 100% verde.

### 🍽️ La Metáfora del Restaurante de Alta Cocina
| Componente | Rol en el Restaurante | Función en el Proyecto |
| :--- | :--- | :--- |
| **`ESPECIFICACION_PRINCIPAL.md`** | La Carta y la Receta | Define ingredientes, porciones y lo que el cliente pagó por recibir. |
| **`AGENTS.md`** | Normas de la Cocina | Reglas operativas que los cocineros (IA) deben obedecer obligatoriamente. |
| **`tests/harness.html`** | El Inspector de Calidad | Prueba el plato antes de servirlo a la mesa. Si algo está crudo, rechaza la entrega. |
| **`MEMORY.md`** | La Bitácora del Chef | Anota lecciones aprendidas, incidentes y decisiones arquitectónicas (ADRs). |

---

## 3. El Ciclo de Vida: Rojo $\rightarrow$ Verde $\rightarrow$ Refactor

| Fase | Color | Acción | Propósito |
| :--- | :---: | :--- | :--- |
| **1. Fase Roja** | 🔴 FAIL | Diseñar la prueba antes de programar y verla fallar. | Demostrar que la prueba es sensible y detecta la ausencia de la función. |
| **2. Fase Verde** | 🟢 PASS | Programar el código mínimo necesario para pasar la prueba. | Cumplir estrictamente el contrato sin sobre-ingeniería. |
| **3. Refactor** | 🔵 CLEAN | Pulir código, estandarizar taxonomía y limpiar deuda técnica. | Mejorar la calidad sabiendo que el arnés te protege si algo se rompe. |

> [!WARNING]
> Si creas una prueba y pasa en verde de inmediato sin haber programado la función, **la prueba está mal diseñada (falso positivo)**. La Fase Roja es la validación científica de tu prueba.

---

## 4. Arquitectura de Agentes y Subagentes

En sistemas de desarrollo multi-agente:
1. **Agente Orquestador:** Comprende el contexto general, habla con el usuario, diseña el roadmap y actualiza la memoria (`MEMORY.md`).
2. **Subagente Programador (Coder):** Lee la especificación viva y modifica los archivos de código en `src/`.
3. **Subagente Verificador (Tester / QA):** Ejecuta el arnés en aislamiento y emite veredictos objetivos (Aprobado / Rechazado).

### Taxonomía Estandarizada del Arnés
Para evitar desorden cognitivo, las pruebas deben llevar el código contractual exacto:
- `[RNF-02]` Resistencia ante JSON corrupto.
- `[RNF-03]` Migración automática v2.0 $\rightarrow$ v2.1.
- `[RF-1.1]` Validación y CRUD de Productos.
- `[RF-4.6]` Prevención de desmarcado accidental (Anti-dedazos).

---

## 5. Guardrails: Las Barandillas de Seguridad

Los **Guardrails** son mecanismos de protección que impiden desastres provocados por descuidos humanos o alucinaciones de la IA.

### Los 4 Niveles de Guardrails:
1. **Guardrails de Instrucción (`AGENTS.md`):**  
   Restricciones textuales explícitas: *"Prohibido inventar APIs no descritas en docs/"*, *"Prohibido dar una tarea por terminada si hay pruebas en rojo"*.
2. **Guardrails Estructurales (Arnés y CI/CD):**  
   Pruebas automáticas y Git Hooks (Husky) que bloquean los commits o los despliegues si las pruebas fallan.
3. **Guardrails de Negocio / UX (Anti-dedazos):**  
   Frenos de seguridad en la aplicación para proteger al usuario final.  
   *Ejemplo real del laboratorio:* Si un producto ya está en el carrito, requerir confirmación explícita antes de desmarcarlo (`RF-4.6`).
4. **Guardrails de Resiliencia (Fallback):**  
   Captura de excepciones críticas.  
   *Ejemplo:* Si el `localStorage` se corrompe (`RNF-02`), la app reinicia una estructura limpia en vez de colapsar con pantalla en blanco.

---

## 6. Caso de Estudio Real: SuperCart

Durante este laboratorio resolvimos tres desafíos de ingeniería de alto nivel:

1. **Desacoplamiento Relacional:**  
   Separación del catálogo maestro (`productos`) de las compras efímeras (`listas` y `productos_listas`).
2. **Nacionalización con Retrocompatibilidad (v2.1):**  
   Cambio de entidades en inglés a español, implementando un motor de migración automática transparente que preserva los datos existentes de los usuarios.
3. **Regla de Confirmación Anti-dedazos (v2.2):**  
   Implementación del método `alternarConConfirmacion(itemId, callbackConfirmacion)`.

---

## 7. Checklist Profesional y Protocolo de Trabajo

Cada vez que vayas a construir una nueva función:

```text
[ ] 1. Acordar el requerimiento con el sponsor / usuario.
[ ] 2. Redactar el requerimiento en docs/ESPECIFICACION_PRINCIPAL.md (subir versión).
[ ] 3. Escribir la prueba unitaria en tests/harness.html con código RF-*.
[ ] 4. Ejecutar el arnés y verificar el FALLO EN ROJO 🔴.
[ ] 5. Implementar el código en src/ hasta ver el ÉXITO EN VERDE 🟢.
[ ] 6. Registrar la decisión en MEMORY.md (ADR).
[ ] 7. Ejecutar commit atómico en Git (feat: ...).
```
