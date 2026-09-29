import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Truck,
  Gift,
  ShieldCheck,
  ArrowRight,
  Send,
  Star,
  CheckCircle2,
  HeartHandshake,
  Clock
} from 'lucide-react';
import FlowerCard from '../components/FlowerCard.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import FloatingFlowers from '../components/FloatingFlowers.jsx';
import { flowerCategories } from '../data/flowerData.js';
import { getProducts } from '../api/api.js';
import confetti from 'canvas-confetti';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching flowers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setEmailSubscribed(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f43f5e', '#ec4899', '#fbcfe8', '#f59e0b']
      });
      setNewsletterEmail('');
    }
  };

  const featureCards = [
    {
      icon: '🌸',
      title: 'Fresh Flowers',
      description: 'Beautiful flowers selected and hand-harvested with tender care.',
      gradient: 'from-pink-500/10 to-rose-500/10',
      iconBg: 'bg-rose-100 text-rose-600',
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Fresh flowers delivered to your door in climate-controlled vans.',
      gradient: 'from-emerald-500/10 to-teal-500/10',
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: '💝',
      title: 'Beautiful Packaging',
      description: 'Special artisan boxes and silk ribbons for heartwarming moments.',
      gradient: 'from-purple-500/10 to-fuchsia-500/10',
      iconBg: 'bg-purple-100 text-purple-600',
    },
    {
      icon: '✨',
      title: 'Quality Guaranteed',
      description: '7-day petal freshness and 100% satisfaction guaranteed.',
      gradient: 'from-amber-500/10 to-yellow-500/10',
      iconBg: 'bg-amber-100 text-amber-600',
    },
  ];

  const testimonials = [
    {
      name: 'Sophia Martinez',
      role: 'Anniversary Gift',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      text: 'Absolutely breathtaking flowers! The bouquet looked even fresher and fuller than the pictures. It stayed vibrant for over 9 days!',
    },
    {
      name: 'James Reynolds',
      role: 'Birthday Surprise',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      text: 'Bloomora delivered on time within 3 hours on Valentine’s Day. The custom message card and packaging were pure luxury.',
    },
    {
      name: 'Emily Chen',
      role: 'Home Decor Enthusiast',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      text: 'The Spring Tulip Melody filled my living room with the sweet smell of spring. I will never buy supermarket flowers again.',
    },
    {
      name: 'Marcus Vance',
      role: 'Wedding Centerpieces',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      text: 'Superb quality and friendly customer care. The roses were open just the right amount, velvety, and without any bruised petals.',
    },
  ];

  return (
    <div className="relative overflow-hidden space-y-20 sm:space-y-28 pb-16">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative min-h-[82vh] flex items-center justify-center pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Floating petals animation component */}
        <FloatingFlowers count={8} />

        {/* Ambient Gradient Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-200/40 via-pink-200/40 to-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold shadow-xs">
                <span className="text-base animate-pulse">🌸</span>
                <span>Fresh Flowers • Fresh Feelings</span>
              </div>

              {/* Large Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-[1.12]">
                Beautiful Flowers, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-rose-600 via-pink-500 to-rose-700 bg-clip-text text-transparent font-serif-floral italic">
                  Beautiful Moments
                </span>
              </h1>

              {/* Short Description */}
              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover colorful fresh flowers carefully arranged to make every moment a little more special. Hand-picked daily and wrapped with love.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/flowers"
                  className="px-7 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg hover:shadow-rose-300 transition-all transform active:scale-95 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Shop Flowers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="#collection"
                  className="px-7 py-3.5 bg-white/80 hover:bg-white text-stone-800 border border-rose-200/80 hover:border-rose-300 rounded-2xl font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Explore Collection
                </a>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-rose-100/80 grid grid-cols-3 gap-2 text-stone-600 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Farm Fresh</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <Truck className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Fast Same-Day</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>7-Day Guarantee</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image with Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-md sm:max-w-lg aspect-4/5 rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/50 border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=85"
                  alt="Bloomora Luxury Flower Bouquet"
                  className="w-full h-full object-cover"
                />

                {/* Subtle soft gradient at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs font-semibold text-rose-200 uppercase tracking-widest">Masterpiece Bouquet</p>
                  <p className="text-lg font-bold font-serif-floral">The Romantic Scarlet Collection</p>
                </div>
              </div>

              {/* Floating Mini Floral Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-rose-100 flex items-center gap-3"
              >
                <span className="text-2xl">🌹</span>
                <div>
                  <p className="text-xs font-bold text-stone-800">Fresh Cut Roses</p>
                  <p className="text-[10px] text-stone-500">Picked this morning</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-5 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-rose-100 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
                  4.9★
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">2,400+ Reviews</p>
                  <p className="text-[10px] text-stone-500">Loved by florists</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 2. FEATURE SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-rose-100/70 shadow-xs hover:shadow-lg hover:shadow-rose-100/60 transition-all`}
            >
              <div className="text-3xl mb-4 p-3 rounded-2xl bg-rose-50 w-fit">
                {feat.icon}
              </div>
              <h3 className="font-bold text-stone-900 text-lg mb-1.5 font-serif-floral">
                {feat.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= 3. CATEGORY SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-rose-500">Curated Blossoms</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-floral text-stone-900">
            Browse by Floral Category
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Select a category to quickly filter our handcrafted arrangements and seasonal varieties.
          </p>
        </div>

        {/* Categories scrollable flex / grid */}
        <div className="flex items-center justify-start sm:justify-center gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {flowerCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => handleCategorySelect(category.id)}
            />
          ))}
        </div>
      </section>

      {/* ================= 4. FLOWER COLLECTION ================= */}
      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-rose-100 pb-5">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-rose-500">Fresh Harvest</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-floral text-stone-900 mt-1">
              Explore Our Flowers
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Find the perfect flowers for every special moment.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-stone-500">
              Showing <strong className="text-rose-600">{filteredProducts.length}</strong> creations
            </span>
            <Link
              to="/flowers"
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 group"
            >
              View Full Catalog <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white/60 rounded-3xl p-4 space-y-4">
                <div className="aspect-4/3 bg-rose-100/60 rounded-2xl w-full" />
                <div className="h-4 bg-rose-100/60 rounded-md w-3/4" />
                <div className="h-3 bg-rose-100/40 rounded-md w-full" />
                <div className="h-6 bg-rose-100/60 rounded-md w-1/3" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-3xl border border-rose-100">
            <span className="text-4xl">🌷</span>
            <h3 className="text-lg font-bold text-stone-800 mt-2">No flowers found in this category</h3>
            <p className="text-sm text-stone-500 mt-1">Try selecting another category or view all flowers.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-semibold"
            >
              Show All Flowers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((flower) => (
              <FlowerCard key={flower._id || flower.id} flower={flower} />
            ))}
          </div>
        )}
      </section>

      {/* ================= 5. SPECIAL OFFER SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white p-8 sm:p-14 shadow-xl shadow-rose-200/50">
          <FloatingFlowers count={6} />
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
              Limited Time Special
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif-floral leading-tight">
              Make Someone Smile Today 🌸
            </h2>
            <p className="text-rose-100 text-base sm:text-lg">
              Get <strong className="text-white font-extrabold underline decoration-white/60">15% OFF</strong> on selected flower bouquets. Enter promo code <code className="bg-white/20 px-2 py-0.5 rounded-sm font-mono text-sm">BLOOM15</code> at checkout.
            </p>
            <div className="pt-2">
              <Link
                to="/flowers"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-rose-600 hover:bg-rose-50 font-bold rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer text-sm"
              >
                <span>Shop Offer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. ABOUT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-14 border border-rose-100 shadow-xs">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
              alt="Florist arranging flowers at Bloomora"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/10" />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold text-stone-800 shadow-sm flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>Arranged by Certified Master Florists</span>
            </div>
          </div>

          <div className="space-y-5">
            <span className="text-xs uppercase font-bold tracking-widest text-rose-500">Our Floral Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-floral text-stone-900">
              Flowers Made for Beautiful Moments
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              At Bloomora, we believe every flower tells an intimate story. Whether celebrating milestones or sending comfort, flowers speak the gentle language of the heart.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We handcraft fresh boutique bouquets designed for:
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {['Birthdays', 'Anniversaries', 'Weddings', 'Celebrations', 'Get Well Soon', 'Just Because'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-700">
                  <span className="text-rose-500 text-base">🌸</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold text-sm group"
              >
                <span>Read our full story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. TESTIMONIALS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-rose-500">Customer Love</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-floral text-stone-900">
            What Flower Lovers Say
          </h2>
          <p className="text-stone-600 text-sm">
            Read real stories from our delighted customers who shared flower moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-rose-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 mt-4 border-t border-rose-50">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-rose-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{t.name}</h4>
                  <p className="text-[11px] text-stone-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= 8. NEWSLETTER SECTION ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-rose-100/70 via-pink-50/80 to-amber-50/60 border border-rose-200/70 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
          <div className="max-w-md mx-auto space-y-3">
            <span className="text-3xl">🌸</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-floral text-stone-900">
              Stay in Bloom
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Get flower inspiration, secret seasonal discount codes, and new arrival notifications straight to your inbox.
            </p>

            {emailSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Thank you for subscribing! Your 15% discount code is on its way.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="pt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white rounded-xl text-sm border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-rose-400 text-stone-800"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
