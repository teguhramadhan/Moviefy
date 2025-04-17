// src/components/SearchBar.jsx
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mb-6">
      <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <FiSearch className="text-gray-500 dark:text-gray-400 mr-2 text-lg" />
        <input
          type="text"
          placeholder="Search movies..."
          className="bg-transparent w-full focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchBar;
