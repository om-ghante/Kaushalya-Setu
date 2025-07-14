import React from 'react';

const CurrentUserPost = () => {
  return (
    <div className="grid grid-cols-3 gap-1 mt-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 border border-gray-300 flex items-center justify-center">
          <span className="text-4xl">{i + 1}</span>
        </div>
      ))}
    </div>
  );
};

export default CurrentUserPost;