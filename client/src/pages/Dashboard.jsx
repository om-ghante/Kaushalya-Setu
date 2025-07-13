import { useState, useRef, useEffect } from 'react';
import IconButton from '../components/buttons/IconButton';
import IconTextButton from '../components/buttons/IconTextButton';
import TextButton from '../components/buttons/TextButton';
import MenuIconList from '../components/list/MenuIconList';
import PopupModal from '../components/popups/PopupModal';
import RightSidebar from '../components/sidebars/RightSidebar';
import Profile from './Profile';
import HowItWorksPopup from './HowItWorksPopup';
import AboutSoftwarePopup from './AboutSoftwarePopup';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import PostList from '../components/list/PostList';
import MyMatch from '../components/userComponents/MyMatch';
import Calendar from '../components/userComponents/Calendar';
import { BsInfoCircle, BsGear, BsLayoutSidebar, BsX, BsPin, BsPinFill } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import iconListData from '../content/iconListData';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  // Existing state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [columns, setColumns] = useState(1);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isAboutSoftwareOpen, setIsAboutSoftwareOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isDocsVisible, setIsDocsVisible] = useState(true);
  const menuRef = useRef(null);
  const docsButtonRef = useRef(null);

  // Auth state
  const { user } = useAuth();
  const [authModal, setAuthModal] = useState(null);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setAuthModal(null);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const menuItems = iconListData.map(item => ({
    ...item,
    onClick: () => {
      alert(`Navigating to ${item.path}`);
      setIsMenuOpen(false);
    }
  }));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setIsSidebarPinned(false);
    }
  };

  const toggleSidebarPin = () => {
    setIsSidebarPinned(!isSidebarPinned);
  };

  const closeDocsButton = () => {
    setIsDocsVisible(false);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Top-left menu button */}
      <div className="fixed top-4 left-4 z-30" ref={menuRef}>
        <IconButton
          icon={<CgMenuGridO className="text-xl" />}
          onClick={toggleMenu}
          ariaLabel="Toggle menu"
          bgColor={isMenuOpen ? 'bg-blue-100' : 'bg-gray-200'}
          hoverColor="hover:bg-blue-200"
          textColor="text-blue-600"
        />
        {isMenuOpen && (
          <div className="flex flex-col gap-2 mt-2">
            <MenuIconList items={menuItems} columns={columns} />
          </div>
        )}
      </div>

      {/* Top-right auth buttons (when not logged in) */}
      {!user && (
        <div className={`fixed top-4 z-30 flex gap-3 transition-all duration-300 ${
          isSidebarPinned ? 'right-[calc(25%+1rem)]' : 'right-4'
        }`}>
          <TextButton
            text="Login"
            onClick={() => setAuthModal('login')}
            bgColor="bg-blue-100"
            hoverColor="hover:bg-blue-200"
            textColor="text-blue-700"
          />
          <TextButton
            text="Register"
            onClick={() => setAuthModal('register')}
            bgColor="bg-purple-100"
            hoverColor="hover:bg-purple-200"
            textColor="text-purple-700"
          />
        </div>
      )}

      {/* Bottom-left buttons */}
      <div className="fixed bottom-4 left-4 z-30 flex gap-3">
        <IconButton
          icon={<BsInfoCircle className="text-xl" />}
          onClick={() => setIsHowItWorksOpen(true)}
          ariaLabel="How it works"
          bgColor="bg-blue-100"
          hoverColor="hover:bg-blue-200"
          textColor="text-blue-600"
        />
        <IconButton
          icon={<BsGear className="text-xl" />}
          onClick={() => setIsAboutSoftwareOpen(true)}
          ariaLabel="About this software"
          bgColor="bg-purple-100"
          hoverColor="hover:bg-purple-200"
          textColor="text-purple-600"
        />
      </div>

      {/* Sidebar toggle button */}
      <div className={`fixed bottom-4 z-50 flex gap-3 transition-all duration-300 ${
        isSidebarPinned ? 'right-[calc(25%+1rem)]' : 'right-4'
      }`}>
        {(isSidebarPinned || !isSidebarOpen) && isDocsVisible && (
          <div className="relative" ref={docsButtonRef}>
            <TextButton 
              text="Docs"
              onClick={() => alert('Documentation opened')}
              bgColor="bg-green-100"
              hoverColor="hover:bg-green-200"
              textColor="text-green-700"
            />
            <button
              onClick={closeDocsButton}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              aria-label="Close documentation button"
            >
              <BsX className="text-xs" />
            </button>
          </div>
        )}

        {!isSidebarOpen && (
          <IconTextButton
            icon={<BsLayoutSidebar />}
            text="Open Tools"
            onClick={toggleSidebar}
            bgColor="bg-indigo-100"
            hoverColor="hover:bg-indigo-200"
            textColor="text-indigo-700"
          />
        )}
      </div>

      <div className={`pt-24 px-8 pb-16 transition-all duration-300 ${
        isSidebarPinned ? 'pr-[25%]' : ''
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column - Small */}
            <div className="lg:col-span-3 space-y-6">
              {user && <Profile user={user} onLogout={logout} />}
            </div>

            {/* Middle Column - Large */}
            <div className="lg:col-span-6 space-y-6">
              <PostList />
            </div>
                
            {/* Right Column - Small */}
            <div className="lg:col-span-3 space-y-6">
              <MyMatch />
              <Calendar />
            </div>
          </div>
        </div>
      </div>


      <RightSidebar 
        isOpen={isSidebarOpen} 
        isPinned={isSidebarPinned}
        onClose={() => {
          setIsSidebarOpen(false);
          setIsSidebarPinned(false);
        }}
        onTogglePin={toggleSidebarPin}
      />
      

      {/* Auth Modals */}
      {authModal === 'login' && (
        <PopupModal title="Login" onClose={() => setAuthModal(null)}>
          <Login 
            onLogin={login}
            onForgot={() => setAuthModal('forgot')}
            onSignUp={() => setAuthModal('register')}
            onClose={() => setAuthModal(null)} 
          />
        </PopupModal>
      )}

      {authModal === 'register' && (
        <PopupModal title="Register" onClose={() => setAuthModal(null)}>
          <Register 
            onRegister={login}
            onLogin={() => setAuthModal('login')}
            onClose={() => setAuthModal(null)} 
          />
        </PopupModal>
      )}

      {authModal === 'forgot' && (
        <PopupModal title="Forgot Password" onClose={() => setAuthModal(null)}>
          <ForgotPassword onBackToLogin={() => setAuthModal('login')} />
        </PopupModal>
      )}

      {/* Other modals */}
      {isHowItWorksOpen && (
        <PopupModal title="How It Works" onClose={() => setIsHowItWorksOpen(false)}>
          <HowItWorksPopup />
        </PopupModal>
      )}
      
      {isAboutSoftwareOpen && (
        <PopupModal title="About This Software" onClose={() => setIsAboutSoftwareOpen(false)}>
          <AboutSoftwarePopup />
        </PopupModal>
      )}
    </div>
  );
};

export default Dashboard;