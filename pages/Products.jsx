import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Heart, RefreshCw, X } from 'lucide-react';
import FlowerCard from '../components/FlowerCard.jsx';
import { flowerCategories } from '../data/flowerData.js';
import { getProducts } from '../api/api.js';
import { useCart } from '../context/CartContext.jsx';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyFavorites, setOnlyFavorites] = useState(searchParams.get('filter') === 'favorites');
  const { favorites } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load flowers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Sync URL search params
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setActiveCategory(urlCategory);
    }
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
    if (searchParams.get('filter') === 'favorites') {
      setOnlyFavorites(true);
    }
  }, [searchParams]);

  // Filter and sort logic
  let filtered = products.filter((item) => {
    // Category match
    const categoryMatch =
      activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();

    // Search query match
    const searchMatch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Favorites match
    const favoriteMatch = !onlyFavorites || favorites.includes(item._id || item.id);

    return categoryMatch && searchMatch && favoriteMatch;
  });

  // Sort logic
  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    // featured
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const clearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setOnlyFavorites(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-rose-500">
          Our Fresh Floral Catalogue
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-floral text-stone-900">
          Fresh Hand-Tied Flowers
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Browse through our complete collection of seasonal flowers, bouquets, and romantic arrangements.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search flowers or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-rose-50/50 rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 text-stone-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right actions: Favorites toggle + Sort */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                onlyFavorites
                  ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                  : 'bg-white text-stone-700 border-rose-200 hover:bg-rose-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white' : 'text-rose-500'}`} />
              <span>Favorites ({favorites.length})</span>
            </button>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2.5 px-3 bg-white border border-rose-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-rose-400 cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-rose-50">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Category:
          </span>
          {flowerCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-rose-50 text-stone-700 hover:bg-rose-100/70'
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white/70 rounded-3xl p-4 space-y-4">
              <div className="aspect-4/3 bg-rose-100 rounded-2xl w-full" />
              <div className="h-4 bg-rose-100 rounded-md w-3/4" />
              <div className="h-3 bg-rose-100/60 rounded-md w-full" />
              <div className="h-6 bg-rose-100 rounded-md w-1/3" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white/80 rounded-3xl border border-rose-100 p-8 max-w-lg mx-auto space-y-4 shadow-sm">
          <span className="text-5xl">🥀</span>
          <h3 className="text-xl font-bold font-serif-floral text-stone-900">
            No flowers match your search
          </h3>
          <p className="text-stone-600 text-sm">
            We couldn't find any bouquets matching your current filters. Try resetting your search terms.
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filtered.map((flower) => (
              <FlowerCard key={flower._id || flower.id} flower={flower} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
