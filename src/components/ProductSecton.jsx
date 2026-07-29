import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import CategorySection from "./CategerySection";
import SearchBar from "./SearchBar";
import ViewDetailsModal from "./ViewDetailsModal"; // Import the modal component

const ProductSecton = ({ onAddToCart, cartItems = [], onViewDetails }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal State Management
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open Modal Handler
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close Modal Handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Fetch categories list
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Fetch products depending on search query or category selection
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = "";
        if (searchQuery.trim() !== "") {
          url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
            searchQuery
          )}`;
        } else if (selectedCategory === "all") {
          url = "https://dummyjson.com/products";
        } else {
          url = `https://dummyjson.com/products/category/${selectedCategory}`;
        }

        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    // Debounce search input to limit API calls
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery]);

  // Handle Search Input Change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Reset category selection when user searches
    if (query && selectedCategory !== "all") {
      setSelectedCategory("all");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        
        {/* Top Header Bar Layout: Title & Search Bar */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight sm:text-2xl whitespace-nowrap">
            Browse Categories
          </h2>

          {/* Cleanly Integrated SearchBar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* Category Carousel Section */}
        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSearchQuery(""); // Clear search when selecting category
            setSelectedCategory(category);
          }}
        />

        {/* Products Grid Below */}
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200/80 pb-4">
            <h3 className="text-xl font-extrabold text-slate-800 capitalize sm:text-2xl">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory === "all"
                ? "All Products"
                : selectedCategory.replace("-", " ")}
            </h3>
            <span className="rounded-full bg-sky-blue/10 px-3.5 py-1 text-xs font-bold text-sky-blue">
              {products.length} Items Found
            </span>
          </div>

          {loading ? (
            <div className="flex h-64 w-full items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-blue border-t-transparent" />
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg font-bold text-slate-700">
                No products found
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartItems={cartItems}
                  onAddToCart={onAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Global Product View Details Modal */}
      <ViewDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default ProductSecton;