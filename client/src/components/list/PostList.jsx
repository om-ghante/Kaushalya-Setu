import React from 'react';

const PostList = () => {
  return (
    <div className="bg-white rounded-sm shadow-sm p-4 mb-6">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="flex items-center mb-3">
          <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 mr-3" />
          <button className="flex-grow text-left bg-white border border-gray-300 rounded-full py-2 px-4 hover:bg-gray-50">
            Start a post
          </button>
        </div>
        <div className="flex justify-between">
          {['Video', 'Photo', 'Write article'].map((item, i) => (
            <button key={i} className="flex items-center text-gray-600 hover:text-gray-900">
              <span className="mr-1">●</span> {item}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-blue-500 font-semibold mb-2">Web Roll <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Join this</span></div>
      </div>
      
      <div className="border rounded-lg p-4">
        <div className="flex items-start mb-3">
          <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12 mr-3" />
          <div>
            <h3 className="font-bold">Swat! Jiha</h3>
            <p className="text-sm text-gray-600">Software Designer (Biketronic) | $800+ (Elizabeth) | Vehicle & Stores...</p>
            <p className="text-xs text-gray-500">on: @</p>
          </div>
        </div>
        <p className="mb-3">
          I got rejected A LOT when trying to switch, but that's exactly what helped me land Microsoft's ... 
          <span className="text-blue-500 hover:underline cursor-pointer"> more</span>
        </p>
        <div className="flex text-gray-500 text-sm">
          <span className="mr-4">👍 Like</span>
          <span className="mr-4">💬 Comment</span>
          <span>↗️ Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostList;