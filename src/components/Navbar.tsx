// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSun, FaMoon, FaGithub, FaCode, FaRegUser } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const location = useLocation();

  // Inicializa el tema y escucha cambios de scroll
  useEffect(() => {
    const initializeTheme = () => {
      const root = document.documentElement;
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      const theme = saved === "dark" || (!saved && prefersDark) ? "dark" : "light";
      root.classList.toggle("dark", theme === "dark");
      setCurrentTheme(theme);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    initializeTheme();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    const nextTheme = isDark ? "dark" : "light";
    
    setCurrentTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    // Notifica a la app para que vistas activas reaccionen en vivo
    document.dispatchEvent(new CustomEvent("theme:changed", { 
      detail: { theme: nextTheme } 
    }));
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out
      ${isScrolled 
        ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-700/50" 
        : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/30 dark:border-slate-700/30"
      }
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y marca */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-blue-600 
                            flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <FaCode className="text-white text-sm" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-tight">
                UCC DevLab
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Prácticas de Desarrollo
              </span>
            </div>
          </Link>

          {/* Navegación central (opcional para rutas principales) */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { path: "/random", label: "Generador Aleatorio" },
              { path: "/cart", label: "Carrito" },
              { path: "/survey", label: "Encuesta" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                  ${isActiveRoute(item.path)
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }
                `}
              >
                {item.label}
                {isActiveRoute(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Lado derecho: acciones */}
          <div className="flex items-center gap-2">
            {/* Enlace a GitHub (opcional) */}
            <a
              href="https://github.com/matheuruales"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 
                       hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
              title="Ver código en GitHub"
            >
              <FaGithub className="text-lg" />
            </a>

            {/* Botón de registro */}
            <Link
              to="/register"
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200
                ${isActiveRoute("/register")
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 hover:shadow-md border border-slate-200 dark:border-slate-600"
                }
              `}
            >
              <FaRegUser className="text-sm" />
              <span>Registro</span>
            </Link>

            {/* Botón de tema mejorado */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`
                relative p-2.5 rounded-lg transition-all duration-300 ease-out
                bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700
                border border-slate-200 dark:border-slate-600
                hover:shadow-md hover:scale-105 active:scale-95
                group
              `}
              aria-label={`Cambiar a modo ${currentTheme === 'light' ? 'oscuro' : 'claro'}`}
            >
              <div className="relative w-5 h-5">
                <FaSun className={`
                  absolute inset-0 transition-all duration-300 ease-out
                  ${currentTheme === 'light' 
                    ? 'opacity-100 rotate-0 text-amber-500' 
                    : 'opacity-0 -rotate-90'
                  }
                `} />
                <FaMoon className={`
                  absolute inset-0 transition-all duration-300 ease-out
                  ${currentTheme === 'dark' 
                    ? 'opacity-100 rotate-0 text-blue-400' 
                    : 'opacity-0 rotate-90'
                  }
                `} />
              </div>
              
              {/* Efecto de glow sutil */}
              <div className={`
                absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/10 to-blue-400/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
              `}></div>
            </button>

            {/* Indicador de tema actual (solo en debug) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                <div className={`w-2 h-2 rounded-full ${currentTheme === 'dark' ? 'bg-blue-400' : 'bg-amber-400'}`}></div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {currentTheme === 'dark' ? 'Oscuro' : 'Claro'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;