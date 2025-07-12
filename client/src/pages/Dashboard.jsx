import { useState, useRef, useEffect } from 'react';
import IconButton from '../components/buttons/IconButton';
import IconTextButton from '../components/buttons/IconTextButton';
import TextButton from '../components/buttons/TextButton';
import MenuIconList from '../components/list/MenuIconList';
import PopupModal from '../components/popups/PopupModal';
import RightSidebar from '../components/sidebars/RightSidebar';
import HowItWorksPopup from './HowItWorksPopup';
import AboutSoftwarePopup from './AboutSoftwarePopup';
import { BsInfoCircle, BsGear, BsLayoutSidebar, BsX } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import iconListData from '../content/iconListData';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [columns, setColumns] = useState(1);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isAboutSoftwareOpen, setIsAboutSoftwareOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isDocsVisible, setIsDocsVisible] = useState(true);
  const menuRef = useRef(null);
  const docsButtonRef = useRef(null);

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

      <div className="fixed bottom-4 left-4 z-30 flex justify-between gap-3">
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

      <div 
        className={`fixed bottom-4 z-50 flex gap-3 transition-all duration-300 ${
          isSidebarPinned ? 'right-[calc(25%+1rem)]' : 'right-4'
        }`}
      >
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {['Performance Metrics', 'User Analytics', 'Revenue Tracking'].map((metric, index) => (
              <div 
                key={index} 
                className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-700">{metric}</h3>
                <p className="text-2xl font-bold mt-2">24,569</p>
                <p className="text-green-500 mt-1">↑ 12.5% from last month</p>
              </div>
            ))}
          </div>
          
          <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-gray-500">Chart visualization will appear here</p>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(item => (
                <div key={item} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex-shrink-0 mr-3" />
                  <div>
                    <h3 className="font-medium">Activity {item}</h3>
                    <p className="text-gray-600 text-sm">Description of recent activity #{item}</p>
                    <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
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
      >
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Tools & Options</h3>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Visual Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Compact View</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white p-3 rounded text-center hover:bg-blue-50 transition-colors">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mx-auto mb-2" />
                <span>Export Data</span>
              </button>
              <button className="bg-white p-3 rounded text-center hover:bg-blue-50 transition-colors">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mx-auto mb-2" />
                <span>Add Widget</span>
              </button>
              <button className="bg-white p-3 rounded text-center hover:bg-blue-50 transition-colors">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mx-auto mb-2" />
                <span>New Report</span>
              </button>
              <button className="bg-white p-3 rounded text-center hover:bg-blue-50 transition-colors">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mx-auto mb-2" />
                <span>Settings</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Recent Items</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                <span>Sales Report Q3.pdf</span>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                <span>User Analytics Dashboard</span>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                <span>Marketing Campaign</span>
              </li>
            </ul>
          </div>
        </div>
      </RightSidebar>

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