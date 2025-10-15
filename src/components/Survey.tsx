import { useState } from "react";
import { FaStar, FaPaperPlane, FaCheck, FaSmile } from "react-icons/fa";

export default function Survey() {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating !== null) {
      setIsSubmitting(true);
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setSubmitted(true);
      setIsSubmitting(false);
    }
  };

  const isDisabled = rating === null || isSubmitting;

  return (
    <div className="max-w-md mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        
        <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl mb-3">
              <FaSmile className="text-white text-lg" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-amber-600 dark:from-slate-100 dark:to-amber-400 bg-clip-text text-transparent">
              Encuesta de Satisfacción
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Tu opinión nos ayuda a mejorar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de calificación */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-semibold text-slate-800 dark:text-slate-200 text-center w-full pb-2">
                ¿Qué tan satisfecho estás con nuestro servicio?
              </legend>
              
              <div className="flex justify-center gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((val) => (
                  <label key={val} className="relative cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      value={val}
                      checked={rating === val}
                      onChange={() => setRating(val)}
                      className="absolute opacity-0 w-0 h-0"
                      disabled={isSubmitting}
                    />
                    <div className={`
                      relative p-3 rounded-xl transition-all duration-300 transform
                      ${rating === val 
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500 scale-110 shadow-lg' 
                        : 'bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                      }
                      ${rating !== null && rating >= val 
                        ? 'text-amber-500' 
                        : 'text-slate-300 dark:text-slate-600'
                      }
                      group-hover:scale-105 group-hover:shadow-md
                    `}>
                      <FaStar className="text-2xl" />
                      
                      {/* Efecto de pulso cuando está seleccionado */}
                      {rating === val && (
                        <div className="absolute inset-0 rounded-xl bg-amber-400/20 animate-ping opacity-60"></div>
                      )}
                    </div>
                    
                    {/* Tooltip con número */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {val} {val === 1 ? 'estrella' : 'estrellas'}
                    </div>
                  </label>
                ))}
              </div>

              {/* Labels descriptivos */}
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
                <span>Muy insatisfecho</span>
                <span>Neutral</span>
                <span>Muy satisfecho</span>
              </div>
            </fieldset>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isDisabled}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                ) : submitted ? (
                  <FaCheck className="text-sm" />
                ) : (
                  <FaPaperPlane className="text-sm" />
                )}
                <span className="text-base">
                  {isSubmitting ? "Enviando..." : submitted ? "¡Gracias!" : "Enviar Calificación"}
                </span>
              </div>
              
              {/* Efecto de onda al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </form>

          {/* Mensaje de confirmación */}
          {submitted && rating !== null && (
            <div 
              className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/60 dark:border-amber-800/50 rounded-xl animate-fade-in"
              data-testid="confirmation"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <FaCheck className="text-white text-sm" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-amber-800 dark:text-amber-200">
                    ¡Gracias por tu feedback!
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Tu puntuación fue: <span className="font-bold">{rating} {rating === 1 ? 'estrella' : 'estrellas'}</span>
                  </p>
                </div>
              </div>
              
              {/* Estrellas de confirmación */}
              <div className="flex justify-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((val) => (
                  <FaStar 
                    key={val}
                    className={`
                      text-lg transition-all duration-300
                      ${val <= rating 
                        ? 'text-amber-500 scale-110' 
                        : 'text-slate-300 dark:text-slate-600 scale-90'
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tu respuesta es anónima y nos ayuda a mejorar continuamente
        </p>
      </div>
    </div>
  );
}