import React from "react";
import { ShoppingCart, Eye, Star, CheckCircle, XCircle } from "lucide-react";

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const {
    thumbnail,
    title,
    brand,
    price,
    discountPercentage,
    rating,
    stock,
    availabilityStatus,
  } = product;

  // Calculate price after discount
  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(2);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-blue/10 hover:border-sky-blue/30">
      
      {/* Image Container & Floating Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50 flex items-center justify-center p-4">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
            -{Math.round(discountPercentage)}%
          </span>
        )}

        {/* Quick View Floating Action */}
        <button
          type="button"
          onClick={() => onViewDetails && onViewDetails(product)}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-sky-blue hover:text-white focus:outline-none"
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Brand & Stock Status */}
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-semibold uppercase text-sky-blue tracking-wider">
            {brand || "Generic"}
          </span>
          <span className="flex items-center gap-1 font-medium text-slate-500">
            {stock > 0 ? (
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <XCircle className="h-3.5 w-3.5 text-red-500" />
            )}
            {availabilityStatus || (stock > 0 ? "In Stock" : "Out of Stock")}
          </span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-1 text-base font-bold text-slate-800 transition-colors group-hover:text-sky-blue" title={title}>
          {title}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            <Star className="h-4 w-4 fill-current" />
          </div>
          <span className="text-xs font-bold text-slate-700">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-4 mb-4 flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-slate-900">
            ${discountedPrice}
          </span>
          {discountPercentage > 0 && (
            <span className="text-xs text-slate-400 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onViewDetails && onViewDetails(product)}
            className="flex items-center justify-center rounded-xl border border-sky-blue/30 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-white hover:border-sky-blue focus:outline-none transition-all"
          >
            Details
          </button>

          <button
            type="button"
            onClick={() => onAddToCart && onAddToCart(product)}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-sky-blue py-2.5 text-xs font-bold text-white shadow-md shadow-sky-blue/20 hover:bg-sky-blue/90 active:scale-95 transition-all focus:outline-none"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;