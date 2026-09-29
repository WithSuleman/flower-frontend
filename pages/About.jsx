import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Truck, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import FloatingFlowers from '../components/FloatingFlowers.jsx';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4">
        <FloatingFlowers count={5} />
        <span className="text-xs uppercase font-bold tracking-widest text-rose-500">
          Our Heritage & Passion
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold font-serif-floral text-stone-900 leading-tight">
          Flowers Made for <br />
          <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent italic">
            Beautiful Moments
          </span>
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Bloomora was founded on a simple truth: nature's flowers have an unparalleled ability to uplift spirits, celebrate love, and bridge distances between hearts.
        </p>
      </div>

      {/* Main Story & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-rose-100 shadow-xs">
        <div className="space-y-5">
          <span className="text-xs uppercase font-bold tracking-wider text-rose-500">Farm to Vase</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-floral text-stone-900">
            Handcrafted with Care & Sustainable Blooms
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every petal in our collection is sourced directly from sustainable floral farms that emphasize ethical agriculture, water conservation, and soil vitality.
          </p>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Unlike mass-market supermarket flowers that sit in shipping warehouses for weeks, our blooms are picked within 24 hours of cutting, conditioned in nutrient water baths, and artfully assembled by our floral designers.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
              <span className="text-2xl font-bold text-rose-600 font-serif-floral">100%</span>
              <p className="text-xs text-stone-600 font-semibold mt-0.5">Eco-Friendly Packaging</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
              <span className="text-2xl font-bold text-rose-600 font-serif-floral">7 Days</span>
              <p className="text-xs text-stone-600 font-semibold mt-0.5">Vase Life Guarantee</p>
            </div>
          </div>
        </div>

        <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
          <img
            src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80"
            alt="Artisanal flower arrangement"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 p-6 rounded-3xl border border-rose-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl">
            🌸
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-serif-floral">Artisan Floristry</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            No cookie-cutter arrangements. Every single bouquet is sculpted with bespoke floral design aesthetics.
          </p>
        </div>

        <div className="bg-white/80 p-6 rounded-3xl border border-rose-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl">
            🌱
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-serif-floral">Eco Conscious</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            We use biodegradable wraps, recyclable flower food packets, and minimal plastic.
          </p>
        </div>

        <div className="bg-white/80 p-6 rounded-3xl border border-rose-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl">
            ✨
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-serif-floral">Unconditional Joy</h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            If your flowers don't arrive fresh or last at least 7 days, we replace them immediately with no hassle.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-3xl p-8 sm:p-12 shadow-lg space-y-4">
        <h2 className="text-2xl sm:text-4xl font-bold font-serif-floral">
          Ready to Send Something Beautiful?
        </h2>
        <p className="text-rose-100 text-sm sm:text-base max-w-lg mx-auto">
          Choose from over 16 fresh arrangements and make today memorable.
        </p>
        <Link
          to="/flowers"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rose-600 hover:bg-rose-50 font-bold rounded-2xl text-sm shadow-md transition-all active:scale-95"
        >
          <span>Explore Flowers</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
