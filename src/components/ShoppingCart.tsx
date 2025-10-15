import { useState } from "react";
import { FaShoppingCart, FaPlus, FaTrash, FaShoppingBag, FaLeaf } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Manzana", price: 2 },
  { id: 2, name: "Banano", price: 3 },
  { id: 3, name: "Naranja", price: 4 },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index === -1) return prev;
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const getProductCount = (id: number) => {
    return cart.filter(item => item.id === id).length;
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-green-900 dark:to-emerald-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-4">
            <FaShoppingCart className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-emerald-600 dark:from-slate-100 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
            Carrito de Compras
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Agrega productos frescos a tu carrito y gestiona tu compra
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panel de productos */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FaLeaf className="text-emerald-500" />
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Productos Disponibles</h2>
                </div>

                <div className="space-y-3">
                  {PRODUCTS.map((product) => {
                    const count = getProductCount(product.id);
                    return (
                      <div 
                        key={product.id} 
                        className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg border border-slate-200/40 dark:border-slate-600/40 hover:border-emerald-300/50 dark:hover:border-emerald-400/30 transition-all duration-300"
                      >
                        <div className="flex-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{product.name}</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">- ${product.price}</span>
                          {count > 0 && (
                            <span className="ml-2 text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full">
                              {count} en carrito
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="group relative bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          <FaPlus className="text-sm" />
                          <div className="absolute inset-0 bg-white/20 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Panel del carrito */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <FaShoppingBag className="text-blue-500" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Tu Carrito</h3>
                  </div>
                  {cart.length > 0 && (
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm px-2 py-1 rounded-full">
                      {cart.length} items
                    </span>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div 
                    className="text-center py-8"
                    data-testid="empty"
                  >
                    <FaShoppingCart className="text-slate-300 dark:text-slate-600 text-4xl mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400 font-medium">El carrito está vacío</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Agrega algunos productos para comenzar</p>
                  </div>
                ) : (
                  <>
                    <ul 
                      data-testid="cart-list" 
                      className="space-y-2 max-h-80 overflow-y-auto mb-6"
                    >
                      {cart.map((item, index) => (
                        <li 
                          key={index} 
                          className="flex justify-between items-center p-3 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg border border-slate-200/40 dark:border-slate-600/40 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all duration-200"
                        >
                          <div>
                            <span className="font-medium text-slate-800 dark:text-slate-200">{item.name}</span>
                            <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">- ${item.price}</span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="group relative p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 transform hover:scale-110"
                            title="Eliminar del carrito"
                          >
                            <FaTrash className="text-sm" />
                            <div className="absolute inset-0 bg-red-500/10 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Total */}
                    <div className="border-t border-slate-200/50 dark:border-slate-600/50 pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">Total:</span>
                        <span 
                          data-testid="total"
                          className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                        >
                          ${total}
                        </span>
                      </div>
                      
                      <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Proceder al Pago
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Productos frescos entregados directamente a tu puerta
          </p>
        </div>
      </div>
    </div>
  );
}