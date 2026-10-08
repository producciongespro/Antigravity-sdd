# Guía Maestra de Spec-Driven Development, Arneses, Agentes, Guardrails, Skills y MCP

> **Autor / Estudiante:** Christian Vargas A.  
> **Copiloto de IA:** Antigravity (Google DeepMind)  
> **Proyecto de Referencia:** SuperCart SDD  
> **Versión:** 2.0 Definitiva y Ampliada | Octubre 2026  
> **Ubicación:** `info-docs/GUIA_MAESTRA_SDD_AGENTES_ARNESES.md`

---

## 📑 Tabla de Contenidos

1. [¿Qué es Spec-Driven Development (SDD)?](#1-qué-es-spec-driven-development-sdd)
2. [El Arnés de Pruebas (Test Harness) - El Órgano Sensorial](#2-el-arnés-de-pruebas-test-harness---el-órgano-sensorial)
3. [El Ciclo de Vida: Rojo $\rightarrow$ Verde $\rightarrow$ Refactor](#3-el-ciclo-de-vida-rojo--verde--refactor)
4. [Guardrails: Las Barandillas de Seguridad (Explicado para Todos)](#4-guardrails-las-barandillas-de-seguridad-explicado-para-todos)
5. [Skills (Habilidades): La Carpeta de Especialidad de la IA](#5-skills-habilidades-la-carpeta-de-especialidad-de-la-ia)
6. [MCP (Model Context Protocol): El USB-C Universal de la IA](#6-mcp-model-context-protocol-el-usb-c-universal-de-la-ia)
7. [Arquitectura de Agentes, Subagentes y Slash Commands en Pair Programming](#7-arquitectura-de-agentes-subagentes-y-slash-commands-en-pair-programming)
8. [Matriz Comparativa y Diccionario Conceptual Rápido](#8-matriz-comparativa-y-diccionario-conceptual-rápido)
9. [Caso de Estudio Real: SuperCart SDD](#9-caso-de-estudio-real-supercart-sdd)
10. [Checklist Profesional y Protocolo de Trabajo Definitivo](#10-checklist-profesional-y-protocolo-de-trabajo-definitivo)

---

## 1. ¿Qué es Spec-Driven Development (SDD)?

El **Desarrollo Guiado por Especificaciones (SDD)** es una metodología de ingeniería de software en la cual **una especificación viva, formal y versionada actúa como la Única Fuente de Verdad (Single Source of Truth - SSOT)** antes de escribir o modificar código de producción.

### 🏠 La Analogía de la Vida Real: El Plano del Arquitecto
Imagina que contratas a un equipo de albañiles para construir una casa de dos plantas. Si les dices: *"Constrúyanme una casa bonita y moderna"*, cada albañil construirá lo que imagine: uno pondrá una ventana donde el otro iba a pasar una tubería de agua, y el techo se vendrá abajo.
En la construcción profesional, **nadie pega un solo ladrillo sin el plano aprobado por el arquitecto**. Si el cliente quiere cambiar una pared de lugar, primero se redibuja el plano, se calculan las vigas y luego se mueve el ladrillo.

### ⚠️ El Problema de Programar con IA sin Especificación
Cuando se le pide a una IA: *"Hazme una pantalla de lista de compras"*, la IA responde basándose en probabilidades estadísticas. El resultado es:
- Nombres de campos inventados (`item_title` vs `name` vs `nombre`).
- Reglas de negocio cambiantes entre una respuesta y otra.
- Pérdida de integridad referencial.
- **Alucinación técnica** ante cambios acumulativos.

### 💎 La Regla de Oro del SDD
> **"El código siempre sigue a la especificación; la especificación NUNCA persigue al código."**

Si el sponsor pide un cambio de negocio (ej: confirmación anti-dedazos o nombres en español):
1. **Primero** se redacta en la especificación (`app/docs/ESPECIFICACION_PRINCIPAL.md`).
2. **Segundo** se diseña la prueba en el arnés (`app/tests/harness.html`).
3. **Tercero** se implementa el código (`app/src/`).

---

## 2. El Arnés de Pruebas (Test Harness) - El Órgano Sensorial

El **Arnés de Pruebas** es un banco de evaluación automatizado donde se colocan los componentes de software en condiciones controladas para verificar que cumplen matemáticamente las promesas hechas en la especificación.

### 👁️ El Órgano Sensorial del Agente de IA
- Los humanos tenemos ojos: abrimos el navegador, hacemos clics e inspeccionamos visualmente la interfaz.
- **La IA no tiene ojos humanos nativos.**
- El arnés actúa como su **órgano sensorial**: le permite saber con precisión matemática si su código compila, si cumple las aserciones o dónde falló.
- **Sin arnés:** La IA dice *"¡Listo, ya quedó!"* por corazonada o alucinación.
- **Con arnés:** La IA lee el fallo exacto (`"Expected true but received false"`), corrige el archivo específico y re-evalúa hasta alcanzar 100% verde.

### 🍽️ La Metáfora del Restaurante de Alta Cocina
| Componente | Rol en el Restaurante | Función en el Proyecto |
| :--- | :--- | :--- |
| **`ESPECIFICACION_PRINCIPAL.md`** | La Carta y la Receta Maestra | Define ingredientes, porciones y lo que el cliente pagó por recibir. |
| **`AGENTS.md` / `RULES.md`** | Normas de la Cocina | Reglas operativas y estándares que los cocineros (humanos e IA) deben obedecer. |
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

## 4. Guardrails: Las Barandillas de Seguridad (Explicado para Todos)

La palabra **Guardrail** significa literalmente la **barandilla de contención** metálica que ves al borde de una carretera en la montaña o en un balcón alto.

Tú sabes manejar tu auto, pero si hay una curva peligrosa con neblina, hielo o te descuidas un segundo, la barandilla de acero **físicamente te impide caer al abismo**. No depende de tu fuerza de voluntad; la barandilla está ahí para frenar el desastre.

### 🚲 3 Ejemplos Visuales de la Vida Real:
1. **La puerta del microondas:**  
   Si abres la puerta mientras calienta, el microondas **se apaga automáticamente en el milisegundo cero**. Es un guardrail físico: no confía en que tú recuerdes apagarlo; bloquea el peligro por diseño.
2. **Las ruedas de entrenamiento en la bicicleta infantil:**  
   No pedalean por el niño, pero si la bicicleta se inclina peligrosamente hacia un costado, tocan el suelo y evitan una fractura.
3. **El enchufe eléctrico de 3 clavijas (con polo a tierra):**  
   Tiene una clavija redonda más larga que las otras dos. Es imposible enchufarlo al revés; su propia geometría física actúa como guardrail.

### 🛡️ Los 4 Niveles de Guardrails en Desarrollo con IA:
1. **Guardrails de Instrucción (`AGENTS.md` y `RULES.md`):**  
   Restricciones textuales explícitas: *"Prohibido inventar APIs no descritas en la especificación"*, *"Prohibido tocar localStorage directamente desde componentes React"*.
2. **Guardrails Estructurales (Scripts y CI/CD - `npm run check:guardrails`):**  
   Barreras de código automáticas que escanean el proyecto y ejecutan el arnés antes de permitir un commit o un despliegue. Si una regla se viola, el script aborta con código de error.
3. **Guardrails de Negocio y UX (Anti-dedazos - `RF-4.6`):**  
   Frenos de seguridad en la aplicación para proteger al usuario en la vida real. Si un artículo ya está marcado como comprado en el supermercado, el sistema exige confirmación explícita antes de desmarcarlo.
4. **Guardrails de Resiliencia (Fallback - `RNF-02`):**  
   Tolerancia a fallos catastróficos. Si los datos locales se corrompen, la aplicación inicializa una estructura limpia vacía en lugar de colapsar con una pantalla en blanco.

---

## 5. Skills (Habilidades): La Carpeta de Especialidad de la IA

Imagina que contratas a un chef profesional muy inteligente. Sabe cocinar comida internacional, pero hoy tu restaurante va a abrir una estación de **Pastelería Francesa de Alta Precisión**.

El chef tiene la capacidad cerebral, pero para no cometer errores en las temperaturas del merengue, le entregas una **carpeta de especialidad** con las recetas exactas, las tablas de conversión de gramos a mililitros y la lista de fallos que jamás debe cometer.

**Esa carpeta es un Skill.**

### ¿Qué es un Skill en Antigravity y Sistemas de IA?
- Es un paquete modular de instrucciones avanzadas, plantillas y herramientas que le enseñan a la IA **cómo realizar una tarea técnica específica al nivel de un experto**.
- **Ejemplos reales:**
  - `automation`: Instruye a la IA sobre cómo programar tareas periódicas (cron jobs).
  - `generative_ui`: Le enseña a la IA cómo generar interfaces interactivas y diagramas ricos dentro del chat.
  - `plugin`: Guía para empaquetar extensiones completas.
- **¿Para qué sirve?** Evita que la IA adivine o use métodos obsoletos; le da el manual oficial de procedimientos antes de empezar a trabajar.

---

## 6. MCP (Model Context Protocol): El USB-C Universal de la IA

Antes de que se inventara el estándar **USB-C**, conectar aparatos era una pesadilla: un teléfono usaba micro-USB, una cámara usaba mini-USB, un iPhone usaba Lightning y una impresora usaba USB tipo B. Había que comprar decenas de adaptadores incompatibles.

El **USB-C** resolvió esto unificando todo: **un solo conector estándar para cualquier dispositivo.**

### ¿Qué problema resuelve el MCP en la IA?
Históricamente, una IA es un cerebro aislado dentro de una ventana de texto. Si querías que la IA consultara tu base de datos de MySQL, tu cuenta de GitHub, tus archivos en Google Drive o tu servidor local, un programador tenía que escribir un código conector exclusivo y frágil para cada herramienta.

**MCP (Model Context Protocol) es el USB-C universal de la Inteligencia Artificial.**
- Es un protocolo estándar y abierto (creado por Anthropic y adoptado globalmente).
- Permite que cualquier sistema (un motor de base de datos, GitHub, una API meteorológica o tus archivos locales) cree un "servidor MCP".
- La IA se "enchufa" a ese servidor con un protocolo común y puede leer datos o disparar acciones de forma segura y estandarizada, sin inventar conectores propietarios.

---

## 7. Arquitectura de Agentes, Subagentes y Slash Commands en Pair Programming

En nuestro laboratorio de **Pair Programming (Programación en Pareja)** entre Chris (humano) y Antigravity (IA):

```
       [ CHRIS - Desarrollador & Piloto Humano ]
                          │
            Da instrucciones y toma decisiones
                          ▼
       [ ANTIGRAVITY - Agente Orquestador Copiloto ]
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
 [ Subagente Coder ]             [ Subagente Tester ]
 Modifica código en src/         Ejecuta arnés y guardrails
```

### 1. El Humano (Chris):
Tiene el volante y la visión estratégica. Define qué negocio queremos construir, aprueba la especificación y valida los resultados finales.

### 2. El Agente Orquestador (Antigravity):
Es el copiloto principal. Mantiene la conversación, coordina las fases de trabajo, actualiza la memoria viva (`MEMORY.md`) y supervisa que no se rompan las reglas.

### 3. Los Subagentes:
Son agentes especializados que el orquestador puede despertar para tareas puntuales y aisladas:
- **Subagente Investigador (Research):** Lee documentación y busca soluciones sin llenar de texto la conversación principal.
- **Subagente Tester (QA):** Ejecuta las pruebas en un entorno aislado y devuelve un veredicto objetivo (Verde 🟢 o Rojo 🔴).

### 4. ¿Qué son los Slash Commands (Comandos con `/`)?
Son atajos rápidos que el usuario escribe en la caja de texto (como `/plan`, `/goal`, `/schedule` o comandos personalizados). Sirven para disparar flujos de trabajo predefinidos con una sola palabra clave.

---

## 8. Matriz Comparativa y Diccionario Conceptual Rápido

| Concepto | Analogía de la Vida Real | Función en el Proyecto SuperCarrito |
| :--- | :--- | :--- |
| **Spec-Driven Development (SDD)** | El plano del arquitecto antes de colocar ladrillos. | [`app/docs/ESPECIFICACION_PRINCIPAL.md`](file:///c:/xampp/htdocs/Antigravity-sdd/app/docs/ESPECIFICACION_PRINCIPAL.md) como Única Fuente de Verdad. |
| **Arnés de Pruebas (Harness)** | El banco de pruebas del laboratorio o el catador de cocina. | [`app/tests/harness.html`](file:///c:/xampp/htdocs/Antigravity-sdd/app/tests/harness.html) para validación sensorial objetiva (7/7 verde). |
| **Guardrails Duales (CLI + Web)** | La barandilla de la autopista y el tablero de control de mando. | [`app/scripts/guardrails.js`](file:///c:/xampp/htdocs/Antigravity-sdd/app/scripts/guardrails.js) en terminal y [`app/tests/guardrails.html`](file:///c:/xampp/htdocs/Antigravity-sdd/app/tests/guardrails.html) en navegador. |
| **Skills** | La carpeta de recetas secretas del chef pastelero. | Conjuntos de instrucciones especializadas para capacitar a la IA en un tema. |
| **MCP** | El conector universal USB-C. | Protocolo estándar para conectar la IA a herramientas, APIs y bases de datos. |
| **Agente Orquestador** | El maestro de obras. | Antigravity conversando y guiando el proceso general del proyecto. |
| **Subagentes** | Los especialistas (el electricista, el fontanero). | Procesos paralelos delegados para tareas específicas de análisis o pruebas. |
| **ADR (Architecture Decision Record)** | El libro de actas de una junta directiva. | Registros numerados en [`app/MEMORY.md`](file:///c:/xampp/htdocs/Antigravity-sdd/app/MEMORY.md) (ADR-01 a ADR-07). |

---

## 9. Caso de Estudio Real: SuperCarrito SDD

Durante este laboratorio resolvimos hitos de ingeniería de software de alto nivel:

1. **Desacoplamiento Relacional:**  
   Separación del catálogo maestro (`productos`) de las compras efímeras (`listas` y `productos_listas`).
2. **Nacionalización con Retrocompatibilidad (v2.1):**  
   Cambio de entidades en inglés a español, implementando un motor de migración automática transparente que preserva los datos existentes de los usuarios.
3. **Regla de Confirmación Anti-dedazos (v2.2):**  
   Implementación del método `alternarConConfirmacion(itemId, callbackConfirmacion)`.
4. **Flujo Cronológico y Header Minimalista (v2.3 y v2.4):**  
   Evolución de marca a **SuperCarrito**, organización en 3 pasos cronológicos y limpieza de la navegación con botón dinámico `← Volver al Inicio`.
5. **Guardrails Duales en 5 Fases (v2.4 - v2.5.2):**  
   Validación de 37 puntos de control en menos de 30ms vía terminal (`npm run check:guardrails`) y vía navegador interactivo (`tests/guardrails.html`).
6. **Centro Unificado de Gestión en Dos Secciones (v2.5.0):**  
   Consolidación del Catálogo de despensa arriba y Mantenimiento de listas abajo en una sola vista coherente activada por el botón único "Gestionar" en portada (RF-5.4).
7. **Selector con Checkboxes en Lote (v2.5.1):**  
   Visualización directa de todos los productos y casillas de selección múltiple con carga en lote (RF-3.1).
8. **Modo Claro/Oscuro y Header Minimalista Estricto (v2.5.2):**  
   Control de tema Sol/Luna con persistencia y botón con icono de Home en subpantallas, eliminando cualquier ruido visual de la barra superior (RF-5.2).

---

## 10. Checklist Profesional y Protocolo de Trabajo Definitivo

Cada vez que vayas a construir una nueva función en cualquier proyecto futuro:

```text
[ ] 1. Acordar el requerimiento de negocio con el sponsor / usuario.
[ ] 2. Redactar el requerimiento formal en docs/ESPECIFICACION_PRINCIPAL.md (subir versión SemVer).
[ ] 3. Escribir la prueba unitaria en tests/harness.html con identificador formal (RF-* / RNF-*).
[ ] 4. Ejecutar el arnés y verificar el FALLO CIENTÍFICO EN ROJO 🔴 (Fase Roja).
[ ] 5. Implementar el código mínimo en src/ hasta lograr ÉXITO EN VERDE 🟢 (Fase Verde).
[ ] 6. Ejecutar los guardrails automáticos en terminal (npm run check:guardrails) o panel web (tests/guardrails.html).
[ ] 7. Registrar la decisión y lecciones aprendidas en MEMORY.md (ADR).
[ ] 8. Ejecutar commit atómico en Git siguiendo Conventional Commits (feat: ..., test: ...).
```

