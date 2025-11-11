import React, { useState } from 'react';
import BookSearch from '../components/books/BookSearch';
import BookList from '../components/books/BookList';

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Library</h1>
            <p className="text-xl text-purple-100">
              Explore our extensive collection of books across all genres
            </p>
          </div>
        </div>
      </section>

      {/* Library Content */}
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Search Component */}
        <BookSearch onSearch={handleSearch} onFilterChange={handleFilterChange} />

        {/* Book List Component */}
        <BookList filters={filters} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Library;