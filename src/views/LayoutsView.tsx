// src/views/LayoutsView.tsx
import { useState } from 'react';

export default function LayoutsView() {
  const [activeTab, setActiveTab] = useState('containers');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100 bg-clip-text text-transparent">
              Layout Patterns
            </h1>
            <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Diseños modernos y responsivos inspirados en las mejores prácticas de Vercel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'containers', label: 'Containers' },
              { id: 'grids', label: 'Grid Systems' },
              { id: 'text', label: 'Text Layouts' },
              { id: 'cards', label: 'Card Layouts' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* A) Container básico mejorado */}
          <section className="group relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="container mx-auto px-6 py-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    Container Centrado
                  </h2>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  Usa <code className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-md font-mono">container mx-auto px-4</code> para crear secciones centradas con padding lateral responsivo. Perfecto para contenido principal.
                </p>
                
                <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-600">
                  <div className="container mx-auto px-4 py-8 bg-white dark:bg-slate-800 rounded-lg shadow-inner">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold">C</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">Contenido centrado automáticamente</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* B) MaxWidth para textos mejorado */}
          <section className="group relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    Layout de Texto Optimizado
                  </h2>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Controla el ancho máximo del texto con <code className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-md font-mono">max-w-prose</code> para una lectura óptima. Ideal para artículos y contenido largo.
                  </p>
                  
                  <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-600">
                    <div className="max-w-prose mx-auto space-y-4">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">Ejemplo de texto largo</h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        Este es un ejemplo de texto que utiliza max-w-prose para limitar el ancho máximo y mejorar la legibilidad en pantallas grandes. La línea no será demasiado larga, lo que facilita la lectura.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* C) Grilla centrada mejorada */}
          <section className="group relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="container mx-auto px-6 py-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    Grid System Responsivo
                  </h2>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  Sistema de grilla responsivo que se adapta a diferentes tamaños de pantalla usando <code className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-md font-mono">grid-cols-1 sm:grid-cols-2 lg:grid-cols-3</code>
                </p>
                
                <div className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="group/card relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-medium transition-all duration-300 hover:scale-105"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-white font-bold text-lg">{i + 1}</span>
                          </div>
                          
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                            Card {i + 1}
                          </h4>
                          
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Contenido de ejemplo para la tarjeta {i + 1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* D) Nuevo: Layout con Sidebar */}
          <section className="group relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="container mx-auto px-6 py-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    Layout con Sidebar
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
                  {/* Sidebar */}
                  <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-700/30 rounded-lg p-6 border border-slate-200 dark:border-slate-600">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Navegación</h4>
                    <nav className="space-y-2">
                      {['Dashboard', 'Projects', 'Settings', 'Team', 'Analytics'].map((item) => (
                        <a key={item} href="#" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-600 rounded-md transition-colors">
                          {item}
                        </a>
                      ))}
                    </nav>
                  </div>
                  
                  {/* Main Content */}
                  <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-600">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Contenido Principal</h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Este layout utiliza una grilla responsiva que muestra la sidebar solo en pantallas grandes (lg:grid-cols-4).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}