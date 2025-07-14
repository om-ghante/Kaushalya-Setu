import React from 'react';
import Sidebar from '../../components/inboxComponent/Sidebar';
import Chat from '../../components/inboxComponent/Chat';
import NavBar from '../../components/inboxComponent/Navbar'; 

const Inbox = () => {
  return (
    <div className="h-full w-full bg-white flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[35%] border-r border-gray-200 h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="flex-1 h-full overflow-y-auto">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
