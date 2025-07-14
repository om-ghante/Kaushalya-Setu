import React, { useState } from 'react';
import { BsGrid3X3, BsPlusSquare } from 'react-icons/bs';
import CurrentUserPost from '../../components/profileComponents/CurrentUserPost';
import EditProfile from '../../components/profileComponents/EditProfile';
import PersonalInformation from '../../components/profileComponents/PersonalInformation';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'posts':
        return <CurrentUserPost />;
      case 'edit':
        return <EditProfile />;
      case 'personal':
        return <PersonalInformation />;
      default:
        return <CurrentUserPost />;
    }
  };

  return (
    <div className="max-w-7xl shadow-sm mx-auto px-4 py-6">
      <div className="flex items-center justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300 border-2 border-black" />
      </div>

      <div className="w-full border-t border-gray-300 flex justify-center">
        <div className="flex items-center space-x-12">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`py-4 px-1 flex items-center text-xs uppercase tracking-widest ${activeTab === 'posts' ? 'border-t border-black' : 'text-gray-400'}`}
          >
            <BsGrid3X3 className="mr-1" /> Posts
          </button>
          <button 
            onClick={() => setActiveTab('edit')}
            className={`py-4 px-1 flex items-center text-xs uppercase tracking-widest ${activeTab === 'edit' ? 'border-t border-black' : 'text-gray-400'}`}
          >
            <BsPlusSquare className="mr-1 text-lg" /> Edit Profile 
          </button>
          <button 
            onClick={() => setActiveTab('personal')}
            className={`py-4 px-1 flex items-center text-xs uppercase tracking-widest ${activeTab === 'personal' ? 'border-t border-black' : 'text-gray-400'}`}
          >
            <BsPlusSquare className="mr-1 text-lg" /> Personal Information
          </button>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Profile;