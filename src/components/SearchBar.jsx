import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ searchQuery, onSearchChange, placeholder = "Search products by name..." }) => {
  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
        <Search className="h-4 w-4" />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm transition-all focus:border-sky-blue focus:outline-none focus:ring-4 focus:ring-sky-blue/15"
      />

      {/* Clear Button */}
      {searchQuery && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;