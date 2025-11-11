import React, { useState } from 'react';

const BookSearch = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    availability: '',
    rating: '',
    year: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    'All Categories',
    'Fiction',
    'Non-Fiction',
    'Science',
    'Technology',
    'History',
    'Romance',
    'Mystery',
    'Fantasy',
    'Biography',
    'Self-Help'
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      availability: '',
      rating: '',
      year: ''
    });
    setSearchTerm('');
    if (onFilterChange) {
      onFilterChange({});
    }
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Main Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title, author, ISBN..."
            className="block w-full pl-12 pr-32 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          />
          <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filters
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category === 'All Categories' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Books</option>
                <option value="available">Available Only</option>
                <option value="borrowed">Borrowed Only</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Year
              </label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Any Year</option>
                <option value="2020-2024">2020-2024</option>
                <option value="2010-2019">2010-2019</option>
                <option value="2000-2009">2000-2009</option>
                <option value="1990-1999">1990-1999</option>
                <option value="before-1990">Before 1990</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.category || filters.availability || filters.rating || filters.year || searchTerm) && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      if (onSearch) onSearch('');
                    }}
                    className="hover:text-purple-900"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              {filters.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {filters.category}
                  <button
                    onClick={() => handleFilterChange('category', '')}
                    className="hover:text-purple-900"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              {filters.availability && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {filters.availability === 'available' ? 'Available' : 'Borrowed'}
                  <button
                    onClick={() => handleFilterChange('availability', '')}
                    className="hover:text-purple-900"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              {filters.rating && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {filters.rating}+ Stars
                  <button
                    onClick={() => handleFilterChange('rating', '')}
                    className="hover:text-purple-900"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              {filters.year && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {filters.year}
                  <button
                    onClick={() => handleFilterChange('year', '')}
                    className="hover:text-purple-900"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick Category Pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-700">Quick search:</span>
        {['Fiction', 'Fantasy', 'Science', 'History', 'Technology'].map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterChange('category', cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filters.category === cat
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;