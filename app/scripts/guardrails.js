/**
 * ============================================================================
 * 🛡️ MOTOR DE GUARDRAILS AUTOMATIZADO - SUPERCART SDD
 * ============================================================================
 * Plantilla Maestra de Verificación para Spec-Driven Development, Arneses y Agentes.
 * 
 * Evalúa 5 Fases Críticas:
 *   1. Integridad de Artefactos Fundamentales
 *   2. Integridad Semántica de la Especificación (SSOT)
 *   3. Memoria Viva, ADRs y Gobernanza Operativa
 *   4. Linter de Dominio, Nomenclatura y Aislamiento de Capas
 *   5. Arnés Dinámico en Modo Headless (Ejecución de Pruebas en Memoria)
 * 
 * Uso:
 *   npm run check:guardrails
 *   npm test
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 1. Configuración de Rutas Relativas al Proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Formato de colores ANSI para terminal
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  bgRed: '\x1b[41m\x1b[37m',
  bgGreen: '\x1b[42m\x1b[30m'
};

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const violations = [];

function check(description, fn) {
  totalChecks++;
  try {
    const result = fn();
    if (result === false) {
      throw new Error('Validación no superada');
    }
    passedChecks++;
    console.log(`  ${colors.green}✔${colors.reset} ${description}`);
    return true;
  } catch (error) {
    failedChecks++;
    const msg = error?.message || String(error);
    violations.push({ description, error: msg });
    console.log(`  ${colors.red}✖${colors.reset} ${description}`);
    console.log(`    ${colors.yellow}└─ Motivo: ${msg}${colors.reset}`);
    return false;
  }
}

function printSection(title, icon = '🔷') {
  console.log(`\n${colors.bold}${colors.cyan}${icon} ${title}${colors.reset}`);
  console.log(`${colors.dim}${'─'.repeat(75)}${colors.reset}`);
}

async function runGuardrails() {
  const startTime = Date.now();

  console.log(`\n${colors.bold}${colors.blue}==============================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}  🛡️  EJECUTANDO GUARDRAILS MAESTROS - PROYECTO SUPERCART SDD              ${colors.reset}`);
  console.log(`${colors.dim}  Ubicación base: ${ROOT_DIR}${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}==============================================================================${colors.reset}`);

  // ==========================================================================
  // FASE 1: ARTEFACTOS FUNDAMENTALES DEL SISTEMA SDD
  // ==========================================================================
  printSection('FASE 1: Existencia de Artefactos Fundamentales SDD', '📁');

  const requiredFiles = [
    { file: 'docs/ESPECIFICACION_PRINCIPAL.md', desc: 'Especificación Principal (SSOT)' },
    { file: 'AGENTS.md', desc: 'Reglamento Operativo para Agentes de IA' },
    { file: 'MEMORY.md', desc: 'Bitácora de Memoria y Decisiones Arquitectónicas (ADRs)' },
    { file: 'RULES.md', desc: 'Estándares de Ingeniería y Reglas de Codificación' },
    { file: 'docs/ARCHITECTURE.md', desc: 'Documento y Diagramas de Arquitectura' },
    { file: 'tests/harness.html', desc: 'Arnés de Pruebas Visual' },
    { file: 'tests/guardrails.html', desc: 'Panel Web de Guardrails Visuales' },
    { file: 'src/services/storage.js', desc: 'Motor de Dominio y Persistencia (Storage Service)' },
    { file: 'src/App.jsx', desc: 'Componente Principal de Entrada' },
    { file: 'src/components/HomeHub.jsx', desc: 'Pantalla Principal de Inicio (HomeHub)' },
    { file: 'src/components/GestionHub.jsx', desc: 'Centro Unificado de Gestión (GestionHub)' },
    { file: 'src/components/AuditoriaHub.jsx', desc: 'Centro Integrado de Auditoría y Guardrails (AuditoriaHub)' },
    { file: 'src/components/ConfirmModal.jsx', desc: 'Modal Táctil de Confirmación Anti-dedazos (ConfirmModal)' },
    { file: 'src/index.css', desc: 'Hoja de Estilos Global' }
  ];

  for (const item of requiredFiles) {
    check(`Existe ${item.desc} (${colors.dim}${item.file}${colors.reset})`, () => {
      const fullPath = path.join(ROOT_DIR, item.file);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Archivo no encontrado en: ${fullPath}`);
      }
      const stat = fs.statSync(fullPath);
      if (stat.size === 0) {
        throw new Error(`El archivo está vacío`);
      }
      return true;
    });
  }

  // ==========================================================================
  // FASE 2: INTEGRIDAD SEMÁNTICA DE LA ESPECIFICACIÓN (SSOT)
  // ==========================================================================
  printSection('FASE 2: Integridad Semántica de la Especificación (SSOT)', '📜');

  const specPath = path.join(ROOT_DIR, 'docs/ESPECIFICACION_PRINCIPAL.md');
  const specContent = fs.existsSync(specPath) ? fs.readFileSync(specPath, 'utf8') : '';

  check('La Especificación declara un número de versión formal válido (SemVer)', () => {
    const versionMatch = specContent.match(/Versión:\*{0,2}\s*(\d+\.\d+\.\d+)/i);
    if (!versionMatch) {
      throw new Error('No se encontró el encabezado de versión (ej. Versión: 2.2.0)');
    }
    return true;
  });

  check('La Especificación define el Historial de Cambios (Changelog)', () => {
    return specContent.includes('Historial de Cambios') || specContent.includes('Changelog');
  });

  check('La Especificación define el Modelo de Dominio en español (productos, listas, productos_listas)', () => {
    const hasProductos = specContent.includes('productos:');
    const hasListas = specContent.includes('listas:');
    const hasProductosListas = specContent.includes('productos_listas:');
    if (!hasProductos || !hasListas || !hasProductosListas) {
      throw new Error('El contrato de datos carece de las tablas normalizadas en español');
    }
    return true;
  });

  check('La Especificación define la Regla Anti-dedazos con Modal Táctil (RF-4.6)', () => {
    return specContent.includes('RF-4.6') && specContent.includes('ConfirmModal');
  });

  check('La Especificación define la Pantalla Principal y Flujo Cronológico (RF-5.1)', () => {
    return specContent.includes('RF-5.1') && specContent.includes('SuperCarrito');
  });

  check('La Especificación define el Header Contextual Minimalista (RF-5.2)', () => {
    return specContent.includes('RF-5.2') && specContent.includes('Volver al Inicio');
  });

  check('La Especificación define el Panel Web de Guardrails y Laboratorio SDD (RF-5.3)', () => {
    return specContent.includes('RF-5.3') && specContent.includes('tests/guardrails.html');
  });

  check('La Especificación define el Centro Unificado de Gestión en Dos Secciones (RF-5.4)', () => {
    return specContent.includes('RF-5.4') && specContent.includes('GestionHub');
  });

  check('La Especificación define el Selector con Checkboxes y Carga en Lote (RF-3.1)', () => {
    return specContent.includes('RF-3.1') && specContent.includes('Checkboxes');
  });

  check('La Especificación define la Navegación Lateral estilo AdminLTE para Mantenimiento (RF-5.5)', () => {
    return specContent.includes('RF-5.5') && specContent.includes('Sidebar') && specContent.includes('AdminLTE');
  });

  check('La Especificación define las Reglas de Resiliencia y Migración (RNF-02 / RNF-03)', () => {
    return specContent.includes('RNF-02') && specContent.includes('RNF-03');
  });

  // ==========================================================================
  // FASE 3: AUDITORÍA DE MEMORIA VIVA, ADRs Y GOBERNANZA
  // ==========================================================================
  printSection('FASE 3: Gobernanza Operativa y Bitácora de Memoria', '🧠');

  const memoryPath = path.join(ROOT_DIR, 'MEMORY.md');
  const memoryContent = fs.existsSync(memoryPath) ? fs.readFileSync(memoryPath, 'utf8') : '';

  check('MEMORY.md contiene registro de Decisiones Arquitectónicas (ADRs)', () => {
    const adrMatches = memoryContent.match(/###\s*ADR-\d+/g);
    if (!adrMatches || adrMatches.length < 3) {
      throw new Error(`Se esperaban al menos 3 ADRs documentadas, pero se encontraron ${adrMatches ? adrMatches.length : 0}`);
    }
    return true;
  });

  check('AGENTS.md exige Spec-Driven Development (SDD) como principio fundamental', () => {
    const agentsPath = path.join(ROOT_DIR, 'AGENTS.md');
    const agentsContent = fs.existsSync(agentsPath) ? fs.readFileSync(agentsPath, 'utf8') : '';
    return agentsContent.includes('Spec-Driven Development') && agentsContent.includes('docs/ESPECIFICACION_PRINCIPAL.md');
  });

  check('RULES.md define Criterios de Entrega (Definition of Done)', () => {
    const rulesPath = path.join(ROOT_DIR, 'RULES.md');
    const rulesContent = fs.existsSync(rulesPath) ? fs.readFileSync(rulesPath, 'utf8') : '';
    return rulesContent.includes('Definition of Done') && rulesContent.includes('check:guardrails');
  });

  // ==========================================================================
  // FASE 4: LINTER ESTÁTICO DE DOMINIO, CAPAS Y STACK
  // ==========================================================================
  printSection('FASE 4: Linter de Dominio, Nomenclatura y Aislamiento de Capas', '🔍');

  // 4.1 Tailwind CSS v4 check
  check('Uso moderno de Tailwind CSS v4 (@import "tailwindcss";)', () => {
    const cssPath = path.join(ROOT_DIR, 'src/index.css');
    const css = fs.readFileSync(cssPath, 'utf8');
    if (css.includes('@tailwind base') || css.includes('@tailwind components')) {
      throw new Error('Se detectaron directivas obsoletas de Tailwind v3 (@tailwind base / components)');
    }
    if (!css.includes('@import "tailwindcss"') && !css.includes("@import 'tailwindcss'")) {
      throw new Error('Falta la directiva obligatoria: @import "tailwindcss";');
    }
    return true;
  });

  // 4.2 Aislamiento de Persistencia (UI no debe tocar localStorage directamente)
  check('Aislamiento de Persistencia: Componentes de UI no acceden a localStorage directamente', () => {
    const componentsDir = path.join(ROOT_DIR, 'src/components');
    const appFile = path.join(ROOT_DIR, 'src/App.jsx');
    const filesToScan = [appFile];

    if (fs.existsSync(componentsDir)) {
      const compFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
      compFiles.forEach(f => filesToScan.push(path.join(componentsDir, f)));
    }

    const illegalAccesses = [];
    for (const filePath of filesToScan) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('localStorage.setItem') || content.includes('localStorage.getItem')) {
        illegalAccesses.push(path.basename(filePath));
      }
    }

    if (illegalAccesses.length > 0) {
      throw new Error(`Violación de arquitectura: acceso directo a localStorage en: ${illegalAccesses.join(', ')}`);
    }
    return true;
  });

  // 4.3 Detección de 'debugger;' en producción
  check('No existen sentencias "debugger;" olvidadas en src/', () => {
    function scanDirForDebugger(dir) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) {
          scanDirForDebugger(full);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
          const content = fs.readFileSync(full, 'utf8');
          if (/\bdebugger\s*;/.test(content)) {
            throw new Error(`Sentencia 'debugger;' encontrada en ${path.relative(ROOT_DIR, full)}`);
          }
        }
      }
    }
    scanDirForDebugger(path.join(ROOT_DIR, 'src'));
    return true;
  });

  // ==========================================================================
  // FASE 5: ARNÉS DINÁMICO EN MODO HEADLESS (EJECUCIÓN EN MEMORIA)
  // ==========================================================================
  printSection('FASE 5: Ejecución Dinámica del Arnés en Memoria (Headless Runner)', '⚡');

  try {
    // Importación dinámica del servicio de almacenamiento
    const storageModule = await import('../src/services/storage.js');
    const { SupermarketStorage, DB_KEY } = storageModule;

    // Sandbox Mock Storage en memoria
    class HeadlessMockStorage {
      constructor() { this.store = {}; }
      getItem(key) { return this.store[key] !== undefined ? this.store[key] : null; }
      setItem(key, value) { this.store[key] = String(value); }
      removeItem(key) { delete this.store[key]; }
      clear() { this.store = {}; }
    }

    // Suite de pruebas idéntica al arnés visual
    check('[RNF-02] Resistencia ante JSON corrupto (Inicialización limpia de tablas)', () => {
      const mock = new HeadlessMockStorage();
      mock.setItem(DB_KEY, '{ json_invalido_corrupto...');
      const service = new SupermarketStorage(mock);
      
      const originalWarn = console.warn;
      console.warn = () => {}; // Silenciar warn esperado de resiliencia
      let db;
      try {
        db = service.obtenerBaseDeDatos();
      } finally {
        console.warn = originalWarn;
      }

      if (!Array.isArray(db.productos) || !Array.isArray(db.listas) || !Array.isArray(db.productos_listas)) {
        throw new Error('Las tablas inicializadas deben ser arreglos válidos');
      }
      if (db.productos.length !== 0) {
        throw new Error('Debe resetear productos a arreglo vacío []');
      }
      return true;
    });

    check('[RNF-03] Migración automática de retrocompatibilidad (v2.0 inglés -> v2.1 español)', () => {
      const mock = new HeadlessMockStorage();
      const legacyData = {
        products: [{ id: 'prod_99', name: 'Café Tarrazú', category: 'Abarrotes', unit: 'bolsa', createdAt: 1000 }],
        lists: [{ id: 'list_99', title: 'Compras de Prueba', date: '2026-10-06', status: 'active', createdAt: 1000 }],
        items: [{ id: 'item_99', listId: 'list_99', productId: 'prod_99', quantity: 2, inCart: false }]
      };
      mock.setItem(DB_KEY, JSON.stringify(legacyData));

      const service = new SupermarketStorage(mock);
      const db = service.obtenerBaseDeDatos();

      if (!Array.isArray(db.productos) || db.productos[0]?.nombre !== 'Café Tarrazú') {
        throw new Error("El campo 'name' no migró a 'nombre'");
      }
      if (!Array.isArray(db.listas) || db.listas[0]?.titulo !== 'Compras de Prueba') {
        throw new Error("El campo 'title' no migró a 'titulo'");
      }
      if (!Array.isArray(db.productos_listas) || db.productos_listas[0]?.enCarrito !== false) {
        throw new Error("El campo 'inCart' no migró a 'enCarrito'");
      }
      return true;
    });

    check('[RF-1.1 / RF-1.3] Alta, validación de nombre obligatorio (trim) y eliminación de Producto', () => {
      const mock = new HeadlessMockStorage();
      mock.setItem(DB_KEY, JSON.stringify({ productos: [], listas: [], productos_listas: [] }));
      const service = new SupermarketStorage(mock);

      let threw = false;
      try { service.crearProducto({ nombre: "   " }); } catch (e) { threw = true; }
      if (!threw) throw new Error('Debe rechazar nombres vacíos');

      const prod = service.crearProducto({ nombre: "  Queso Blanco  ", categoria: "Lácteos", unidad: "kg" });
      if (prod.nombre !== "Queso Blanco") throw new Error('El nombre debe recortarse con trim()');
      if (!prod.id.startsWith('prod_')) throw new Error('El ID de producto debe iniciar con prod_');

      const deleted = service.eliminarProducto(prod.id);
      if (!deleted || service.obtenerProductos().length !== 0) {
        throw new Error('Error al eliminar producto del catálogo');
      }
      return true;
    });

    check('[RF-2.1 / RF-2.4] Creación de Lista y borrado en cascada de ítems vinculados', () => {
      const mock = new HeadlessMockStorage();
      mock.setItem(DB_KEY, JSON.stringify({ productos: [], listas: [], productos_listas: [] }));
      const service = new SupermarketStorage(mock);

      const lista = service.crearLista({ titulo: "Súper Mensual", fecha: "2026-10-15" });
      if (lista.titulo !== "Súper Mensual") throw new Error('Título de lista incorrecto');

      const prod = service.crearProducto({ nombre: "Arroz" });
      service.agregarProductoALista(lista.id, prod.id, 2);
      if (service.obtenerItemsDeLista(lista.id).length !== 1) throw new Error('Fallo al vincular producto a lista');

      service.eliminarLista(lista.id);
      if (service.obtenerListas().length !== 0) throw new Error('La lista no fue eliminada');
      if (service.obtenerItemsDeLista(lista.id).length !== 0) throw new Error('No se borraron en cascada los productos_listas');
      return true;
    });

    check('[RF-3.1 / RF-3.2] Vinculación de catálogo y acumulación de cantidad (2 + 3 = 5)', () => {
      const mock = new HeadlessMockStorage();
      mock.setItem(DB_KEY, JSON.stringify({ productos: [], listas: [], productos_listas: [] }));
      const service = new SupermarketStorage(mock);

      const lista = service.crearLista({ titulo: "Barbacoa" });
      const prod = service.crearProducto({ nombre: "Carne" });

      service.agregarProductoALista(lista.id, prod.id, 2);
      service.agregarProductoALista(lista.id, prod.id, 3);

      const items = service.obtenerItemsDeLista(lista.id);
      if (items.length !== 1) throw new Error('No debe duplicar registros de producto en la lista');
      if (items[0].cantidad !== 5) throw new Error(`Se esperaba cantidad 5 pero se obtuvo ${items[0].cantidad}`);
      return true;
    });

    check('[RF-3.1 / Batch] Carga en lote de múltiples productos seleccionados por checkbox', () => {
      const mock = new HeadlessMockStorage();
      mock.setItem(DB_KEY, JSON.stringify({ productos: [], listas: [], productos_listas: [] }));
      const service = new SupermarketStorage(mock);

      const lista = service.crearLista({ titulo: "Lote Compra" });
      const p1 = service.crearProducto({ nombre: "Huevos" });
      const p2 = service.crearProducto({ nombre: "Harina" });

      service.agregarMultiplesProductosALista(lista.id, [p1.id, p2.id], 1);
      const items = service.obtenerItemsDeLista(lista.id);
      if (items.length !== 2) throw new Error('Se esperaba 2 productos agregados en lote');
      return true;
    });

    check('[RF-4.2 / RF-4.4 / RF-4.5] Alternar en carrito (toggle), métricas en vivo y limpiar comprados', () => {
      const mock = new HeadlessMockStorage();
      mock.setItem(DB_KEY, JSON.stringify({ productos: [], listas: [], productos_listas: [] }));
      const service = new SupermarketStorage(mock);

      const lista = service.crearLista({ titulo: "Fin de Semana" });
      const p1 = service.crearProducto({ nombre: "Pan" });
      const p2 = service.crearProducto({ nombre: "Leche" });

      const item1 = service.agregarProductoALista(lista.id, p1.id, 1);
      service.agregarProductoALista(lista.id, p2.id, 1);

      let metricas = service.obtenerMetricasLista(lista.id);
      if (metricas.porcentaje !== 0) throw new Error('Progreso inicial debe ser 0%');

      const estado = service.alternarEnCarrito(item1.id);
      if (estado !== true) throw new Error('alternarEnCarrito debe retornar true');

      metricas = service.obtenerMetricasLista(lista.id);
      if (metricas.enCarrito !== 1 || metricas.pendientes !== 1 || metricas.porcentaje !== 50) {
        throw new Error(`Métricas incorrectas tras marcar 1 ítem: ${JSON.stringify(metricas)}`);
      }

      service.limpiarCompradosDeLista(lista.id);
      const restantes = service.obtenerItemsDeLista(lista.id);
      if (restantes.length !== 1 || restantes[0].nombreProducto !== "Leche") {
        throw new Error('limpiarCompradosDeLista eliminó los ítems equivocados');
      }
      return true;
    });

    check('[RF-4.6] Prevención de desmarcado accidental (Confirmación anti-dedazos)', () => {
      const mock = new HeadlessMockStorage();
      mock.setItem(DB_KEY, JSON.stringify({ productos: [], listas: [], productos_listas: [] }));
      const service = new SupermarketStorage(mock);

      const lista = service.crearLista({ titulo: "Compra Segura" });
      const prod = service.crearProducto({ nombre: "Aceite de Oliva" });
      const item = service.agregarProductoALista(lista.id, prod.id, 1);

      // 1. De pendiente a enCarrito -> sin confirmación
      let callbackLlamado = false;
      const estado1 = service.alternarConConfirmacion(item.id, () => {
        callbackLlamado = true;
        return true;
      });
      if (estado1 !== true) throw new Error('Debe marcar directo enCarrito a true');
      if (callbackLlamado) throw new Error('NO debe solicitar confirmación al marcar hacia el carrito');

      // 2. Desmarcado cancelado por el usuario
      callbackLlamado = false;
      const estado2 = service.alternarConConfirmacion(item.id, () => {
        callbackLlamado = true;
        return false;
      });
      if (!callbackLlamado) throw new Error('SÍ debe solicitar confirmación al intentar desmarcar');
      if (estado2 !== true) throw new Error('Debe conservar enCarrito en true al cancelar la confirmación');

      // 3. Desmarcado aceptado por el usuario
      const estado3 = service.alternarConConfirmacion(item.id, () => true);
      if (estado3 !== false) throw new Error('Debe desmarcar a false cuando el usuario confirma');

      return true;
    });

    check('[RF-5.2 / Theme] Persistencia y alternancia de Tema Claro / Oscuro en Storage', () => {
      const mock = new HeadlessMockStorage();
      const service = new SupermarketStorage(mock);
      if (service.obtenerTema() !== 'dark') throw new Error('Tema inicial debe ser dark por defecto');
      service.guardarTema('light');
      if (service.obtenerTema() !== 'light') throw new Error('Fallo al guardar tema light');
      return true;
    });

  } catch (err) {
    failedChecks++;
    console.log(`  ${colors.red}✖ Error al cargar o ejecutar arnés headless:${colors.reset} ${err.message}`);
    violations.push({ description: 'Carga de Suite Headless', error: err.message });
  }

  // ==========================================================================
  // RESUMEN Y REPORTE FINAL
  // ==========================================================================
  const duration = Date.now() - startTime;
  console.log(`\n${colors.bold}${colors.blue}==============================================================================${colors.reset}`);
  console.log(`${colors.bold}📊 RESUMEN DE AUDITORÍA DE GUARDRAILS${colors.reset}`);
  console.log(`${colors.dim}──────────────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`  Total Verificaciones : ${colors.bold}${totalChecks}${colors.reset}`);
  console.log(`  Aprobadas (Green 🟢) : ${colors.green}${colors.bold}${passedChecks}${colors.reset}`);
  console.log(`  Fallidas  (Red 🔴)   : ${failedChecks === 0 ? colors.green + '0' : colors.red + colors.bold + failedChecks}${colors.reset}`);
  console.log(`  Tiempo de Ejecución  : ${colors.dim}${duration}ms${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}==============================================================================${colors.reset}`);

  if (failedChecks > 0) {
    console.log(`\n${colors.bgRed}${colors.bold} 🚫 ALERTA DE GUARDRAIL: SE DETECTARON ${failedChecks} INFRACCIONES CRÍTICAS ${colors.reset}\n`);
    violations.forEach((v, idx) => {
      console.log(`  ${idx + 1}. ${colors.bold}${v.description}${colors.reset}`);
      console.log(`     ${colors.red}Fallo: ${v.error}${colors.reset}`);
    });
    console.log(`\n${colors.yellow}👉 Corrige las infracciones señaladas para cumplir con la Definition of Done.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`\n${colors.bgGreen}${colors.bold} 🏆 TODOS LOS GUARDRAILS EN VERDE: EL SISTEMA CUMPLE AL 100% EL CONTRATO SDD ${colors.reset}\n`);
    process.exit(0);
  }
}

runGuardrails();
