import React from 'react';

const Loader = ({ fullScreen = false, size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: { width: '40px', height: '30px', pageWidth: '20px', pageHeight: '30px' },
    medium: { width: '60px', height: '45px', pageWidth: '30px', pageHeight: '45px' },
    large: { width: '80px', height: '60px', pageWidth: '40px', pageHeight: '60px' }
  };

  const dimensions = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${fullScreen ? 'fixed inset-0 bg-white/95 z-50' : ''}`}>
      {/* Book Loader Animation */}
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height, transformStyle: 'preserve-3d' }}>
        <div className="absolute bg-gradient-to-r from-purple-600 to-indigo-600 rounded animate-flip-page-1" style={{ width: dimensions.pageWidth, height: dimensions.pageHeight, transformOrigin: 'left center' }}></div>
        <div className="absolute bg-gradient-to-r from-indigo-600 to-purple-600 rounded animate-flip-page-2" style={{ width: dimensions.pageWidth, height: dimensions.pageHeight, transformOrigin: 'left center', animationDelay: '0.3s' }}></div>
        <div className="absolute bg-gradient-to-r from-purple-600 to-purple-700 rounded animate-flip-page-3" style={{ width: dimensions.pageWidth, height: dimensions.pageHeight, transformOrigin: 'left center', animationDelay: '0.6s' }}></div>
      </div>
      {text && <p className="mt-6 text-purple-600 font-medium">{text}</p>}
    </div>
  );
};

// Spinner Loader
export const SpinnerLoader = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4'
  };

  return (
    <div className={`flex justify-center items-center p-4 ${className}`}>
      <div className={`${sizeClasses[size]} border-gray-200 border-t-purple-600 rounded-full animate-spin`}></div>
    </div>
  );
};

// Skeleton Loader for Content
export const SkeletonLoader = ({ type = 'text', count = 1, className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-3"></div>
            <div className="h-4 w-3/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          </div>
        );
      case 'text':
        return <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-3"></div>;
      case 'title':
        return <div className="h-6 w-4/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-4"></div>;
      case 'avatar':
        return <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>;
      case 'button':
        return <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg"></div>;
      default:
        return <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-3"></div>;
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

// Book Card Skeleton
export const BookCardSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
          <div className="p-4">
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-3"></div>
            <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Dots Loader
export const DotsLoader = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-purple-600 rounded-full animate-bounce`} style={{ animationDelay: '0s' }}></div>
      <div className={`${sizeClasses[size]} bg-purple-600 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
      <div className={`${sizeClasses[size]} bg-purple-600 rounded-full animate-bounce`} style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

// Pulse Loader
export const PulseLoader = ({ text = 'Loading...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-purple-600 rounded-full animate-ping opacity-75"></div>
        <div className="relative bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
      </div>
      {text && <p className="mt-4 text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

export default Loader;