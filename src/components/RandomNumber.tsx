import { useState, useEffect } from "react";
import { FaDice, FaSync, FaHistory, FaChartBar } from "react-icons/fa";

interface NumberHistory {
  value: number;
  timestamp: Date;
}

export default function RandomNumber() {
  const [value, setValue] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<NumberHistory[]>([]);
  const [animationKey, setAnimationKey] = useState(0);

  // Estadísticas básicas
  const stats = {
    totalGenerations: history.length,
    average: history.length > 0 
      ? Math.round(history.reduce((sum, item) => sum + item.value, 0) / history.length)
      : 0,
    min: history.length > 0 ? Math.min(...history.map(item => item.value)) : 0,
    max: history.length > 0 ? Math.max(...history.map(item => item.value)) : 0,
  };

  const generateNumber = () => {
    const toNumber = (r: number) => Math.floor(r * 100) + 1;

    let next = toNumber(Math.random());

    if (value !== null) {
      let attempts = 0;
      while (next === value && attempts < 10) {
        next = toNumber(Math.random());
        attempts++;
      }
      if (next === value) {
        next = value === 100 ? 1 : value + 1;
      }
    }
    
    return next;
  };

  const generate = () => {
    setIsGenerating(true);
    setAnimationKey(prev => prev + 1);
    
    // Simular un pequeño delay para la animación
    setTimeout(() => {
      const nextValue = generateNumber();
      setValue(nextValue);
      setHistory(prev => [...prev.slice(-9), { value: nextValue, timestamp: new Date() }]);
      setIsGenerating(false);
    }, 300);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // Efecto para generar un número inicial al montar el componente
  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <FaDice className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-100 dark:to-blue-400 bg-clip-text text-transparent mb-2">
            Generador Aleatorio
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Genera números aleatorios entre 1 y 100 con estadísticas en tiempo real
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Panel principal */}
          <div className="space-y-6">
            {/* Tarjeta del número generado */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-8 text-center">
                <div className="mb-6">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Número Actual
                  </span>
                </div>
                
                <div 
                  key={animationKey}
                  className={`text-8xl md:text-9xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent transition-all duration-300 ${
                    isGenerating ? 'scale-110 opacity-60' : 'scale-100 opacity-100'
                  }`}
                >
                  {value !== null ? value : "—"}
                </div>
                
                <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Rango: 1 - 100
                </div>
              </div>
            </div>

            {/* Botón de generación */}
            <button
              onClick={generate}
              disabled={isGenerating}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {isGenerating ? (
                  <FaSync className="animate-spin" />
                ) : (
                  <FaDice />
                )}
                <span className="text-lg">
                  {isGenerating ? "Generando..." : "Generar Nuevo Número"}
                </span>
              </div>
              
              {/* Efecto de onda al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* Panel de estadísticas e historial */}
          <div className="space-y-6">
            {/* Estadísticas */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaChartBar className="text-blue-500" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Estadísticas</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalGenerations}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Total</div>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.average}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Promedio</div>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.min}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Mínimo</div>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.max}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Máximo</div>
                </div>
              </div>
            </div>

            {/* Historial */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaHistory className="text-purple-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Historial</h3>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-xs text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
                  >
                    Limpiar
                  </button>
                )}
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                    No hay historial aún
                  </p>
                ) : (
                  history.slice().reverse().map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg"
                    >
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                        {item.value}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            El algoritmo evita números repetidos consecutivos para mayor variedad
          </p>
        </div>
      </div>
    </div>
  );
}