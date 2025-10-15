import RandomNumber from "../components/RandomNumber";

export default function RandomNumberView() {
  return (
    <div className="space-y-8">
      <section className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold mb-4">Generador de Números</h1>
          <RandomNumber />
        </div>
      </section>
    </div>
  );
}