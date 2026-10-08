import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App';
import { storageService } from '../src/services/storage';

describe('🧪 Arnés Sensorial End-to-End (E2E) - SuperCarrito SDD', () => {
  beforeEach(() => {
    localStorage.clear();
    // Reiniciar base de datos limpia con semillas oficiales
    storageService.obtenerBaseDeDatos();
  });

  it('1. [RF-5.1] Flujo de Inicio: Renderiza HomeHub con 3 Pasos y Navega a Gestión', async () => {
    render(<App />);

    // Verificar identidad de marca en Header
    expect(screen.getByText('SuperCarrito')).toBeDefined();

    // Verificar las tarjetas de los 3 pasos en Home
    expect(screen.getByText(/Paso 1 · En Casa/i)).toBeDefined();
    expect(screen.getByText(/Paso 2 · En el Pasillo/i)).toBeDefined();
    expect(screen.getByText(/Paso 3 · Laboratorio & Aseguramiento/i)).toBeDefined();

    // Hacer clic en el botón "Gestionar" (Paso 1)
    const btnGestionar = screen.getByRole('button', { name: /Gestionar/i });
    fireEvent.click(btnGestionar);

    // Debe mostrar la vista unificada de Gestión con su sidebar AdminLTE
    await waitFor(() => {
      expect(screen.getByText(/Opciones de Gestión/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /Catálogo/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /Armado de Listas/i })).toBeDefined();
    });

    // Probar el botón Home contextual del Header para regresar al inicio
    const btnHome = screen.getByTitle(/Volver a la ventana principal/i);
    fireEvent.click(btnHome);

    // Debe regresar a HomeHub
    await waitFor(() => {
      expect(screen.getByText(/Paso 1 · En Casa/i)).toBeDefined();
    });
  });

  it('2. [RF-3.1] Catálogo con Checkboxes: Selección Múltiple y Carga en Lote', async () => {
    render(<App />);

    // Ir a Gestión
    fireEvent.click(screen.getByRole('button', { name: /Gestionar/i }));

    // Ir a "Armado de Listas" en el menú lateral
    const btnArmado = screen.getByRole('button', { name: /Armado de Listas/i });
    fireEvent.click(btnArmado);

    // Verificar que existan opciones para selección
    await waitFor(() => {
      expect(screen.getByText(/Seleccionar todos/i)).toBeDefined();
    });

    // Encontrar checkboxes de productos en el catálogo
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    // Marcar el primer y segundo checkbox
    fireEvent.click(checkboxes[0]);
    if (checkboxes[1]) {
      fireEvent.click(checkboxes[1]);
    }

    // El botón de agregar refleja la cantidad seleccionada
    const btnAgregar = screen.getByRole('button', { name: /Agregar .* a la Lista/i });
    expect(btnAgregar).toBeDefined();

    // Ejecutar carga en lote
    fireEvent.click(btnAgregar);

    // El catálogo desmarca los ítems tras la carga exitosa
    await waitFor(() => {
      expect(checkboxes[0].checked).toBe(false);
    });
  });

  it('3. [RF-4.2 / RF-4.5] Modo Compra: Marcado en Carrito y Métricas en Tiempo Real', async () => {
    render(<App />);

    // Entrar al Modo Súper (Paso 2)
    const btnSuper = screen.getByRole('button', { name: /¡Entrar al Súper!/i });
    fireEvent.click(btnSuper);

    // Verificar que estamos en la pantalla de compra táctil
    await waitFor(() => {
      expect(screen.getByText(/Modo Supermercado/i)).toBeDefined();
      expect(screen.getByText(/1 de 4 artículos en el carrito/i)).toBeDefined();
    });

    // Buscar el producto pendiente "Leche Semidescremada" y hacer clic en su fila
    const itemPendiente = screen.getByText('Leche Semidescremada');
    fireEvent.click(itemPendiente);

    // Debe aumentar los artículos en el carrito a 2 de 4
    await waitFor(() => {
      expect(screen.getByText(/2 de 4 artículos en el carrito/i)).toBeDefined();
    });
  });

  it('4. [RF-4.6] Modal Táctil Anti-dedazos: Protege Desmarcado Accidental y Confirma Devolución', async () => {
    render(<App />);

    // Entrar al Modo Súper (Paso 2)
    fireEvent.click(screen.getByRole('button', { name: /¡Entrar al Súper!/i }));

    await waitFor(() => {
      expect(screen.getByText(/Modo Supermercado/i)).toBeDefined();
    });

    // "Arroz Blanco 99%" viene con enCarrito: true por defecto
    const itemEnCarrito = screen.getByText('Arroz Blanco 99%');
    expect(itemEnCarrito).toBeDefined();

    // Intentar desmarcarlo haciendo clic
    fireEvent.click(itemEnCarrito);

    // DEBE APARECER EL MODAL TÁCTIL PERSONALIZADO (NO window.confirm)
    await waitFor(() => {
      expect(screen.getByText(/¿Sacar producto del carrito\?/i)).toBeDefined();
      expect(screen.getByText(/Confirmación Anti-dedazos/i)).toBeDefined();
    });

    // CASO A: El usuario cancela ("No, mantener en carrito")
    const btnCancelar = screen.getByRole('button', { name: /No, mantener en carrito/i });
    fireEvent.click(btnCancelar);

    // El modal se cierra
    await waitFor(() => {
      expect(screen.queryByText(/¿Sacar producto del carrito\?/i)).toBeNull();
    });

    // CASO B: El usuario vuelve a hacer clic y esta vez confirma ("Sí, sacar del carrito")
    fireEvent.click(screen.getByText('Arroz Blanco 99%'));
    await waitFor(() => {
      expect(screen.getByText(/¿Sacar producto del carrito\?/i)).toBeDefined();
    });

    const btnConfirmar = screen.getByRole('button', { name: /Sí, sacar del carrito/i });
    fireEvent.click(btnConfirmar);

    // El modal se cierra y el producto vuelve a pendientes
    await waitFor(() => {
      expect(screen.queryByText(/¿Sacar producto del carrito\?/i)).toBeNull();
    });
  });

  it('5. [RF-5.2] Alternancia de Tema Claro / Oscuro (Dark / Light Mode)', async () => {
    render(<App />);

    // Buscar el botón de alternar tema en el Header
    const btnTheme = screen.getByRole('button', { name: /Alternar tema claro y oscuro/i });
    expect(btnTheme).toBeDefined();

    const initialThemeIsDark = document.documentElement.classList.contains('dark');

    // Hacer clic para alternar
    fireEvent.click(btnTheme);

    // Verificar que la clase en html cambió
    if (initialThemeIsDark) {
      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    } else {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.contains('light')).toBe(false);
    }
  });

  it('6. [RF-5.3 / RF-5.5] Centro de Auditoría: Explora Guardrails, Arnés y Guardrail de Acero (Git)', async () => {
    render(<App />);

    // Entrar al Paso 3 · Auditoría y Arneses
    const btnAuditoria = screen.getByRole('button', { name: /Auditar Sistema/i });
    fireEvent.click(btnAuditoria);

    // Verificar que despliega el Sidebar AdminLTE con las 3 opciones
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Auditar el Sistema/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /Ver Arnés Sensorial/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /Guardrail de Acero \(Git\)/i })).toBeDefined();
    });

    // Probar la Opción 2: Arnés Sensorial
    const btnHarness = screen.getByRole('button', { name: /Ver Arnés Sensorial/i });
    fireEvent.click(btnHarness);

    await waitFor(() => {
      expect(screen.getByText(/RNF-02/i)).toBeDefined();
      expect(screen.getByText(/Tolerancia a Fallos ante Corrupción de Datos/i)).toBeDefined();
    });

    // Probar la Opción 3: Guardrail de Acero (Git)
    const btnGit = screen.getByRole('button', { name: /Guardrail de Acero \(Git\)/i });
    fireEvent.click(btnGit);

    await waitFor(() => {
      expect(screen.getByText(/Guardrail de Acero Físico en Git/i)).toBeDefined();
      expect(screen.getByText(/core\.hooksPath = \.githooks/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /Simular Commit OK/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /Simular Rechazo/i })).toBeDefined();
    });

    // Probar la Opción 4: Arnés Sensorial E2E (Vitest)
    const btnE2E = screen.getByRole('button', { name: /Arnés E2E \(Vitest\)/i });
    fireEvent.click(btnE2E);

    await waitFor(() => {
      expect(screen.getByText(/Consola Sensorial Vitest/i)).toBeDefined();
      expect(screen.getByText(/Desglose de los 7 Flujos de Usuario Reales/i)).toBeDefined();
    });
  });

  it('7. [RF-5.8] Módulo de Inspección de Agentes y Subagentes Autónomos en Auditoría', async () => {
    render(<App />);

    // Entrar al Paso 3 · Auditoría y Arneses
    const btnAuditoria = screen.getByRole('button', { name: /Auditar Sistema/i });
    fireEvent.click(btnAuditoria);

    // Verificar que despliega el Sidebar con la 5ª opción de Agentes & Subagentes
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Agentes & Subagentes/i })).toBeDefined();
    });

    // Probar la Opción 5: Agentes & Subagentes
    const btnAgentes = screen.getByRole('button', { name: /Agentes & Subagentes/i });
    fireEvent.click(btnAgentes);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Arquitectura de Agentes/i })).toBeDefined();
      expect(screen.getByRole('heading', { name: /Centinela de Especificación/i })).toBeDefined();
      expect(screen.getByRole('heading', { name: /Analista de Memoria/i })).toBeDefined();
      expect(screen.getByRole('heading', { name: /Probador Sensorial E2E/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /Desplegar Enjambre de Subagentes/i })).toBeDefined();
      expect(screen.getAllByText(/Antigravity/i).length).toBeGreaterThan(0);
    });
  });
});
