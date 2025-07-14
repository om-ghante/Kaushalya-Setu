import { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import IconButton from '../components/buttons/IconButton';
import ColorIconButton from '../components/buttons/ColorIconButton';
import IconTextButton from '../components/buttons/IconTextButton';
import TextButton from '../components/buttons/TextButton';
import MenuIconList from '../components/list/MenuIconList';
import PopupModal from '../components/popups/PopupModal';
import RightSidebar from '../components/sidebars/RightSidebar';
import HowItWorksPopup from './HowItWorksPopup';
import AboutSoftwarePopup from './AboutSoftwarePopup';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import CreatePostPopup from './CreatePostPopup';
import { 
  BsInfoCircle, 
  BsGear, 
  BsChatDots, 
  BsX, 
  BsBell, 
  BsPlusCircle, 
  BsSearch,
  BsHouseDoor,
  BsPerson,
  BsHeart,
  BsCompass
} from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import { useAuth } from '../context/AuthContext';
import iconListData from '../content/iconListData';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [columns, setColumns] = useState(1);
  const navigate = useNavigate();
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isAboutSoftwareOpen, setIsAboutSoftwareOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isDocsVisible, setIsDocsVisible] = useState(true);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault?.();
    if (searchQuery.trim() !== '') {
      setSearchResults(searchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults('');
  };

  const menuRef = useRef(null);
  const notificationRef = useRef(null);

  const { user, setUser } = useAuth();
  const [authModal, setAuthModal] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      navigate(`${item.path}`)
      setIsMenuOpen(false);
    }
  }));

  return (
    <div className="min-h-screen bg-white relative">
      {/* Top-left menu */}
      <div className="fixed top-4 left-4 z-30" ref={menuRef}>
        <IconButton
          icon={<CgMenuGridO className="text-xl" />}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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

      {/* Search Bar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-md px-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ColorIconButton
            icon={searchQuery ? <BsX /> : <BsSearch />}
            onClick={searchQuery ? clearSearch : handleSearch}
            ariaLabel={searchQuery ? 'Clear' : 'Search'}
            bgColor="bg-blue-100"
            hoverColor="hover:bg-blue-200"
            textColor="text-blue-600"
          />
        </div>
        {searchResults && (
          <div className="mt-2 p-3 bg-gray-100 border rounded-lg shadow">
            <p className="text-sm text-gray-700">
              Results for: <strong>{searchResults}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Auth Buttons */}
      {!user ? (
        <div className={`fixed top-4 z-30 flex gap-3 transition-all duration-300 ${isSidebarPinned ? 'right-[calc(25%+1rem)]' : 'right-4'}`}>
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
      ) : (
        <div className="fixed top-4 right-4 z-30 flex gap-3">
          <IconButton
            icon={<BsPlusCircle className="text-xl" />}
            onClick={() => setIsPostModalOpen(true)}
            ariaLabel="Add Post"
            bgColor="bg-green-100"
            hoverColor="hover:bg-green-200"
            textColor="text-green-700"
          />
          <div ref={notificationRef} className="relative">
            <IconButton
              icon={<BsBell className="text-xl" />}
              onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
              ariaLabel="Notifications"
              bgColor="bg-yellow-100"
              hoverColor="hover:bg-yellow-200"
              textColor="text-yellow-700"
            />
            {isNotificationMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-md border rounded-lg p-4">
                <p className="text-sm font-medium">You have no new notifications.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Buttons */}
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
          ariaLabel="About"
          bgColor="bg-purple-100"
          hoverColor="hover:bg-purple-200"
          textColor="text-purple-600"
        />
      </div>

      {/* Sidebar Pin/Toggle */}
      <div className={`fixed bottom-4 z-50 flex gap-3 transition-all duration-300 ${isSidebarPinned ? 'right-[calc(25%+1rem)]' : 'right-4'}`}>
        {(isSidebarPinned || !isSidebarOpen) && isDocsVisible && (
          <div className="relative">
            <TextButton 
              text="Docs"
              onClick={() => alert('Documentation opened')}
              bgColor="bg-green-100"
              hoverColor="hover:bg-green-200"
              textColor="text-green-700"
            />
            <button
              onClick={() => setIsDocsVisible(false)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <BsX className="text-xs" />
            </button>
          </div>
        )}

        {!isSidebarOpen && (
          <IconTextButton
            icon={<BsChatDots />}
            text="Open Messages"
            onClick={() => {
              setIsSidebarOpen(true);
              setIsSidebarPinned(false);
            }}
            bgColor="bg-indigo-100"
            hoverColor="hover:bg-indigo-200"
            textColor="text-indigo-700"
          />
        )}
      </div>

      {/* Main Content */}
      <div className={`pt-24 px-8 pb-16 transition-all duration-300 ${isSidebarPinned ? 'pr-[25%]' : ''}`}>
        <Outlet />
      </div>

      {/* Sidebars and Popups */}
      <RightSidebar 
        isOpen={isSidebarOpen} 
        isPinned={isSidebarPinned}
        onClose={() => {
          setIsSidebarOpen(false);
          setIsSidebarPinned(false);
        }}
        onTogglePin={() => setIsSidebarPinned(!isSidebarPinned)}
      />

      {authModal === 'login' && (
        <PopupModal title="Login" onClose={() => setAuthModal(null)}>
          <Login onLogin={login} onForgot={() => setAuthModal('forgot')} onSignUp={() => setAuthModal('register')} onClose={() => setAuthModal(null)} />
        </PopupModal>
      )}
      {authModal === 'register' && (
        <PopupModal title="Register" onClose={() => setAuthModal(null)}>
          <Register onRegister={login} onLogin={() => setAuthModal('login')} onClose={() => setAuthModal(null)} />
        </PopupModal>
      )}
      {authModal === 'forgot' && (
        <PopupModal title="Forgot Password" onClose={() => setAuthModal(null)}>
          <ForgotPassword onBackToLogin={() => setAuthModal('login')} />
        </PopupModal>
      )}
      {isPostModalOpen && (
        <PopupModal title="Add Post" onClose={() => setIsPostModalOpen(false)}>
          <CreatePostPopup />
        </PopupModal>
      )}
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