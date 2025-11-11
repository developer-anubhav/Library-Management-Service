import React, { useState } from 'react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Mock data
  const overviewStats = {
    totalBorrows: 1245,
    totalReturns: 1180,
    activeLoans: 342,
    overdueBooks: 28,
    newUsers: 156,
    revenue: 3450.50
  };

  const popularBooks = [
    { rank: 1, title: 'Harry Potter Series', borrows: 156, category: 'Fantasy' },
    { rank: 2, title: '1984', borrows: 142, category: 'Fiction' },
    { rank: 3, title: 'The Great Gatsby', borrows: 128, category: 'Fiction' },
    { rank: 4, title: 'To Kill a Mockingbird', borrows: 115, category: 'Fiction' },
    { rank: 5, title: 'Pride and Prejudice', borrows: 98, category: 'Romance' },
    { rank: 6, title: 'The Hobbit', borrows: 87, category: 'Fantasy' },
    { rank: 7, title: 'The Catcher in the Rye', borrows: 76, category: 'Fiction' },
    { rank: 8, title: 'The Da Vinci Code', borrows: 65, category: 'Mystery' }
  ];

  const topCategories = [
    { name: 'Fiction', borrows: 485, percentage: 39 },
    { name: 'Fantasy', borrows: 243, percentage: 20 },
    { name: 'Science', borrows: 186, percentage: 15 },
    { name: 'History', borrows: 149, percentage: 12 },
    { name: 'Technology', borrows: 112, percentage: 9 },
    { name: 'Others', borrows: 70, percentage: 5 }
  ];

  const activeUsers = [
    { rank: 1, name: 'John Doe', borrows: 45, returns: 42 },
    { rank: 2, name: 'Jane Smith', borrows: 38, returns: 35 },
    { rank: 3, name: 'Mike Johnson', borrows: 32, returns: 32 },
    { rank: 4, name: 'Sarah Williams', borrows: 28, returns: 25 },
    { rank: 5, name: 'Tom Brown', borrows: 24, returns: 24 }
  ];

  const revenueData = [
    { month: 'Jan', amount: 450 },
    { month: 'Feb', amount: 520 },
    { month: 'Mar', amount: 380 },
    { month: 'Apr', amount: 690 },
    { month: 'May', amount: 540 },
    { month: 'Jun', amount: 870.50 }
  ];

  const handleExport = (format) => {
    console.log(`Exporting report as ${format}`);
    // TODO: Implement export functionality
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">View insights and generate reports</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Export PDF
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Excel
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPeriod('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === 'week'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === 'month'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setSelectedPeriod('year')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === 'year'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                This Year
              </button>
            </div>

            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="overview">Overview Report</option>
              <option value="books">Books Report</option>
              <option value="users">Users Report</option>
              <option value="revenue">Revenue Report</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{overviewStats.totalBorrows}</h3>
            <p className="text-blue-100">Total Borrows</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">+8%</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{overviewStats.totalReturns}</h3>
            <p className="text-green-100">Total Returns</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">+24</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{overviewStats.newUsers}</h3>
            <p className="text-purple-100">New Users</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Live</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{overviewStats.activeLoans}</h3>
            <p className="text-orange-100">Active Loans</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">-5</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{overviewStats.overdueBooks}</h3>
            <p className="text-red-100">Overdue Books</p>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">+15%</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">${overviewStats.revenue.toFixed(2)}</h3>
            <p className="text-teal-100">Total Revenue</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Books */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Most Popular Books</h2>
            <div className="space-y-3">
              {popularBooks.map((book) => (
                <div key={book.rank} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                    book.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                    book.rank === 2 ? 'bg-gray-200 text-gray-600' :
                    book.rank === 3 ? 'bg-orange-100 text-orange-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {book.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{book.title}</p>
                    <p className="text-sm text-gray-600">{book.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">{book.borrows}</p>
                    <p className="text-xs text-gray-500">borrows</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top Categories</h2>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm font-semibold text-purple-600">{category.borrows} ({category.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Users */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Most Active Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Rank</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">User</th>
                    <th className="text-center py-3 text-sm font-medium text-gray-500">Borrows</th>
                    <th className="text-center py-3 text-sm font-medium text-gray-500">Returns</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activeUsers.map((user) => (
                    <tr key={user.rank} className="hover:bg-gray-50">
                      <td className="py-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          user.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                          user.rank === 2 ? 'bg-gray-200 text-gray-600' :
                          user.rank === 3 ? 'bg-orange-100 text-orange-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {user.rank}
                        </div>
                      </td>
                      <td className="py-3 font-medium text-gray-900">{user.name}</td>
                      <td className="py-3 text-center text-blue-600 font-semibold">{user.borrows}</td>
                      <td className="py-3 text-center text-green-600 font-semibold">{user.returns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
            <div className="space-y-4">
              {revenueData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{item.month}</span>
                    <span className="text-sm font-semibold text-green-600">${item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(item.amount / 900) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total Revenue</span>
                <span className="text-2xl font-bold text-green-600">
                  ${revenueData.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;