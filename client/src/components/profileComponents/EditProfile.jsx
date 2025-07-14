import React from 'react';

const EditProfile = () => {
  return (
    <div className="mt-8 p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input 
            type="text" 
            defaultValue="_om_ghante_" 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea 
            defaultValue="Bids one's time 😊" 
            className="w-full px-3 py-2 border rounded"
            rows="3"
          />
        </div>
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;