import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Heart, Flower2, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-white/80 border-t border-rose-100/80 pt-16 pb-8 overflow-hidden">
      {/* Decorative floral background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-0 left-10 w-72 h-72 bg-pink-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-rose-100">
          {/* Brand info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-serif-floral text-rose-600">
              <span className="text-3xl">🌸</span>
              <span>Bloomora</span>
            </Link>
            <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
              Fresh flowers carefully handpicked and arranged by master florists to make every celebration, anniversary, and ordinary day unforgettable.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors"
              >
                <Flower2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4 font-serif-floral">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-stone-600 hover:text-rose-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/flowers" className="text-stone-600 hover:text-rose-600 transition-colors">
                  Explore Flowers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-600 hover:text-rose-600 transition-colors">
                  Our Story & About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-600 hover:text-rose-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4 font-serif-floral">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/cart" className="text-stone-600 hover:text-rose-600 transition-colors">
                  My Shopping Basket
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-stone-600 hover:text-rose-600 transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link to="/flowers?category=Roses" className="text-stone-600 hover:text-rose-600 transition-colors">
                  Fresh Rose Collections
                </Link>
              </li>
              <li>
                <span className="text-stone-500 cursor-pointer hover:text-rose-600 transition-colors">
                  Same-Day Flower Delivery
                </span>
              </li>
            </ul>
          </div>

          {/* Floral Studio Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4 font-serif-floral">
              Floral Studio
            </h4>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>42 Blossom Way, Floral District, CA 94107</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <span>+1 (800) 555-BLOOM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <span>hello@bloomora-flowers.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Bloomora. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for flower lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
