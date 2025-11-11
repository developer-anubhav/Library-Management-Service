import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const {
    id,
    title,
    author,
    coverImage,
    category,
    rating = 0,
    availableCopies = 0,
    totalCopies = 0,
    publishedYear
  } = book;

  const isAvailable = availableCopies > 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Book Cover */}
      <Link to={`/books/${id}`} className="block relative overflow-hidden">
        <div className="aspect-[3/4] bg-gray-200">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-500">
              <svg className="w-24 h-24 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Availability Badge */}
        <div className="absolute top-2 right-2">
          {isAvailable ? (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
              Available
            </span>
          ) : (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg">
              Borrowed
            </span>
          )}
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-purple-600/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>
        )}
      </Link>

      {/* Book Info */}
      <div className="p-4">
        <Link to={`/books/${id}`}>
          <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2 hover:text-purple-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{author}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-600 ml-1">({rating.toFixed(1)})</span>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          {publishedYear && <span>Published: {publishedYear}</span>}
          <span>{availableCopies}/{totalCopies} copies</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/books/${id}`}
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors text-center"
          >
            View Details
          </Link>
          
          {isAvailable ? (
            <button className="flex items-center justify-center px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          ) : (
            <button 
              disabled 
              className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;