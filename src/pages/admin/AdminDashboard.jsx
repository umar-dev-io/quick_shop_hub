import React, { useState } from "react";
import { PlusCircle, CheckCircle } from "lucide-react";

const AdminDashboard = () => {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: "",
    brand: "",
    price: "",
    discountPercentage: "",
    stock: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      title: form.title,
      brand: form.brand || "Generic",
      price: parseFloat(form.price),
      discountPercentage: parseFloat(form.discountPercentage) || 0,
      stock: parseInt(form.stock, 10) || 1,
      thumbnail: form.thumbnail || "https://via.placeholder.com/150",
      rating: 5.0,
      availabilityStatus: "In Stock",
    };

    // Get existing products from localStorage or empty array
    const existingProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    const updatedProducts = [newProduct, ...existingProducts];

    // Save to localStorage
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));

    // Dispatch a custom event to update other pages in real-time
    window.dispatchEvent(new Event("productsUpdated"));

    setSuccess(true);
    setForm({ title: "", brand: "", price: "", discountPercentage: "", stock: "", thumbnail: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl border border-sky-blue/20">
      <h1 className="text-2xl font-black text-slate-800 mb-4">Admin Dashboard</h1>
      <p className="text-xs text-slate-500 mb-6">Add a new product to display on the user storefront.</p>

      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 border border-emerald-200 text-emerald-700 text-xs font-bold">
          <CheckCircle className="h-4 w-4" /> Product added successfully! It is now live on the store.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-sky-blue/30 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
            placeholder="e.g. Wireless Headphones"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-sky-blue/30 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
              placeholder="e.g. AudioPro"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-sky-blue/30 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
              placeholder="29.99"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-sky-blue/30 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
              placeholder="10"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Discount %</label>
            <input
              type="number"
              name="discountPercentage"
              value={form.discountPercentage}
              onChange={handleChange}
              className="w-full rounded-lg border border-sky-blue/30 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
              placeholder="10"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
          <input
            type="url"
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-sky-blue/30 p-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-sky-blue py-3 text-xs font-bold text-white shadow-md hover:bg-sky-blue/90 transition-all"
        >
          <PlusCircle className="h-4 w-4" /> Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;