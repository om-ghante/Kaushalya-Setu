import React, { useRef } from 'react';
import { BsUpload, BsTrash } from 'react-icons/bs';

const MediaInput = ({ files, setFiles }) => {
  const inputRef = useRef();
  const objectUrls = useRef([]);

  React.useEffect(() => {
    return () => {
      objectUrls.current.forEach(url => URL.revokeObjectURL(url));
      objectUrls.current = [];
    };
  }, []);

  const handleChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = null;
  };

  const handleRemove = (index) => {
    URL.revokeObjectURL(objectUrls.current[index]);
    objectUrls.current.splice(index, 1);
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-violet-500 bg-gray-50"
        onClick={() => inputRef.current.click()}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <BsUpload className="text-gray-400" size={24} />
          <div>
            <p className="text-sm font-medium text-gray-700">
              <span className="text-violet-600 font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Only images, videos (mp4), and PDF files allowed
            </p>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/mp4,application/pdf"
          multiple
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default MediaInput;