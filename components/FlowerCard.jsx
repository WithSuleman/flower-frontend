import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function FlowerCard({ flower }) {
  const { addToCart, isFavorite, toggleFavorite } = useCart();
  const id = flower._id || flower.id;
  const favorite = isFavorite(id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-3 border border-rose-100 shadow-sm hover:shadow-xl hover:shadow-rose-100/60 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-rose-50">
        <img
          src={flower.image}
          alt={flower.name}
          loading="lazy"
          className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-108"
        />

        {/* Category Pill & Stock Status */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="text-xs font-semibold px-2.5 py-1 bg-white/85 backdrop-blur-md text-rose-700 rounded-full shadow-xs">
            {flower.category}
          </span>
          {flower.stock <= 15 && (
            <span className="text-[10px] font-medium px-2 py-0.5 bg-amber-100/90 text-amber-800 rounded-full">
              Only {flower.stock} left
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(id);
          }}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/85 backdrop-blur-md shadow-sm transition-transform active:scale-90 hover:bg-white text-stone-600 hover:text-rose-500"
        >
          <motion.div
            whileTap={{ scale: 0.8 }}
            animate={favorite ? { scale: [1, 1.25, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorite ? 'fill-rose-500 text-rose-500' : 'text-stone-500'
              }`}
            />
          </motion.div>
        </button>

        {/* Quick View Overlay action on Hover */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto">
          <Link
            to={`/products/${id}`}
            className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 bg-white text-stone-800 rounded-full shadow-md hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-rose-500" />
            Quick View
          </Link>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-2.5 pt-3 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5 text-xs text-stone-500">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-semibold text-stone-800">{flower.rating?.toFixed(1) || '4.9'}</span>
            <span className="text-stone-400">({flower.reviewsCount || 48})</span>
          </div>

          {/* Title */}
          <Link to={`/products/${id}`} className="block">
            <h3 className="font-semibold text-stone-900 text-base line-clamp-1 group-hover:text-rose-600 transition-colors">
              {flower.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {flower.description}
          </p>
        </div>

        {/* Price and Add to Cart action */}
        <div className="mt-3.5 pt-2.5 border-t border-rose-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 block font-normal">Price</span>
            <span className="text-lg font-bold text-stone-900">
              ${Number(flower.price).toFixed(2)}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => addToCart(flower, 1)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow-md hover:shadow-rose-200 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Basket
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
