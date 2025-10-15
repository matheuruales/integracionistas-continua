import { useState } from "react";
import { FaUser, FaEnvelope, FaCheck, FaPaperPlane } from "react-icons/fa";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsSubmitting(true);
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSubmitted(true);
      setName("");
      setEmail("");
      setIsSubmitting(false);
    }
  };

  const isDisabled = !name || !email || isSubmitting;

  return (
    <div className="max-w-md mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        
        <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl mb-3">
              <FaUser className="text-white text-lg" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-emerald-600 dark:from-slate-100 dark:to-emerald-400 bg-clip-text text-transparent">
              Registro
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Completa tus datos para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Nombre */}
            <div className="relative group">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Nombre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-slate-400 text-sm" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/50 dark:bg-slate-700/30 border border-slate-200/60 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:ring-emerald-400/50 dark:focus:border-emerald-400 outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder="Tu nombre completo"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Campo Email */}
            <div className="relative group">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-slate-400 text-sm" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/50 dark:bg-slate-700/30 border border-slate-200/60 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:ring-emerald-400/50 dark:focus:border-emerald-400 outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder="tu@email.com"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isDisabled}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
                  {isSubmitting ? "Enviando..." : submitted ? "¡Registrado!" : "Registrar"}
                </span>
              </div>
              
              {/* Efecto de onda al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </form>

          {/* Mensaje de confirmación */}
          {submitted && (
            <div 
              className="mt-4 p-3 bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-800/50 rounded-xl animate-fade-in"
              data-testid="confirmation"
            >
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <FaCheck className="text-sm flex-shrink-0" />
                <span className="text-sm font-medium">¡Registro exitoso! Te contactaremos pronto.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tus datos están protegidos y no serán compartidos
        </p>
      </div>
    </div>
  );
}