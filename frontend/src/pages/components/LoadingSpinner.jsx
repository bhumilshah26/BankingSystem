import React, { useState, useEffect } from 'react';

const LoadingSpinner = ({ 
  isLoading, 
  timeoutMessage = "Request is taking longer than expected. Please try again.",
  timeoutDuration = 60000, // 1 minute in milliseconds
  size = "medium",
  color = "#832625"
}) => {
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowTimeoutMessage(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setShowTimeoutMessage(true);
    }, timeoutDuration);

    return () => {
      clearTimeout(timeoutId);
      setShowTimeoutMessage(false);
    };
  }, [isLoading, timeoutDuration]);

  if (!isLoading) return null;

  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4 text-center">
        {!showTimeoutMessage ? (
          <>
            <div className="flex justify-center mb-4">
              <div 
                className={`${sizeClasses[size]} border-4 border-gray-200 border-t-current rounded-full animate-spin`}
                style={{ borderTopColor: color }}
              ></div>
            </div>
            <p className="text-gray-700 font-medium">Loading...</p>
            <p className="text-sm text-gray-500 mt-2">Please wait while we process your request</p>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-red-600 font-medium mb-2">Request Timeout</p>
            <p className="text-sm text-gray-600">{timeoutMessage}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 