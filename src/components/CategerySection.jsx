import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Grid, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const CategorySection = ({ categories, selectedCategory, onSelectCategory }) => {
  const scrollContainerRef = useRef(null);
  const [categoryImages, setCategoryImages] = useState({});

  useEffect(() => {
    async function fetchCategoryImages() {
      const imageMap = {};
      await Promise.all(
        categories.map(async (cat) => {
          const slug = typeof cat === "object" ? cat.slug : cat;
          try {
            const res = await axios.get(
              `https://dummyjson.com/products/category/${slug}?limit=1`
            );
            if (res.data.products && res.data.products.length > 0) {
              imageMap[slug] = res.data.products[0].thumbnail;
            }
          } catch (e) {
            console.error("Failed to load image for category", slug, e);
          }
        })
      );
      setCategoryImages(imageMap);
    }

    if (categories && categories.length > 0) {
      fetchCategoryImages();
    }
  }, [categories]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* Carousel Scroll Controls Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-sky-blue" />
          <h3 className="text-lg font-bold text-slate-800">Explore Collections</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-sky-blue hover:bg-sky-blue hover:text-white active:scale-95 focus:outline-none"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-sky-blue hover:bg-sky-blue hover:text-white active:scale-95 focus:outline-none"
            aria-label="Scroll Right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Carousel track */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-4 overflow-x-auto py-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => {
          const categorySlug = typeof cat === "object" ? cat.slug : cat;
          const categoryName = typeof cat === "object" ? cat.name : cat;
          const isSelected = selectedCategory === categorySlug;
          const imgUrl = categoryImages[categorySlug];

          return (
            <button
              key={categorySlug}
              type="button"
              onClick={() => onSelectCategory(categorySlug)}
              className={`group flex shrink-0 w-36 sm:w-40 flex-col items-center gap-3 rounded-2xl p-3 text-center transition-all duration-300 focus:outline-none ${
                isSelected
                  ? "bg-sky-blue text-white shadow-xl shadow-sky-blue/20 scale-105"
                  : "bg-white text-slate-700 border border-slate-200/80 hover:border-sky-blue/40 hover:shadow-md"
              }`}
            >
              <div
                className={`h-20 w-20 overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-110 ${
                  isSelected ? "bg-white/20" : ""
                }`}
              >
                {imgUrl ? (
                  <img src={imgUrl} alt={categoryName} className="h-full w-full object-contain" />
                ) : (
                  <div className="h-6 w-6 animate-pulse rounded-full bg-slate-300" />
                )}
              </div>
              <span className="text-xs sm:text-sm font-bold capitalize line-clamp-1">
                {categoryName.replace("-", " ")}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          className={`group flex shrink-0 w-36 sm:w-40 flex-col items-center justify-center gap-3 rounded-2xl p-3 text-center transition-all duration-300 focus:outline-none ${
            selectedCategory === "all"
              ? "bg-sky-blue text-white shadow-xl shadow-sky-blue/20 scale-105"
              : "bg-slate-800 text-white hover:bg-slate-900"
          }`}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white/10 text-white transition-transform duration-300 group-hover:scale-110">
            <Grid className="h-8 w-8" />
          </div>
          <span className="text-xs sm:text-sm font-bold">All Products</span>
        </button>
      </div>
    </div>
  );
};

export default CategorySection;