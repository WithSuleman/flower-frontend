import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle,
  Truck,
  Heart,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { createOrder } from '../api/api.js';
import confetti from 'canvas-confetti';

export default function Checkout() {
  const { cartItems, subtotal, deliveryFee, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    giftNote: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty. Please add flowers before placing an order.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const orderPayload = {
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        giftNote: formData.giftNote,
        items: cartItems.map((item) => ({
          productId: item._id || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        totalAmount: totalAmount,
        status: 'Pending',
      };

      const result = await createOrder(orderPayload);
      setOrderSuccess(result);
      clearCart();

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fbcfe8', '#a855f7', '#fbbf24'],
      });
    } catch (err) {
      console.error('Error placing order:', err);
      setErrorMessage('Unable to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN
  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md"
        >
          <CheckCircle className="w-12 h-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-3"
        >
          <span className="text-3xl">🌸</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-floral text-stone-900">
            Your Flower Order Has Been Placed! 🌸
          </h1>
          <p className="text-stone-600 text-base max-w-md mx-auto">
            Thank you for shopping with Bloomora. Our florists are preparing your fresh bouquets with lots of love.
          </p>

          <div className="bg-white/80 p-5 rounded-2xl border border-rose-100 shadow-xs max-w-md mx-auto text-left space-y-2 mt-4">
            <div className="flex justify-between text-xs text-stone-500">
              <span>Order Reference:</span>
              <span className="font-mono font-bold text-stone-800">{orderSuccess._id || 'ORD-BLOOM'}</span>
            </div>
            <div className="flex justify-between text-xs text-stone-500">
              <span>Recipient:</span>
              <span className="font-semibold text-stone-800">{orderSuccess.customerName}</span>
            </div>
            <div className="flex justify-between text-xs text-stone-500">
              <span>Total Paid:</span>
              <span className="font-bold text-stone-900 text-sm">${orderSuccess.totalAmount?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-stone-500 pt-1 border-t border-rose-50">
              <span>Delivery Status:</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                {orderSuccess.status || 'Pending'}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/orders"
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-2xl text-sm shadow-md transition-all active:scale-95"
          >
            Track My Orders
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-white hover:bg-rose-50 text-stone-800 border border-rose-200 rounded-2xl text-sm font-semibold shadow-xs transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty and user visits /checkout
  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <span className="text-5xl">🛍️</span>
        <h2 className="text-2xl font-bold font-serif-floral text-stone-900">Your basket is empty</h2>
        <p className="text-stone-600 text-sm">Please pick your favorite flowers before heading to checkout.</p>
        <Link
          to="/flowers"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Flower Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-rose-600 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Cart
        </Link>
        <span className="text-xs uppercase font-bold tracking-widest text-rose-500 block">
          Final Step
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-floral text-stone-900 mt-1">
          Complete Your Flower Order
        </h1>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Delivery Details Form */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6">
          <div className="border-b border-rose-100 pb-3">
            <h2 className="text-lg font-bold font-serif-floral text-stone-900">
              1. Delivery Details
            </h2>
            <p className="text-xs text-stone-500">
              Where should we deliver this beautiful flower arrangement?
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="e.g. Eleanor Vance"
                className="w-full px-4 py-3 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="eleanor@example.com"
                  className="w-full px-4 py-3 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-4 py-3 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Blossom Lane, Apt 4B"
                className="w-full px-4 py-3 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="San Francisco"
                  className="w-full px-4 py-3 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  required
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="94107"
                  className="w-full px-4 py-3 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
                />
              </div>
            </div>

            {/* Custom Gift Note */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Complimentary Gift Card Message (Optional)
              </label>
              <textarea
                name="giftNote"
                rows="3"
                value={formData.giftNote}
                onChange={handleInputChange}
                placeholder="Write a sweet message to accompany your flowers..."
                className="w-full px-4 py-2.5 bg-rose-50/40 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary & Place Order */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold font-serif-floral text-stone-900 border-b border-rose-100 pb-3">
            2. Order Summary ({cartItems.length})
          </h2>

          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {cartItems.map((item) => (
              <div key={item._id || item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover border border-rose-100"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-800 truncate">{item.name}</h4>
                  <p className="text-[11px] text-stone-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-bold text-stone-900">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-3 border-t border-rose-100 text-xs sm:text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Bouquets Subtotal</span>
              <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee</span>
              <span className="font-semibold text-stone-900">
                {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="pt-2 border-t border-rose-100 flex justify-between items-baseline">
              <span className="text-sm font-bold text-stone-900">Total Due</span>
              <span className="text-2xl font-extrabold text-stone-900">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-md hover:shadow-lg hover:shadow-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 text-sm"
          >
            {loading ? (
              <span>Preparing Your Bouquet...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Place Flower Order • ${totalAmount.toFixed(2)}</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Pay on delivery or card • 100% Satisfaction Guarantee</span>
          </p>
        </div>
      </form>
    </div>
  );
}
