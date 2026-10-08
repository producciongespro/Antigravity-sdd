import React, { useEffect } from 'react';
import { ShoppingCart, AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  title = '¿Sacar producto del carrito?',
  message,
  productName,
  confirmText = 'Sí, sacar del carrito',
  cancelText = 'No, mantener en carrito',
  onConfirm,
  onCancel
}) {
  // Manejo de tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      {/* Contenedor Modal */}
      <div 
        className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-5 transform transition-all animate-scaleUp text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Encabezado e Ícono */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-inner">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Confirmación Anti-dedazos</span>
              </div>
              <h3 id="modal-title" className="text-lg font-black text-white leading-tight">
                {title}
              </h3>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-700/60 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensaje descriptivo */}
        <div className="bg-slate-900/60 border border-slate-700/80 rounded-2xl p-4 space-y-1.5">
          <p className="text-xs text-slate-300 leading-relaxed">
            {message || (
              <>
                Usted va a sacar del carrito el producto{' '}
                <strong className="text-amber-300 font-extrabold text-sm block mt-1">
                  "{productName}"
                </strong>
              </>
            )}
          </p>
          <p className="text-[11px] text-slate-400">
            Si confirma, el producto regresará a la lista de pendientes por comprar.
          </p>
        </div>

        {/* Botones de Acción Táctiles Grandes */}
        <div className="flex flex-col-reverse sm:flex-row items-center gap-2.5 pt-1">
          <button
            onClick={onCancel}
            type="button"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 active:bg-slate-700 text-white font-bold text-xs transition-all shadow-sm text-center"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            type="button"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 text-center"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
