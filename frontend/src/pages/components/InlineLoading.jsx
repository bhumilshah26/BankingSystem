import React from 'react';

const InlineLoading = ({ size = "small", color = "#832625" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6", 
    large: "w-8 h-8"
  };

  return (
    <div className="flex justify-center">
      <div 
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-current rounded-full animate-spin`}
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
};

export default InlineLoading; 