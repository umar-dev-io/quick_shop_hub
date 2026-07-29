import React from "react";
import { useNavigate } from "react-router";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const SelectedCartProduct = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  // Calculate Subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    const discountedPrice =
      item.price - (item.price * (item.discountPercentage || 0)) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-sky-blue" />
              <h2 className="text-lg font-bold text-slate-800">Your Cart</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="h-12 w-12 text-slate-300 mb-3" />
                <p className="text-base font-bold text-slate-700">
                  Your cart is empty
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Add items to view them here.
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = (
                  item.price -
                  (item.price * (item.discountPercentage || 0)) / 100
                ).toFixed(2);

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-3"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-16 w-16 rounded-xl bg-white object-contain p-1 border border-slate-100"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-900 mt-1">
                        ${itemPrice}{" "}
                        <span className="text-[10px] text-slate-400 font-normal">
                          / each
                        </span>
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-800 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all"
                      title="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Actions */}
          {cartItems.length > 0 && (
            <div className="border-t border-slate-100 p-6 bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="text-lg font-extrabold text-slate-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose(); // Closes the cart drawer modal
                    navigate("/proceed"); // Navigates to the checkout page
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-sky-blue py-3 text-xs font-bold text-white shadow-md shadow-sky-blue/20 hover:bg-sky-blue/90 active:scale-95 transition-all"
                >
                  <span>Proceed</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedCartProduct;
