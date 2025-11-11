import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../common/Loader';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);

  useEffect(() => {
    fetchBookDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBookDetails = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await bookService.getBookById(id);
      
      // Simulated data
      const mockBook = {
        id: parseInt(id),
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        coverImage: null,
        category: 'Fiction',
        rating: 4.5,
        availableCopies: 3,
        totalCopies: 5,
        isbn: '978-0-7432-7356-5',
        publishedYear: 1925,
        publisher: 'Scribner',
        pages: 180,
        language: 'English',
        description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
        reviews: [
          { id: 1, user: 'John Doe', rating: 5, comment: 'A masterpiece of American literature!', date: '2024-01-15' },
          { id: 2, user: 'Jane Smith', rating: 4, comment: 'Beautifully written and captivating.', date: '2024-01-10' }
        ]
      };

      setTimeout(() => {
        setBook(mockBook);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching book details:', error);
      setLoading(false);
    }
  };

  const handleBorrow = async () => {
    setBorrowing(true);
    try {
      // TODO: Replace with actual API call
      // await bookService.borrowBook(id);
      console.log('Borrowing book:', id);
      
      setTimeout(() => {
        setBorrowing(false);
        setShowBorrowModal(false);
        // Refresh book details
        fetchBookDetails();
      }, 1500);
    } catch (error) {
      console.error('Error borrowing book:', error);
      setBorrowing(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Loading book details..." />;
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h2>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
        <Link to="/library" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Library
        </Link>
      </div>
    );
  }

  const isAvailable = book.availableCopies > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <span>/</span>
          <Link to="/library" className="hover:text-purple-600">Library</Link>
          <span>/</span>
          <span className="text-gray-900">{book.title}</span>
        </nav>

        {/* Book Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <div className="sticky top-8">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg shadow-xl overflow-hidden">
                  {book.coverImage ? (
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-32 h-32 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {isAvailable ? (
                    <button
                      onClick={() => setShowBorrowModal(true)}
                      className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Borrow Book
                    </button>
                  ) : (
                    <button disabled className="w-full bg-gray-300 text-gray-600 py-3 px-6 rounded-lg font-semibold cursor-not-allowed">
                      Currently Unavailable
                    </button>
                  )}
                  
                  <button className="w-full border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Add to Wishlist
                  </button>
                </div>

                {/* Availability */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Availability:</span>
                    <span className={`text-sm font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      {book.availableCopies}/{book.totalCopies} Available
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-3">
                  {book.category}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-6 h-6 ${index < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">{book.rating}</span>
                  <span className="text-gray-500">({book.reviews?.length || 0} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">About this book</h2>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>

              {/* Details Grid */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">ISBN</p>
                      <p className="font-semibold text-gray-900">{book.isbn}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Published Year</p>
                      <p className="font-semibold text-gray-900">{book.publishedYear}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Publisher</p>
                      <p className="font-semibold text-gray-900">{book.publisher}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Pages</p>
                      <p className="font-semibold text-gray-900">{book.pages}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Language</p>
                      <p className="font-semibold text-gray-900">{book.language}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              {book.reviews && book.reviews.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Reader Reviews</h2>
                  <div className="space-y-4">
                    {book.reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {review.user.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{review.user}</p>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                className={`w-4 h-4 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Borrow</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to borrow "<strong>{book.title}</strong>"?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBorrowModal(false)}
                disabled={borrowing}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBorrow}
                disabled={borrowing}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {borrowing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Confirm Borrow'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;