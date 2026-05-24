"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Cookie, Instagram } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytical: boolean;
}

type ModalView = "none" | "banner" | "preferences";

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus:outline-none ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } border ${checked ? "bg-white border-white" : "bg-white/5 border-white/10"}`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full transition-all duration-300 mt-[2px] ${
          checked ? "translate-x-[24px] bg-black" : "translate-x-[2px] bg-zinc-400"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [view, setView] = useState<ModalView>("none");
  const [showAbout, setShowAbout] = useState(false);
  const [analyticalOpen, setAnalyticalOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytical: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("cookie_preferences");
    if (!stored) {
      setView("banner");
    } else {
      try {
        setPrefs(JSON.parse(stored));
      } catch {
        setView("banner");
      }
    }
  }, []);

  useEffect(() => {
    if (view !== "none" || showAbout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [view, showAbout]);

  const savePreferences = (preferences: CookiePreferences) => {
    localStorage.setItem("cookie_preferences", JSON.stringify(preferences));
    setPrefs(preferences);
    setView("none");
  };

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, functional: true, analytical: true });
  };

  const handleRejectAll = () => {
    savePreferences({ necessary: true, functional: false, analytical: false });
  };

  const handleConfirm = () => {
    savePreferences(prefs);
  };

  const isOpen = view !== "none" || showAbout;

  return (
    <>
      {/* Botones flotantes – visibles cuando no hay modales abiertos */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3">
          {/* Botón de Información (!) */}
          <button
            onClick={() => setShowAbout(true)}
            className="flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Acerca de Inventra"
          >
            <div className="w-8 h-8 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors">
              <span className="text-white font-bold text-xs">!</span>
            </div>
          </button>

          {/* Botón de Ajustes de Cookies (Cookie) */}
          <button
            onClick={() => setView("preferences")}
            className="flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Configuración de cookies"
          >
            <div className="w-8 h-8 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors">
              <Cookie className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
          </button>
        </div>
      )}

      {/* Fondo desenfocado (Backdrop) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md"
          onClick={() => {
            setView("none");
            setShowAbout(false);
          }}
        />
      )}

      {/* ── Modal de Información ── */}
      {showAbout && (
        <div className="fixed bottom-6 right-6 z-[10000] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-sm shadow-2xl">
          <button
            onClick={() => setShowAbout(false)}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold text-xl tracking-tight">
              ¿Qué es Inventra?
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Inventra es la forma más rápida y sencilla de gestionar tus publicaciones y optimizar tu e-commerce utilizando inteligencia artificial.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Diseñado para el comercio moderno: con plantillas profesionales, automatización de procesos y métricas avanzadas que te ayudan a hacer crecer tu negocio.
            </p>
            <button
              onClick={() => setShowAbout(false)}
              className="mt-2 w-full bg-white/5 border border-white/10 text-white font-semibold py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm cursor-pointer"
            >
              ¡Entendido!
            </button>
           
          </div>
        </div>
      )}

      {/* ── Banner de Cookies Inicial ── */}
      {view === "banner" && (
        <div className="fixed bottom-6 right-6 z-[10000] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5 max-w-sm">
          <button
            onClick={() => setView("none")}
            className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold text-lg">Usamos cookies</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Utilizamos cookies para mejorar tu experiencia de usuario, optimizar la navegación y analizar el tráfico de nuestro sitio web. Al hacer clic en "Aceptar", consientes nuestro uso de cookies.
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-white text-black font-semibold py-2.5 rounded-xl hover:bg-zinc-200 transition-colors text-sm cursor-pointer"
              >
                Aceptar
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 bg-white/5 border border-white/10 text-white font-semibold py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm cursor-pointer"
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Administrador de Preferencias de Cookies ── */}
      {view === "preferences" && (
        <div className="fixed bottom-6 right-6 z-[10000] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-[420px] max-w-[calc(100vw-2rem)] shadow-2xl">
          <button
            onClick={() => setView("none")}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <h3 className="text-white font-bold text-lg mb-5">
            Gestionar preferencias de cookies
          </h3>

          {/* Estrictamente Necesarias */}
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <p className="text-white font-medium text-sm">
              Cookies estrictamente necesarias
            </p>
            <Toggle checked={true} onChange={() => {}} disabled />
          </div>

          {/* Funcionales */}
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <p className="text-white font-medium text-sm">
              Cookies funcionales
            </p>
            <Toggle
              checked={prefs.functional}
              onChange={(v) => setPrefs({ ...prefs, functional: v })}
            />
          </div>

          {/* Analíticas */}
          <div className="py-4 border-b border-white/5">
            <div className="flex items-center justify-between">
              <p className="text-white font-medium text-sm">
                Cookies analíticas
              </p>
              <Toggle
                checked={prefs.analytical}
                onChange={(v) => setPrefs({ ...prefs, analytical: v })}
              />
            </div>

            <button
              onClick={() => setAnalyticalOpen(!analyticalOpen)}
              className="flex items-center gap-1 mt-3 text-zinc-400 text-xs hover:text-zinc-200 transition-colors cursor-pointer"
            >
              {analyticalOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
              Cookies (2)
            </button>

            {analyticalOpen && (
              <div className="mt-2 ml-5 flex flex-col gap-2">
                <label className="flex items-center gap-2.5 text-zinc-300 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.analytical}
                    onChange={(e) =>
                      setPrefs({ ...prefs, analytical: e.target.checked })
                    }
                    className="w-4 h-4 rounded bg-white/5 border border-white/10 accent-white cursor-pointer"
                  />
                  Google Analytics
                </label>
                <label className="flex items-center gap-2.5 text-zinc-300 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.analytical}
                    onChange={(e) =>
                      setPrefs({ ...prefs, analytical: e.target.checked })
                    }
                    className="w-4 h-4 rounded bg-white/5 border border-white/10 accent-white cursor-pointer"
                  />
                  HotJar
                </label>
              </div>
            )}
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={handleConfirm}
              className="px-5 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors text-sm cursor-pointer"
            >
              Confirmar
            </button>
            <button
              onClick={handleRejectAll}
              className="px-5 py-2.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm cursor-pointer"
            >
              Rechazar no esenciales
            </button>
          </div>
        </div>
      )}
    </>
  );
}
