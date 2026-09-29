import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle2, Truck, AlertCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { getOrders } from '../api/api.js';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const getStatusBadge = (status = 'Pending') => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Delivered
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <Truck className="w-3.5 h-3.5 text-blue-600" /> Out for Delivery
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Preparing Bouquet
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-rose-100 pb-5">
        <span className="text-xs uppercase font-bold tracking-widest text-rose-500">
          Delivery History & Tracking
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-floral text-stone-900 mt-1">
          Your Flower Orders
        </h1>
        <p className="text-stone-600 text-sm mt-1">
          Track the preparation and fresh door-to-door delivery of your Bloomora floral packages.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white/70 rounded-3xl p-6 h-36 space-y-3" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white/80 rounded-3xl border border-rose-100 p-8 space-y-4 shadow-sm">
          <span className="text-5xl">📦</span>
          <h2 className="text-2xl font-bold font-serif-floral text-stone-900">
            No Orders Placed Yet
          </h2>
          <p className="text-stone-600 text-sm max-w-sm mx-auto">
            You haven't ordered any fresh flowers yet. Treat yourself or surprise a loved one today!
          </p>
          <Link
            to="/flowers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-2xl text-xs shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" /> Start Shopping Flowers
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => {
            const formattedDate = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Recently placed';

            return (
              <motion.div
                key={order._id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-rose-100 shadow-xs hover:shadow-md transition-shadow space-y-4"
              >
                {/* Header row: ID, Date, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-rose-500" />
                      <span className="font-mono text-xs font-bold text-stone-800">
                        {order._id || `ORD-${idx + 101}`}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400">{formattedDate}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {getStatusBadge(order.status)}
                    <span className="text-base font-extrabold text-stone-900">
                      ${Number(order.totalAmount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {(order.items || []).map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-rose-50/40 border border-rose-100/60"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-xl shrink-0">
                          🌸
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-stone-800 truncate">{item.name}</p>
                        <p className="text-[11px] text-stone-500">
                          Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recipient & delivery info */}
                <div className="pt-2 text-xs text-stone-500 flex flex-wrap items-center justify-between gap-2 border-t border-rose-50">
                  <span>
                    Delivering to: <strong className="text-stone-700">{order.customerName}</strong> ({order.address}, {order.city})
                  </span>
                  {order.giftNote && (
                    <span className="italic text-stone-500 bg-rose-50 px-2 py-0.5 rounded-md">
                      Note: "{order.giftNote}"
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
