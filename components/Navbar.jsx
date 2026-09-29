import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, favorites, toastMessage } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/flowers?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Flowers', path: '/flowers' },
    { name: 'Orders', path: '/orders' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md shadow-xs border-b border-rose-100/60 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group text-stone-900 font-bold tracking-tight text-xl sm:text-2xl"
            >
              <motion.span
                whileHover={{ rotate: 20, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-2xl sm:text-3xl filter drop-shadow-xs"
              >
                🌸
              </motion.span>
              <span className="font-serif-floral tracking-tight bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent">
                Bloomora
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative py-1 transition-colors ${
                      isActive
                        ? 'text-rose-600 font-semibold'
                        : 'text-stone-600 hover:text-rose-600'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search flowers"
                className="p-2 sm:p-2.5 rounded-full text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Indicator */}
              {favorites.length > 0 && (
                <Link
                  to="/flowers?filter=favorites"
                  aria-label="Favorites"
                  className="hidden sm:flex relative p-2.5 rounded-full text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Your Favorites"
                >
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                </Link>
              )}

              {/* Cart Button with Count Badge */}
              <Link
                to="/cart"
                aria-label="Shopping Cart"
                className="relative flex items-center gap-2 px-3 sm:px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-sm hover:shadow-md hover:shadow-rose-200 transition-all font-medium text-sm"
              >
                <motion.div
                  key={totalItems}
                  animate={totalItems > 0 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingBag className="w-4 h-4" />
                </motion.div>
                <span className="hidden sm:inline">Cart</span>
                <span className="px-1.5 py-0.5 text-xs font-bold bg-white text-rose-600 rounded-full min-w-5 text-center">
                  {totalItems}
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-rose-100/80 bg-white/95 backdrop-blur-md"
            >
              <div className="max-w-3xl mx-auto px-4 py-3">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search className="absolute left-3.5 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search fresh roses, tulips, sunflowers, bouquets..."
                    className="w-full pl-10 pr-24 py-2.5 bg-rose-50/50 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white text-stone-800"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-b border-rose-100 px-6 py-5 shadow-lg"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-base font-medium py-1.5 transition-colors ${
                      location.pathname === link.path
                        ? 'text-rose-600 font-semibold pl-2 border-l-2 border-rose-500'
                        : 'text-stone-700 hover:text-rose-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/cart"
                  className="flex items-center justify-between text-base font-medium py-1.5 text-stone-700 hover:text-rose-600"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-rose-500" /> Cart
                  </span>
                  <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                    {totalItems} items
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Add to Cart Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900/90 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-xl border border-stone-800"
          >
            <Sparkles className="w-5 h-5 text-pink-400 shrink-0" />
            <p className="text-sm font-medium pr-1">{toastMessage}</p>
            <Link
              to="/cart"
              className="ml-2 text-xs font-bold text-pink-300 hover:text-white underline underline-offset-2"
            >
              View Cart
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
