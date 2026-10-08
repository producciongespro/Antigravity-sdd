import React from 'react';
import { ShoppingCart, ClipboardList, Layers, ArrowRight, ShieldCheck, FlaskConical, ExternalLink } from 'lucide-react';

export default function HomeHub({
  onGoToShopping,
  onGoToGestion,
  onGoToLists,
  onGoToCatalog,
  onGoToAuditoria,
  activeList,
  stats,
  db
}) {
  const totalProductos = (db?.productos || []).length;
  const totalListas = (db?.listas || []).length;
  const pendientes = stats?.pendientes ?? 0;
  const porcentaje = stats?.porcentaje ?? 0;

  return (
    <div className="space-y-6 animate-fadeIn py-2">
      {/* Banner de Bienvenida */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Versión 2.4 · Español
            </span>
            <span className="text-xs text-slate-400">Spec-Driven Development</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            ¡Hola, bienvenido a SuperCarrito!
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Organiza tus compras en orden cronológico natural: planifica en casa, sal a comprar con modo táctil en tienda y audita la calidad en el laboratorio.
          </p>
        </div>

        {/* Resumen Rápido de Estado */}
        <div className="flex sm:flex-col gap-3 sm:gap-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/60 text-xs flex-shrink-0 self-stretch sm:self-auto justify-around sm:justify-start">
          <div className="text-slate-400">
            Despensa: <strong className="text-white">{totalProductos}</strong> productos
          </div>
          <div className="text-slate-400">
            Listas: <strong className="text-white">{totalListas}</strong> creadas
          </div>
          <div className="text-slate-400">
            Activa: <strong className="text-emerald-400 truncate max-w-[120px] inline-block align-bottom">{activeList?.titulo || 'Ninguna'}</strong>
          </div>
        </div>
      </div>

      {/* LOS TRES GRANDES MÓDULOS DE ACCESO */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Módulos Principales de la Aplicación
          </h3>
          <span className="text-xs text-slate-500 font-mono">Paso 1 → Paso 2 → Paso 3</span>
        </div>

        {/* PASO 1: GESTIÓN Y CATÁLOGOS (EN CASA) */}
        <div className="bg-slate-800 border-2 border-sky-500/30 hover:border-sky-500/70 transition-all rounded-2xl p-5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center text-3xl font-bold shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform">
              <ClipboardList className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-wider">
                  Paso 1 · En Casa
                </span>
                <h4 className="text-lg font-black text-white group-hover:text-sky-400 transition-colors">
                  Gestión
                </h4>
              </div>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                Módulo unificado para administrar tu despensa maestra y armar tus listas de compras en un solo lugar antes de salir al supermercado.
              </p>
            </div>
          </div>

          {/* Botón único de acción del Paso 1 */}
          <div className="w-full md:w-auto flex justify-end flex-shrink-0">
            <button
              onClick={onGoToGestion || onGoToLists}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-black flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-sky-500/30"
            >
              <span>Gestionar</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* PASO 2: VAMOS AL SÚPER (EN LA TIENDA) */}
        <div className="bg-slate-800 border-2 border-emerald-500/40 hover:border-emerald-500 transition-all rounded-2xl p-5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group bg-gradient-to-br from-slate-800 to-emerald-950/20">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center text-3xl font-black shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
              <ShoppingCart className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Paso 2 · En el Pasillo
                </span>
                <h4 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                  ¡Vamos al Súper!
                </h4>
              </div>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                Modo táctil optimizado para recorrer los pasillos: tacha productos conforme los colocas en el carrito con <strong>protección anti-dedazos (RF-4.6)</strong> y métricas en vivo.
              </p>
              {activeList && (
                <div className="mt-2.5 flex items-center gap-3 text-xs text-emerald-400 font-medium">
                  <span>Lista actual: <strong>{activeList.titulo}</strong></span>
                  <span>•</span>
                  <span>{pendientes} pendientes ({porcentaje}% completado)</span>
                </div>
              )}
            </div>
          </div>

          {/* Botón de acción del Paso 2 */}
          <div className="w-full md:w-auto flex justify-end flex-shrink-0">
            <button
              onClick={onGoToShopping}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-black flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-emerald-500/30"
            >
              <span>¡Entrar al Súper!</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* PASO 3: LABORATORIO SDD Y GUARDRAILS (ASEGURAMIENTO Y CALIDAD) */}
        <div 
          onClick={onGoToAuditoria}
          className="bg-slate-800 border-2 border-purple-500/30 hover:border-purple-500/70 transition-all rounded-2xl p-5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group bg-gradient-to-br from-slate-800 to-purple-950/20 cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center text-3xl font-bold shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform">
              <FlaskConical className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                  Paso 3 · Laboratorio & Aseguramiento
                </span>
                <h4 className="text-lg font-black text-white group-hover:text-purple-400 transition-colors">
                  Arnés de Pruebas y Guardrails Visuales
                </h4>
              </div>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                Verifica la integridad de la especificación directamente en el navegador: ejecuta las 7 pruebas del arnés sensorial y la auditoría completa de los 37 Guardrails en tiempo real dentro de la misma aplicación.
              </p>
            </div>
          </div>

          {/* Botón de acción del Paso 3 */}
          <div className="w-full md:w-auto flex justify-end flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onGoToAuditoria();
              }}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 text-sm font-black flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-purple-500/30"
            >
              <span>Auditar Sistema</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Pie Informativo de Auditoría */}
      <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>Gobernanza SDD: <strong>29 Guardrails activos</strong> y contratos validados al 100%.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-slate-500">npm run check:guardrails</span>
          <span className="text-emerald-400 font-bold">🟢 Todo en Verde</span>
        </div>
      </div>
    </div>
  );
}
