import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[999999] bg-white flex items-center justify-center">
      <div className="flex space-x-3">
        <div className="w-4 h-4 bg-[#5f4dee] rounded-full animate-bounce" style={{ animationDelay: '-0.32s' }}></div>
        <div className="w-4 h-4 bg-[#5f4dee] rounded-full animate-bounce" style={{ animationDelay: '-0.16s' }}></div>
        <div className="w-4 h-4 bg-[#5f4dee] rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Preloader;