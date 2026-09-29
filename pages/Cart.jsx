import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    totalAmount,
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner"
        >
          🌸
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-serif-floral text-stone-900">
            Your Cart is Empty
          </h1>
          <p className="text-stone-600 text-sm max-w-sm mx-auto">
            You haven’t added any flower bouquets yet. Discover our fresh seasonal blossoms and brighten someone's day!
          </p>
        </div>

        <Link
          to="/flowers"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-transform active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Explore Flowers</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-100 pb-5">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-rose-500">
            Review Your Basket
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-floral text-stone-900 mt-1">
            Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer"
        >
          Clear entire cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => {
              const id = item._id || item.id;
              const itemTotal = (Number(item.price) * item.quantity).toFixed(2);

              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-3xl border border-rose-100 shadow-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                >
                  {/* Product Image */}
                  <Link to={`/products/${id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-rose-100"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left space-y-1 w-full">
                    <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <Link to={`/products/${id}`} className="block">
                      <h3 className="font-bold text-stone-900 text-base hover:text-rose-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-stone-500 line-clamp-1">
                      {item.description}
                    </p>
                    <p className="text-sm font-semibold text-stone-800 pt-1">
                      ${Number(item.price).toFixed(2)} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-rose-50 border border-rose-200 rounded-xl p-1">
                      <button
                        onClick={() => decreaseQuantity(id)}
                        className="p-1.5 text-stone-600 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(id)}
                        className="p-1.5 text-stone-600 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[70px]">
                      <span className="text-xs text-stone-400 block font-normal sm:hidden">Item Total</span>
                      <span className="text-base font-extrabold text-stone-900">
                        ${itemTotal}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(id)}
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="pt-2">
            <Link
              to="/flowers"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-rose-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping Flowers</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-rose-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold font-serif-floral text-stone-900 border-b border-rose-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span className="flex items-center gap-1">
                <span>Standard Delivery</span>
              </span>
              <span className="font-semibold text-stone-900">
                {deliveryFee === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>

            {deliveryFee > 0 && (
              <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-xl">
                Add <strong>${(60 - subtotal).toFixed(2)}</strong> more for <strong>FREE Delivery</strong>!
              </p>
            )}

            <div className="pt-3 border-t border-rose-100 flex justify-between items-baseline">
              <span className="text-base font-bold text-stone-900">Total</span>
              <span className="text-2xl font-extrabold text-stone-900">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-md hover:shadow-lg hover:shadow-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 border-t border-rose-50 flex items-center justify-center gap-2 text-stone-500 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Guaranteed Fresh • Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
