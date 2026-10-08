# ARCHITECTURE.md - Arquitectura del Sistema SuperCart (SDD)

> **Documento:** `docs/ARCHITECTURE.md`  
> **Versión:** 1.0.0  
> **Estado:** Aprobado  
> **Alineación:** Conforme a [`docs/SPEC.md`](SPEC.md) v2.12.0

---

## 🏛️ 1. Visión General del Sistema

SuperCart es una Single Page Application (SPA) modular y reactiva diseñada para optimizar la planificación y ejecución de compras de supermercado. Su núcleo arquitectónico se basa en el **desacoplamiento total entre el catálogo maestro y las listas de compra**, operando localmente mediante una base de datos relacional simulada sobre `localStorage` con alta tolerancia a fallos.

---

## 🧩 2. Arquitectura de Componentes y Capas

El sistema está estructurado en 3 capas desacopladas con flujo unidireccional:

```mermaid
flowchart TD
    subgraph UI ["Capa de Presentación (React 18 + Tailwind v4)"]
        APP["App.jsx (Orquestador de Estado y Vistas)"]
        HEADER["Header.jsx (Navegación y Métricas Globales)"]
        CATALOG["ProductCatalog.jsx (Módulo 1: Catálogo Maestro)"]
        LISTS["ListManager.jsx (Módulo 2 y 3: Gestor y Armador de Listas)"]
        SHOPPING["ActiveShopping.jsx (Módulo 4: Modo Supermercado Táctil)"]
    end

    subgraph SERVICE ["Capa de Dominio y Servicio"]
        STORAGE["SupermarketStorage (src/services/storage.js)\n- Reglas de negocio\n- Integridad referencial\n- Migración v2.0 -> v2.1\n- Tolerancia a JSON corrupto"]
    end

    subgraph DATA ["Capa de Persistencia"]
        LOCAL_STORAGE[("localStorage ('supermarket_app_db_v2')")]
        MOCK_STORAGE[("MockStorage (Sandbox de Pruebas y Guardrails)")]
    end

    APP --> HEADER
    APP --> CATALOG
    APP --> LISTS
    APP --> SHOPPING

    CATALOG -.->|Invocaciones CRUD| STORAGE
    LISTS -.->|Invocaciones CRUD| STORAGE
    SHOPPING -.->|Toggle y Confirmación| STORAGE

    STORAGE -->|Persistencia en Producción| LOCAL_STORAGE
    STORAGE -.->|Inyección en Tests / CLI| MOCK_STORAGE
```

---

## 🔄 3. Flujo de Datos Unidireccional y Reactivo

Toda mutación de datos sigue un ciclo determinista y sincrónico:

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Vista as ActiveShopping.jsx
    participant App as App.jsx
    participant Servicio as SupermarketStorage
    participant DB as localStorage

    Usuario->>Vista: Clic en Checkbox (Desmarcar artículo)
    Vista->>Servicio: alternarConConfirmacion(itemId, callbackConfirmacion)
    Note over Servicio: Guardrail de UX (RF-4.6):<br/>¿Está ya enCarrito === true?
    Servicio->>Usuario: Solicita confirmación explícita
    Usuario-->>Servicio: Confirma desmarcado (true)
    Servicio->>DB: setItem('supermarket_app_db_v2', JSON.stringify(nuevaBD))
    Servicio-->>Vista: Retorna nuevo estado (false)
    Vista->>App: Notifica actualización de datos
    App->>App: Re-renderiza vista con nuevo progreso
```

---

## 🗄️ 4. Modelo de Datos Relacional

El esquema relacional desacopla la despensa general de las listas puntuales a través de una entidad intermedia asociativa:

```mermaid
erDiagram
    PRODUCTO ||--o{ PRODUCTO_LISTA : "se vincula en"
    LISTA ||--o{ PRODUCTO_LISTA : "contiene"

    PRODUCTO {
        string id PK "prod_<timestamp>_<random>"
        string nombre "Trimmed, no vacío"
        string categoria "Lácteos, Abarrotes, etc."
        string unidad "kg, litros, unidades, etc."
        number creadoEn "Timestamp Unix"
    }

    LISTA {
        string id PK "list_<timestamp>_<random>"
        string titulo "Nombre de la lista"
        string fecha "ISO YYYY-MM-DD"
        string estado "borrador | activa | completada"
        number creadoEn "Timestamp Unix"
    }

    PRODUCTO_LISTA {
        string id PK "item_<timestamp>_<random>"
        string listaId FK "Referencia a LISTA.id"
        string productoId FK "Referencia a PRODUCTO.id"
        number cantidad "Mínimo 1 (acumulativa)"
        boolean enCarrito "true = comprado, false = pendiente"
        string notas "Notas opcionales"
    }
```

### Reglas de Integridad Referencial:
1. **Borrado en Cascada ([RF-2.4](SPEC.md#L87)):** Al eliminar una `Lista`, se destruyen automáticamente todos sus registros asociados en `productos_listas`.
2. **Preservación ante Desincorporación ([RF-1.3](SPEC.md#L80)):** Si un `Producto` maestro se elimina, las listas existentes preservan sus ítems con valores de salvaguarda sin provocar excepciones de referencia nula.
3. **Acumulación de Cantidad ([RF-3.2](SPEC.md#L91)):** Si se intenta vincular un producto ya existente en la lista, no se duplica el registro; se incrementa la propiedad `cantidad`.

---

## 🛡️ 5. Resiliencia, Tolerancia a Fallos y Migración

```mermaid
flowchart TD
    START([Inicio obtenerBaseDeDatos]) --> CHECK_STORE{¿Existe valor en storage?}
    CHECK_STORE -- No --> SEED[Sembrar datos de demostración en español - RNF-04]
    CHECK_STORE -- Sí --> PARSE[Parsear JSON]
    
    PARSE --> VALID_JSON{¿JSON válido?}
    VALID_JSON -- Fallo (Corrupto) --> SAFE_RESET[Inicializar tablas limpias [] - RNF-02]
    
    VALID_JSON -- Éxito --> CHECK_LEGACY{¿Contiene claves en inglés?<br/>products / lists / items}
    CHECK_LEGACY -- Sí --> MIGRATE[Migración automática al vuelo v2.0 -> v2.1 - RNF-03]
    CHECK_LEGACY -- No --> RETURN[Retornar base de datos en español v2.2]
    
    MIGRATE --> SAVE_MIGRATED[Guardar estructura migrada] --> RETURN
    SAFE_RESET --> RETURN
    SEED --> RETURN
```

---

## 🧪 6. Estrategia de Pruebas y Guardrails

El sistema cuenta con dos mecanismos de verificación complementarios:

1. **Arnés Visual en Navegador ([tests/harness.html](file:///c:/xampp/htdocs/Antigravity-sdd/app/tests/harness.html)):**
   - Ejecuta las 7 pruebas agrupadas por sección con interfaz interactiva, métricas en vivo y botón de re-ejecución.
2. **Guardrail Script CLI en Node.js ([scripts/guardrails.js](file:///c:/xampp/htdocs/Antigravity-sdd/app/scripts/guardrails.js)):**
   - Se ejecuta mediante `npm run check:guardrails` o `npm test`.
   - Inspecciona estáticamente los archivos contra violaciones de dominio y estilo.
   - Ejecuta de forma *headless* las aserciones del arnés en memoria.
   - Actúa como compuerta de paso en CI/CD y ganchos pre-commit.
