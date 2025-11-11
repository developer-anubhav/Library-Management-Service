import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { BookCardSkeleton } from '../common/Loader';

const BookList = ({ filters = {}, searchQuery = '' }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    fetchBooks();
    
  }, [filters, searchQuery, currentPage, sortBy]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await bookService.getBooks({ filters, searchQuery, page: currentPage, sortBy });
      
      // Simulated data
      const mockBooks = [
        {
          id: 1,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          coverImage: null,
          category: 'Fiction',
          rating: 4.5,
          availableCopies: 3,
          totalCopies: 5,
          isbn: '978-0-7432-7356-5',
          publishedYear: 1925
        },
        {
          id: 2,
          title: '1984',
          author: 'George Orwell',
          coverImage: null,
          category: 'Fiction',
          rating: 4.8,
          availableCopies: 0,
          totalCopies: 4,
          isbn: '978-0-452-28423-4',
          publishedYear: 1949
        },
        {
          id: 3,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          coverImage: null,
          category: 'Fiction',
          rating: 4.7,
          availableCopies: 2,
          totalCopies: 3,
          isbn: '978-0-06-112008-4',
          publishedYear: 1960
        },
        {
          id: 4,
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          coverImage: null,
          category: 'Romance',
          rating: 4.6,
          availableCopies: 1,
          totalCopies: 2,
          isbn: '978-0-14-143951-8',
          publishedYear: 1813
        },
        {
          id: 5,
          title: 'The Catcher in the Rye',
          author: 'J.D. Salinger',
          coverImage: null,
          category: 'Fiction',
          rating: 4.2,
          availableCopies: 4,
          totalCopies: 6,
          isbn: '978-0-316-76948-0',
          publishedYear: 1951
        },
        {
          id: 6,
          title: 'Harry Potter and the Philosopher\'s Stone',
          author: 'J.K. Rowling',
          coverImage: null,
          category: 'Fantasy',
          rating: 4.9,
          availableCopies: 5,
          totalCopies: 8,
          isbn: '978-0-439-70818-8',
          publishedYear: 1997
        },
        {
          id: 7,
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          coverImage: null,
          category: 'Fantasy',
          rating: 4.7,
          availableCopies: 2,
          totalCopies: 4,
          isbn: '978-0-547-92822-7',
          publishedYear: 1937
        },
        {
          id: 8,
          title: 'The Da Vinci Code',
          author: 'Dan Brown',
          coverImage: null,
          category: 'Mystery',
          rating: 4.3,
          availableCopies: 0,
          totalCopies: 3,
          isbn: '978-0-307-47427-1',
          publishedYear: 2003
        }
      ];

      setTimeout(() => {
        setBooks(mockBooks);
        setTotalPages(3);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BookCardSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Books'}
          </h2>
          <p className="text-gray-600 mt-1">{books.length} books found</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
              aria-label="Grid view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
              aria-label="List view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          >
            <option value="title">Title (A-Z)</option>
            <option value="author">Author (A-Z)</option>
            <option value="year">Year (Newest)</option>
            <option value="rating">Rating (Highest)</option>
            <option value="availability">Availability</option>
          </select>
        </div>
      </div>

      {/* Books Grid/List */}
      {books.length > 0 ? (
        <>
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === index + 1
                      ? 'bg-purple-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default BookList;