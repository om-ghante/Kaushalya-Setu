import React, { useEffect, useState } from 'react';

const DeviceWarningPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-60">
      <div className="bg-white text-black p-6 rounded-xl shadow-xl max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">Device Not Supported</h2>
        <p>This website is not optimized for mobile or tablet devices. Please use a desktop for the best experience.</p>
      </div>
    </div>
  );
};

export default DeviceWarningPopup;
