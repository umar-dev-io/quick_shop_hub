import React, { useState } from "react";
import {
  X,
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Box,
  CheckCircle,
  XCircle,
  Tag,
  User,
  Calendar,
} from "lucide-react";

const ViewDetailsModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags = [],
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews = [],
    returnPolicy,
    minimumOrderQuantity,
    images = [],
    thumbnail,
  } = product;

  // Track active gallery image
  const galleryImages = images.length > 0 ? images : [thumbnail];
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  // Price calculations
  const discountedPrice = (
    price -
    (price * (discountPercentage || 0)) / 100
  ).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sky-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-blue">
              {category}
            </span>
            <span className="text-xs font-semibold text-slate-400">SKU: {sku}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-all focus:outline-none"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          {/* Main Top Grid: Gallery & Primary Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={activeImage}
                  alt={title}
                  className="h-full w-full object-contain"
                />
                {discountPercentage > 0 && (
                  <span className="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                    -{Math.round(discountPercentage)}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails list */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`h-16 w-16 shrink-0 rounded-xl border-2 p-1 transition-all ${
                        activeImage === img
                          ? "border-sky-blue bg-sky-blue/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-blue">
                  {brand || "Generic Brand"}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {title}
                </h2>

                {/* Rating & Stock */}
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{rating ? rating.toFixed(1) : "N/A"}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1 font-semibold text-slate-600">
                    {stock > 0 ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>{availabilityStatus || `${stock} in stock`}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-slate-900">
                    ${discountedPrice}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="text-sm text-slate-400 line-through">
                      ${price.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {description}
                </p>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
                      >
                        <Tag className="h-3 w-3 text-slate-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onAddToCart) onAddToCart(product);
                    onClose();
                  }}
                  disabled={stock <= 0}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-blue py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-blue/25 hover:bg-sky-blue/90 active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
                {minimumOrderQuantity > 1 && (
                  <p className="text-center text-xs text-slate-400">
                    Minimum order quantity: {minimumOrderQuantity} units
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Key Features Grid (Shipping, Warranty, Return, Dimensions) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <Truck className="h-5 w-5 mx-auto text-sky-blue mb-1" />
              <p className="text-xs font-bold text-slate-800">Shipping</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{shippingInformation}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <ShieldCheck className="h-5 w-5 mx-auto text-sky-blue mb-1" />
              <p className="text-xs font-bold text-slate-800">Warranty</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{warrantyInformation}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <RotateCcw className="h-5 w-5 mx-auto text-sky-blue mb-1" />
              <p className="text-xs font-bold text-slate-800">Returns</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{returnPolicy}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <Box className="h-5 w-5 mx-auto text-sky-blue mb-1" />
              <p className="text-xs font-bold text-slate-800">Specs / Weight</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {dimensions ? `${dimensions.width}x${dimensions.height} cm` : "N/A"} ({weight}oz)
              </p>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Customer Reviews ({reviews.length})
            </h3>
            {reviews.length === 0 ? (
              <p className="text-sm text-slate-400">No reviews yet for this product.</p>
            ) : (
              <div className="space-y-3">
                {reviews.map((rev, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-blue/10 text-sky-blue">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {rev.reviewerName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {rev.reviewerEmail}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="text-xs font-bold">{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(rev.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;