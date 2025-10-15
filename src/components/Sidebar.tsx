import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaHome, FaCube, FaColumns, FaMicrophone, FaShapes, 
  FaCalculator, FaRuler, FaKey, FaMouse, FaList, 
  FaDice, FaStar, FaShoppingCart, FaChevronDown,
  FaCode, FaTasks 
} from "react-icons/fa";

interface SidebarItem {
  label: string;
  route: string;
  icon?: React.ReactNode;
  badge?: string;
}

const mainItems: SidebarItem[] = [
  { label: "Inicio", route: "/", icon: <FaHome /> },
  { label: "Three.js Demo", route: "/three", icon: <FaCube />, badge: "3D" },
  { label: "Responsive Layouts", route: "/layouts", icon: <FaColumns />, badge: "New" },
  { label: "Text-to-Speech", route: "/tts", icon: <FaMicrophone /> },
  { label: "Figuras Geometricas", route: "/three_2", icon: <FaShapes />, badge: "3D" },
];

const exerciseItems: SidebarItem[] = [
  { label: "Generador Aleatorio", route: "/random", icon: <FaDice /> },
  { label: "Carrito de Compras", route: "/cart", icon: <FaShoppingCart />, badge: "Cart" },
  { label: "Encuesta de Satisfacción", route: "/survey", icon: <FaStar /> },
  { label: "Tablas de Multiplicar", route: "/tablasmul", icon: <FaCalculator /> },
  { label: "Conversor de Unidades", route: "/conversorunid", icon: <FaRuler /> },
  { label: "Validadador de Contraseñas", route: "/validcontrasena", icon: <FaKey /> },
  { label: "Contador de Clics", route: "/contadorclics", icon: <FaMouse />, badge: "Storage" },
  { label: "Lista de Tareas", route: "/listareas", icon: <FaList /> },


];

export default function Sidebar() {
  const [openMain, setOpenMain] = useState(true);
  const [openExercises, setOpenExercises] = useState(true);

  const renderNavItem = ({ label, route, icon, badge }: SidebarItem) => (
    <NavLink
      key={route}
      to={route}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ease-out
         ${isActive 
           ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500 shadow-sm" 
           : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
         }`
      }
    >
      {/* Icono con efecto de gradiente */}
      <div className={`
        flex items-center justify-center w-6 h-6 transition-transform duration-200 group-hover:scale-110
        ${useLocation().pathname === route 
          ? "text-blue-600 dark:text-blue-400" 
          : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
        }
      `}>
        {icon}
      </div>
      
      {/* Texto del enlace */}
      <span className="flex-1 font-medium text-sm transition-all duration-200">
        {label}
      </span>
      
      {/* Badge opcional */}
      {badge && (
        <span className={`
          px-2 py-1 text-xs font-medium rounded-full transition-all duration-200
          ${useLocation().pathname === route
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
          }
        `}>
          {badge}
        </span>
      )}
      
      {/* Efecto de hover sutil */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
    </NavLink>
  );

  const AccordionHeader = ({ 
    title, 
    isOpen, 
    onClick, 
    icon,
    count 
  }: {
    title: string;
    isOpen: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
    count?: number;
  }) => (
    <button
      onClick={onClick}
      className="group w-full flex items-center justify-between rounded-lg px-3 py-3 
                 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 
                 transition-all duration-200 font-semibold text-sm uppercase tracking-wide"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
      
      <div className="flex items-center gap-2">
        {count !== undefined && (
          <span className="px-1.5 py-0.5 text-xs bg-slate-200 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-400">
            {count}
          </span>
        )}
        <div className={`
          transform transition-transform duration-200 text-slate-400
          ${isOpen ? "rotate-0" : "-rotate-90"}
        `}>
          <FaChevronDown size={12} />
        </div>
      </div>
    </button>
  );

  return (
    <aside className="hidden md:flex flex-col w-full md:w-64 border-r border-slate-200/60 dark:border-slate-800/60 
                     bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
      
      {/* Header del Sidebar */}
      <div className="p-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FaCode className="text-white text-sm" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-slate-100">Dev Playground</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Sección Principal */}
          <div className="space-y-2">
            <AccordionHeader
              title="Navegación Principal"
              isOpen={openMain}
              onClick={() => setOpenMain(!openMain)}
              icon={<FaHome className="text-blue-500" size={14} />}
              count={mainItems.length}
            />
            
            {openMain && (
              <div className="space-y-1 pl-2">
                {mainItems.map(renderNavItem)}
              </div>
            )}
          </div>

          {/* Sección de Ejercicios */}
          <div className="space-y-2">
            <AccordionHeader
              title="Ejercicios Jest"
              isOpen={openExercises}
              onClick={() => setOpenExercises(!openExercises)}
              icon={<FaTasks className="text-green-500" size={14} />}
              count={exerciseItems.length}
            />
            
            {openExercises && (
              <div className="space-y-1 pl-2">
                {exerciseItems.map(renderNavItem)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer del Sidebar */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-white text-xs font-bold">JP</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Johnatan's Portfolio
          </p>
        </div>
      </div>
    </aside>
  );
}


function useLocation() {

  return { pathname: window.location.pathname };
}