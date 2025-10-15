import ShoppingCart from "../components/ShoppingCart";

export default function ShoppingCartView() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Carrito de Compras</h1>
      <ShoppingCart />
    </div>
  );
}