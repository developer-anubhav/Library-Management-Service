import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';

const BookHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, returned, overdue
  const [sortBy, setSortBy] = useState('recent'); // recent, oldest, title

  useEffect(() => {
    fetchHistory();
    
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await userService.getBorrowingHistory();
      
      const mockHistory = [
        {
          id: 1,
          bookId: 101,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          coverImage: null,
          borrowDate: '2024-01-15',
          dueDate: '2024-02-14',
          returnDate: '2024-02-10',
          status: 'returned',
          renewCount: 0,
          lateFee: 0
        },
        {
          id: 2,
          bookId: 102,
          title: '1984',
          author: 'George Orwell',
          coverImage: null,
          borrowDate: '2023-12-10',
          dueDate: '2024-01-09',
          returnDate: '2024-01-15',
          status: 'returned-late',
          renewCount: 1,
          lateFee: 5.00
        },
        {
          id: 3,
          bookId: 103,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          coverImage: null,
          borrowDate: '2023-11-20',
          dueDate: '2023-12-20',
          returnDate: '2023-12-18',
          status: 'returned',
          renewCount: 2,
          lateFee: 0
        },
        {
          id: 4,
          bookId: 104,
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          coverImage: null,
          borrowDate: '2023-10-15',
          dueDate: '2023-11-14',
          returnDate: '2023-11-14',
          status: 'returned',
          renewCount: 0,
          lateFee: 0
        },
        {
          id: 5,
          bookId: 105,
          title: 'The Catcher in the Rye',
          author: 'J.D. Salinger',
          coverImage: null,
          borrowDate: '2023-09-10',
          dueDate: '2023-10-10',
          returnDate: '2023-10-20',
          status: 'returned-late',
          renewCount: 0,
          lateFee: 10.00
        }
      ];

      setTimeout(() => {
        setHistory(mockHistory);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching history:', error);
      setLoading(false);
    }
  };

  const getFilteredHistory = () => {
    let filtered = [...history];

    // Apply filter
    if (filter === 'returned') {
      filtered = filtered.filter(h => h.status === 'returned');
    } else if (filter === 'overdue') {
      filtered = filtered.filter(h => h.status === 'returned-late');
    }

    // Apply sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.borrowDate) - new Date(b.borrowDate));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  };

  const getStatusBadge = (status) => {
    if (status === 'returned') {
      return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Returned on time</span>;
    } else if (status === 'returned-late') {
      return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Returned late</span>;
    }
    return null;
  };

  const totalLateFees = history.reduce((sum, h) => sum + h.lateFee, 0);
  const onTimeReturns = history.filter(h => h.status === 'returned').length;
  const lateReturns = history.filter(h => h.status === 'returned-late').length;

  if (loading) {
    return <Loader fullScreen text="Loading borrowing history..." />;
  }

  const filteredHistory = getFilteredHistory();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Borrowing History</h1>
          <p className="text-gray-600 mt-1">View your complete borrowing record</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{history.length}</p>
                <p className="text-sm text-gray-600">Total Books</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{onTimeReturns}</p>
                <p className="text-sm text-gray-600">On Time</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{lateReturns}</p>
                <p className="text-sm text-gray-600">Late Returns</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${totalLateFees.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Late Fees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({history.length})
              </button>
              <button
                onClick={() => setFilter('returned')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'returned'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                On Time ({onTimeReturns})
              </button>
              <button
                onClick={() => setFilter('overdue')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'overdue'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Late ({lateReturns})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Book Cover */}
                  <div className="md:w-32 flex-shrink-0">
                    <div className="h-full min-h-[150px] bg-gradient-to-br from-purple-400 to-indigo-500">
                      {item.coverImage ? (
                        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Link to={`/books/${item.bookId}`} className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors">
                          {item.title}
                        </Link>
                        <p className="text-gray-600 mt-1">{item.author}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>

                    {/* Dates Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Borrowed</p>
                        <p className="font-semibold text-gray-900 text-sm">{new Date(item.borrowDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Due Date</p>
                        <p className="font-semibold text-gray-900 text-sm">{new Date(item.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Returned</p>
                        <p className="font-semibold text-gray-900 text-sm">{new Date(item.returnDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Renewals</p>
                        <p className="font-semibold text-gray-900 text-sm">{item.renewCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Late Fee</p>
                        <p className={`font-semibold text-sm ${item.lateFee > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          ${item.lateFee.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        to={`/books/${item.bookId}`}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        View Book
                      </Link>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Borrow Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No history found</h3>
            <p className="text-gray-600">No books match the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookHistory;