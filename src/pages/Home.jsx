import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredBooks = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction' },
    { id: 2, title: '1984', author: 'George Orwell', category: 'Fiction' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Romance' }
  ];

  const categories = [
    { name: 'Fiction', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', count: 850 },
    { name: 'Science', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', count: 420 },
    { name: 'History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', count: 365 },
    { name: 'Technology', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', count: 290 },
    { name: 'Fantasy', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', count: 310 },
    { name: 'Mystery', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', count: 245 }
  ];

  const features = [
    {
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      title: 'Vast Collection',
      description: 'Access thousands of books across multiple genres and categories'
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Easy Borrowing',
      description: 'Simple and quick borrowing process with flexible return dates'
    },
    {
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      title: 'Smart Search',
      description: 'Find books easily with our advanced search and filter system'
    },
    {
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      title: 'Digital Access',
      description: 'Manage your account and browse books from any device'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-black text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Your Gateway to Knowledge
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 font-semibold">
                Discover, borrow, and enjoy thousands of books from our digital library. Start your reading journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/library"
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-black transition-colors text-center"
                >
                  Browse Library
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-4 bg-black text-blue-600 rounded-lg font-bold hover:bg-white transition-colors text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-blue-800 backdrop-blur-lg rounded-3xl p-8">
                  <svg className="w-full h-64 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">2,450+</div>
              <div className="text-gray-600">Books Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">1,234</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-gray-600">Books Borrowed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">Experience the future of library management</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-xl text-gray-600">Find books in your favorite genres</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/categories/${category.name.toLowerCase()}`}
                className="bg-gradient-to-br from-black to-blue-600 rounded-lg p-6 text-white hover:shadow-xl transition-all hover:scale-105"
              >
                <svg className="w-12 h-12 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                </svg>
                <h3 className="text-lg font-bold text-center mb-2">{category.name}</h3>
                <p className="text-sm text-center text-white">{category.count} books</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Books</h2>
              <p className="text-xl text-gray-600">Popular reads this month</p>
            </div>
            <Link to="/library" className="hidden md:block px-6 py-3 bg-black text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">
              View All Books
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <Link key={book.id} to={`/books/${book.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-64 bg-gradient-to-br from-black to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-blue-600 uppercase">{book.category}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">{book.title}</h3>
                    <p className="text-gray-600 text-sm">{book.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/library" className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-blue-600 transition-colors">
              View All Books
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-black to-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Reading?</h2>
          <p className="text-xl md:text-2xl text-white font-semibold mb-8 max-w-2xl mx-auto">
            Join thousands of readers and get access to our extensive collection today
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-black text-white rounded-lg font-bold hover:bg-white hover:text-black transition-colors text-lg"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Members Say</h2>
            <p className="text-xl text-gray-600">Real experiences from our community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Farhan Ahsan', role: 'Book Enthusiast', quote: 'The best digital library I\'ve used. The collection is vast and the borrowing process is seamless!' },
              { name: 'Syed Adnan', role: 'Student', quote: 'As a student, this library has been invaluable. I can access textbooks and reference materials anytime.' },
              { name: 'Dharmik Kumar', role: 'Teacher', quote: 'I recommend this to all my students. The interface is intuitive and the book selection is excellent.' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-black to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;