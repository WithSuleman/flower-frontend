import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  Sparkles,
  Droplets,
  Sun
} from 'lucide-react';
import { getProductById, getProducts } from '../api/api.js';
import { useCart } from '../context/CartContext.jsx';
import FlowerCard from '../components/FlowerCard.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isFavorite, toggleFavorite } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const data = await getProductById(id);
        setProduct(data);

        // Fetch related products in the same category
        const all = await getProducts();
        const related = all
          .filter((p) => (p._id !== id && p.id !== id) && (p.category === data.category || p.isFeatured))
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Unable to load flower details. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-rose-100/60 rounded-3xl" />
          <div className="space-y-6">
            <div className="h-6 bg-rose-100/70 rounded-md w-1/4" />
            <div className="h-10 bg-rose-100/80 rounded-md w-3/4" />
            <div className="h-5 bg-rose-100/50 rounded-md w-1/3" />
            <div className="h-24 bg-rose-100/40 rounded-xl w-full" />
            <div className="h-12 bg-rose-100/80 rounded-xl w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white/90 rounded-3xl text-center border border-rose-100 shadow-md space-y-4">
        <span className="text-4xl">🥀</span>
        <h2 className="text-xl font-bold font-serif-floral text-stone-900">Flower Not Found</h2>
        <p className="text-sm text-stone-600">{error || 'This flower arrangement might have sold out.'}</p>
        <Link
          to="/flowers"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Flowers
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(product._id || product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Back Button */}
      <div>
        <Link
          to="/flowers"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-rose-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Flowers</span>
        </Link>
      </div>

      {/* Main Product Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
      >
        {/* Left: Product Image */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square w-full rounded-3xl overflow-hidden shadow-xl shadow-rose-100/60 border-4 border-white bg-rose-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Category tag */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-700 shadow-xs">
              {product.category}
            </div>

            {/* Favorite toggle */}
            <button
              onClick={() => toggleFavorite(product._id || product.id)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-white text-stone-700 hover:text-rose-500 transition-colors cursor-pointer"
              aria-label="Toggle Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  favorite ? 'fill-rose-500 text-rose-500' : 'text-stone-500'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            {/* Rating & Stock */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="font-bold text-stone-900 text-sm">{product.rating?.toFixed(1) || '4.9'}</span>
                <span>({product.reviewsCount || 86} certified reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock ({product.stock || 20} available)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl font-bold font-serif-floral text-stone-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="pt-1 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-sm text-stone-400">Taxes included</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Quantity
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-rose-200 bg-white rounded-xl shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-stone-600 hover:text-rose-600 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-stone-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 50, q + 1))}
                  className="p-2.5 text-stone-600 hover:text-rose-600 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-stone-500">
                Subtotal: <strong className="text-stone-900">${(Number(product.price) * quantity).toFixed(2)}</strong>
              </span>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-white border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Basket</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:shadow-rose-200 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Guarantees Box */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Fresh morning delivery in water vial</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
              <span>7-Day freshness guarantee</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Droplets className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Includes flower food packet</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Care card with florist instructions</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs / Flower Care & Guarantee */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xs space-y-4">
        <div className="flex border-b border-rose-100 gap-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-sm font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'description'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Bouquet Arrangement Details
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 text-sm font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'care'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Florist Care Guide
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className="text-sm text-stone-600 space-y-2 leading-relaxed">
            <p>
              Each {product.name} is assembled with freshly harvested blooms sourced from eco-certified family growers.
              Stems are carefully cut at a 45-degree angle and wrapped in recyclable moisture-retaining botanical wrap.
            </p>
            <p>
              Includes our signature Bloomora greeting card with your custom personalized gift note and a sachet of premium floral nutrients.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
            <div className="p-3 bg-rose-50/50 rounded-xl">
              <h4 className="font-bold text-stone-800 mb-1">1. Trim Stems</h4>
              <p>Trim 1-2 cm off stems at an angle under cool running water before placing in vase.</p>
            </div>
            <div className="p-3 bg-rose-50/50 rounded-xl">
              <h4 className="font-bold text-stone-800 mb-1">2. Fresh Water</h4>
              <p>Fill vase with fresh lukewarm water mixed with the provided flower food packet.</p>
            </div>
            <div className="p-3 bg-rose-50/50 rounded-xl">
              <h4 className="font-bold text-stone-800 mb-1">3. Placement</h4>
              <p>Keep blooms away from direct sunlight, drafts, radiators, and ripening fruit.</p>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold font-serif-floral text-stone-900">
              You May Also Love
            </h3>
            <Link to="/flowers" className="text-xs font-semibold text-rose-600 hover:underline">
              View all bouquets
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <FlowerCard key={p._id || p.id} flower={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
