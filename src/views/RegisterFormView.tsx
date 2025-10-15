import RegisterForm from "../components/RegisterForm";

export default function RegisterFormView() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Formulario de Registro</h1>
      <RegisterForm />
    </div>
  );
}