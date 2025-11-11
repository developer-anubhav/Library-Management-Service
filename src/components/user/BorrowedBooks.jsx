import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';

const BorrowedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returnModal, setReturnModal] = useState(null);
  const [renewModal, setRenewModal] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchBorrowedBooks();
    
  }, []);

  const fetchBorrowedBooks = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await userService.getBorrowedBooks();
      
      const mockBooks = [
        {
          id: 1,
          bookId: 101,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          coverImage: null,
          borrowDate: '2024-01-15',
          dueDate: '2024-02-14',
          status: 'active',
          renewCount: 0,
          maxRenewals: 2
        },
        {
          id: 2,
          bookId: 102,
          title: '1984',
          author: 'George Orwell',
          coverImage: null,
          borrowDate: '2024-01-10',
          dueDate: '2024-02-09',
          status: 'active',
          renewCount: 1,
          maxRenewals: 2
        },
        {
          id: 3,
          bookId: 103,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          coverImage: null,
          borrowDate: '2023-12-20',
          dueDate: '2024-01-19',
          status: 'overdue',
          renewCount: 2,
          maxRenewals: 2
        }
      ];

      setTimeout(() => {
        setBooks(mockBooks);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
      setLoading(false);
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (book) => {
    if (book.status === 'overdue') return 'text-red-600 bg-red-50';
    const daysLeft = getDaysUntilDue(book.dueDate);
    if (daysLeft <= 3) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusText = (book) => {
    if (book.status === 'overdue') return 'Overdue';
    const daysLeft = getDaysUntilDue(book.dueDate);
    if (daysLeft === 0) return 'Due Today';
    if (daysLeft === 1) return 'Due Tomorrow';
    return `${daysLeft} days left`;
  };

  const handleReturn = async (bookId) => {
    setProcessing(true);
    try {
      // TODO: Replace with actual API call
      // await userService.returnBook(bookId);
      console.log('Returning book:', bookId);
      
      setTimeout(() => {
        setBooks(books.filter(book => book.id !== bookId));
        setReturnModal(null);
        setProcessing(false);
      }, 1000);
    } catch (error) {
      console.error('Error returning book:', error);
      setProcessing(false);
    }
  };

  const handleRenew = async (bookId) => {
    setProcessing(true);
    try {
      // TODO: Replace with actual API call
      // await userService.renewBook(bookId);
      console.log('Renewing book:', bookId);
      
      setTimeout(() => {
        setBooks(books.map(book => 
          book.id === bookId 
            ? { ...book, renewCount: book.renewCount + 1, dueDate: new Date(new Date(book.dueDate).setDate(new Date(book.dueDate).getDate() + 30)).toISOString().split('T')[0] }
            : book
        ));
        setRenewModal(null);
        setProcessing(false);
      }, 1000);
    } catch (error) {
      console.error('Error renewing book:', error);
      setProcessing(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Loading your borrowed books..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Borrowed Books</h1>
          <p className="text-gray-600 mt-1">Manage your current book loans</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{books.length}</p>
                <p className="text-sm text-gray-600">Currently Borrowed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {books.filter(b => getDaysUntilDue(b.dueDate) <= 3 && b.status !== 'overdue').length}
                </p>
                <p className="text-sm text-gray-600">Due Soon</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {books.filter(b => b.status === 'overdue').length}
                </p>
                <p className="text-sm text-gray-600">Overdue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Books List */}
        {books.length > 0 ? (
          <div className="space-y-4">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Book Cover */}
                  <div className="md:w-48 flex-shrink-0">
                    <div className="h-full min-h-[200px] bg-gradient-to-br from-purple-400 to-indigo-500">
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-20 h-20 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Link to={`/books/${book.bookId}`} className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors">
                          {book.title}
                        </Link>
                        <p className="text-gray-600 mt-1">{book.author}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(book)}`}>
                        {getStatusText(book)}
                      </span>
                    </div>

                    {/* Dates Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Borrowed Date</p>
                        <p className="font-semibold text-gray-900">{new Date(book.borrowDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Due Date</p>
                        <p className="font-semibold text-gray-900">{new Date(book.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Renewals</p>
                        <p className="font-semibold text-gray-900">{book.renewCount}/{book.maxRenewals}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="font-semibold text-gray-900">{book.status === 'overdue' ? 'Overdue' : 'Active'}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            book.status === 'overdue' ? 'bg-red-500' :
                            getDaysUntilDue(book.dueDate) <= 3 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{
                            width: `${Math.min(100, Math.max(0, (1 - getDaysUntilDue(book.dueDate) / 30) * 100))}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setReturnModal(book)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Return Book
                      </button>
                      
                      {book.renewCount < book.maxRenewals && book.status !== 'overdue' && (
                        <button
                          onClick={() => setRenewModal(book)}
                          className="flex items-center gap-2 px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Renew
                        </button>
                      )}
                      
                      <Link
                        to={`/books/${book.bookId}`}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No borrowed books</h3>
            <p className="text-gray-600 mb-6">You haven't borrowed any books yet. Start exploring our library!</p>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Library
            </Link>
          </div>
        )}
      </div>

      {/* Return Modal */}
      {returnModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Return</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to return "<strong>{returnModal.title}</strong>"?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setReturnModal(null)}
                disabled={processing}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReturn(returnModal.id)}
                disabled={processing}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Confirm Return'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Renew Modal */}
      {renewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Renew Book</h3>
            <p className="text-gray-600 mb-4">
              Renew "<strong>{renewModal.title}</strong>" for another 30 days?
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-blue-800">
                New due date will be: <strong>{new Date(new Date(renewModal.dueDate).setDate(new Date(renewModal.dueDate).getDate() + 30)).toLocaleDateString()}</strong>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Renewals left: {renewModal.maxRenewals - renewModal.renewCount - 1} after this
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setRenewModal(null)}
                disabled={processing}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRenew(renewModal.id)}
                disabled={processing}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Confirm Renewal'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;